import { call, put, take } from 'redux-saga/effects'

import saga, { handle } from '../initialize'
import { actions } from '../../index'

describe('AdAccountEdit', () => {
  describe('[Saga] Initialize - handle() generator', () => {
    xtest('Exception', () => {
      const parameter = {}
      const action = actions.initialize(parameter)
      const sagaIterator = handle(action)

      let actual
      let expected

      sagaIterator.next()

      const error = new Error('error')

      sagaIterator.throw(error).value
    })
  })
})
