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

const variantPrices = {
    '15': 6.32,
    '5': 6.41,
    '9': 6.51,
    '13': 5.95,
    '38': 6.95,
    '28': 6.33,
    '7': 6.83,
    '4': 5.82,
    '32': 6.32,
    '19': 6.17,
    '11': 6.15,
    '17': 6.14,
    '34': 6.36,
    '36': 6.52,

    '16': 11.95,
    '6': 11.95,
    '10': 12.36,
    '14': 10.82,
    '39': 14.23,
    '29': 11.94,
    '8': 12.91,
    '21': 11.95,
    '33': 11.95,
    '20': 11.95,
    '12': 11.95,
    '18': 12.59,
    '35': 12.73,
    '37': 12.36,

    '40': 5.87,
    '41': 11.68,
    '42': 5.87,
    '43': 11.68,
    '44': 5.87,
    '45': 11.68,
    '46': 5.87,
    '47': 11.68,
    '48': 5.87,
    '49': 11.68,
    '50': 5.87,
    '51': 11.68
}

export function getInfo(orders, products) {
  return orders.reduce((reduction, order) => {
    const items = order.items;
    const totalCost = items.reduce((total, item) => {
      const product = products.find(p => p.uid === item.product_id)
      const cost = item.variant_id && variantPrices[item.variant_id] ? variantPrices[item.variant_id] : product.cost
      const price = product ? cost * item.quantity : 0
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

    const [orders, products] = yield all([
      call(orderAPI.getByStoreId, storeId, startTimestamp, endTimestamp),
      call(productAPI.getByStoreId, storeId)
    ])

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

      adInsights: adInsights.map(toJSON),

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
