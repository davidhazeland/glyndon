import { call, put, take, fork, cancel, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import moment from 'moment-timezone'

import * as actions from '../actions'

import AdAccApi from 'api/advert-account'
import AdInsightApi from 'api/ad-insight'
import orderAPI from 'api/order'
import productAPI from 'api/product'

function getInfo(orders, products) {
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

function* getAnalytics(storeId) {
  try {
    const [adAcc] = yield call(AdAccApi.getByStoreId, storeId)

    const {objectId: adAccId, timezone} = adAcc.toJSON()

    const now = moment().tz(timezone).startOf('day')
    const today = now.format('YYYY-MM-DD')
    const todayTimestamp = parseInt(now.format('X'), 10)

    const [adInsight] = yield call(AdInsightApi.getByAdAccId, adAccId, today)

    const {spend} = adInsight.toJSON()

    const orders = yield call(orderAPI.getByStoreId, storeId, todayTimestamp)
    const products = yield call(productAPI.getByStoreId, storeId)

    const toJSON = o => o.toJSON()

    const {revenue, cost} = getInfo(orders.map(toJSON), products.map(toJSON))

    yield put(actions.set({
      spend,
      revenue,
      cost,
      orderCount: orders.length
    }))
  }
  catch (e) {
    console.log(e);
  }
}

function* realtimeAnalytics(storeId) {
  try {
    while (true) {
      yield fork(getAnalytics, storeId)

      yield call(delay, 60000)
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
