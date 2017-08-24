import { call, put, take, fork } from 'redux-saga/effects'

import saga, { handle } from '../start-realtime-overview'
import { actions } from '../../index'

describe('Welcome', () => {
  test('[Saga] StartRealtimeOverview', () => {
    const sagaIterator = saga()

    let actual
    let expected

    const parameter = {}
    const action = actions.startRealtimeOverview(parameter)

    actual = sagaIterator.next().value
    expected = take(actions.startRealtimeOverview)

    expect(actual).toEqual(expected)

    actual = sagaIterator.next(action).value
    expected = fork(handle, action)

    expect(actual).toEqual(expected)

    actual = sagaIterator.next().value
    expected = take(actions.startRealtimeOverview)

    expect(actual).toEqual(expected)
  })

  describe('[Saga] StartRealtimeOverview - handle() generator', () => {
    xtest('Exception', () => {
      const parameter = {}
      const action = actions.startRealtimeOverview(parameter)
      const sagaIterator = handle(action)

      let actual
      let expected

      sagaIterator.next()

      const error = new Error('error')

      sagaIterator.throw(error).value
    })
  })
})
