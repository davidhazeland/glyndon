import { call, put, take, fork, cancel, cancelled, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import * as actions from '../actions'

const timeout = 10000

import { getAnalytics } from 'business/analytics'

const storeIdList = [
  'RMQrzVJo9C',
  'GYniQV6lRB'
]

function* realtimeOverview() {
  try {
    while (true) {
      const analytics = yield all(storeIdList.map(storeId => {
        return call(getAnalytics, storeId, {date: 'today'})
      }))

      yield put(actions.set({
        analytics,
        pure: false
      }))

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
    yield take(actions.startRealtimeOverview)

    const task = yield fork(realtimeOverview)

    yield take(actions.stopRealtimeOverview)

    yield cancel(task)
  }
}
