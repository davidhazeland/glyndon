import { call, put, take, fork } from 'redux-saga/effects'

import * as actions from '../actions'

export function* handle({payload}) {
  try {
    
  }
  catch (error) {
    throw error
  }
}

export default function* () {
  while (true) {
    const action = yield take(actions.initialize)

    yield fork(handle, action)
  }
}
