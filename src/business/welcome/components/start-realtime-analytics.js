import { call, put, take, fork, cancel, cancelled, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import moment from 'moment-timezone'

import * as actions from '../actions'

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

export function* getAnalytics(storeId) {
  try {
    const now = moment().tz(timezone).startOf('day')
    const today = now.format('YYYY-MM-DD')
    const todayTimestamp = parseInt(now.format('X'), 10)


    const adAccList = yield call(AdAccApi.getByStoreId, storeId)

    const adInsights = yield all(adAccList.map(adAcc => {
      const {objectId: adAccId} = adAcc.toJSON()

      return call(AdInsightApi.getByAdAccId, adAccId, today)
    }))

    const spend = adInsights.reduce((total, adInsight) => {
      return total + adInsight.toJSON().spend
    }, 0)

    const orders = yield call(orderAPI.getByStoreId, storeId, todayTimestamp)
    const products = yield call(productAPI.getByStoreId, storeId)

    const toJSON = o => o.toJSON()

    const {revenue, cost} = getInfo(orders.map(toJSON), products.map(toJSON))

    return {
      spend,
      revenue,
      cost,
      orderCount: orders.length,
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
      const analytics = yield call(getAnalytics, storeId)

      yield put(actions.set(analytics))

      yield call(delay, timeout)
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
