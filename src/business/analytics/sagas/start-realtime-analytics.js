import { call, put, take, fork, cancel, cancelled, all, race, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import moment from 'moment-timezone'

import * as actions from '../actions'
import * as selectors from '../selectors'

import AdAccApi from 'api/advert-account'
import AdInsightApi from 'api/ad-insight'
import orderAPI from 'api/order'
import productAPI from 'api/product'

const timeout = 10000
const timezone = 'America/Los_Angeles'

export function getInfo(orders, products) {
  return orders.reduce((reduction, order) => {
    const items = order.items;
    const totalCost = items.reduce((total, item) => {
      const product = products.find(p => p.uid === item.product_id)
      const price = product ? product.cost * item.quantity : 0
      return total + price
    }, 0)

    return {
      revenue: reduction.revenue + parseFloat(order.total),
      cost: reduction.cost + totalCost
    }
  }, {
    revenue: 0,
    cost: 0
  });
}

export function* getAnalytics(storeId, filter) {
  try {
    const {date} = filter

    const now = moment().tz(timezone).startOf('day')
    const time = date === 'today' ? now : moment(now).subtract(1, 'day')
    const today = time.format('YYYY-MM-DD')
    const startTimestamp = parseInt(time.format('X'), 10)
    const endTimestamp = parseInt(moment(time).add(1, 'day').format('X'), 10)

    const adAccList = yield call(AdAccApi.getByStoreId, storeId)

    const adInsights = yield all(adAccList.map(adAcc => {
      const {objectId: adAccId} = adAcc.toJSON()

      return call(AdInsightApi.getByAdAccId, adAccId, today)
    }))

    const spend = adInsights.reduce((total, adInsight) => {
      return total + adInsight.toJSON().spend
    }, 0)

    const orders = yield call(orderAPI.getByStoreId, storeId, startTimestamp, endTimestamp)
    const products = yield call(productAPI.getByStoreId, storeId)

    const toJSON = o => o.toJSON()
    const jsonOrders = orders.map(toJSON)
    const jsonProducts = products.map(toJSON)

    const {revenue, cost} = getInfo(jsonOrders, jsonProducts)

    return {
      id: storeId,
      spend,
      revenue,
      cost,
      orderCount: orders.length,

      orders: jsonOrders,
      products: jsonProducts,

      pure: false
    }

  }
  catch (e) {
    console.log(e);
  }
}

function* realtimeAnalytics(storeId) {
  try {
    while (true) {
      const {filter} = yield select(selectors.get)

      const analytics = yield call(getAnalytics, storeId, filter)

      yield put(actions.set(analytics))

      yield race({
        changeFilter: take(actions.changeFilter),
        timeout: call(delay, timeout)
      })
    }
  }
  finally {
    if (yield cancelled()){

    }
  }
}

export default function* () {
  while (true) {
    const {payload: {storeId}} = yield take(actions.startRealtimeAnalytics)

    const task = yield fork(realtimeAnalytics, storeId)

    yield take(actions.stopRealtimeAnalytics)

    yield cancel(task)
  }
}
