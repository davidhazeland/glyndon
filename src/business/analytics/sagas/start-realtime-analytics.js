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
  '40': 5.8,
  '58': 5.8,
  '15': 5.8,
  '17': 5.8,
  '48': 5.8,
  '42': 5.8,
  '13': 5.8,
  '26': 5.8,
  '19': 5.8,
  '28': 5.8,
  '4': 5.8,
  '5': 5.8,
  '46': 5.8,
  '32': 5.8,
  '7': 5.8,
  '44': 5.8,
  '36': 5.8,
  '38': 5.8,
  '9': 5.8,
  '11': 5.8,
  '34': 5.8,
  '50': 5.8,

  '41': 12,
  '59': 12,
  '16': 12,
  '18': 12,
  '49': 12,
  '43': 12,
  '14': 12,
  '27': 12,
  '20': 12,
  '29': 12,
  '21': 12,
  '6': 12,
  '47': 12,
  '33': 12,
  '8': 12,
  '45': 12,
  '37': 12,
  '39': 12,
  '10': 12,
  '12': 12,
  '35': 12,
  '51': 12
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
