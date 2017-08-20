import { call, put, take, fork } from 'redux-saga/effects'

import saga, { handle } from '../start-realtime-analytics'
import { actions } from '../../index'

describe('Analytics', () => {
  test('[Saga] StartRealtimeAnalytics', () => {
    const sagaIterator = saga()

    let actual
    let expected

    const parameter = {}
    const action = actions.startRealtimeAnalytics(parameter)

    actual = sagaIterator.next().value
    expected = take(actions.startRealtimeAnalytics)

    expect(actual).toEqual(expected)

    actual = sagaIterator.next(action).value
    expected = fork(handle, action)

    expect(actual).toEqual(expected)

    actual = sagaIterator.next().value
    expected = take(actions.startRealtimeAnalytics)

    expect(actual).toEqual(expected)
  })

  describe('[Saga] StartRealtimeAnalytics - handle() generator', () => {
    xtest('Exception', () => {
      const parameter = {}
      const action = actions.startRealtimeAnalytics(parameter)
      const sagaIterator = handle(action)

      let actual
      let expected

      sagaIterator.next()

      const error = new Error('error')

      sagaIterator.throw(error).value
    })
  })
})
