import { call, put, take, fork } from 'redux-saga/effects'

import * as actions from '../actions'

import {actions as initialActions} from 'raket-react/business/initial'
import {read} from 'raket-react/sagas/item'

import API from 'api/ad-account'

export function* handle({payload}) {
  const {id} = payload
  try {
    yield put(initialActions.startRequest())
    yield call(read, {
      id,
      endpoint: API.get
    })
  }
  catch (error) {
    throw error
  }
  finally {
    yield put(initialActions.stopRequest())
  }
}

export default function* () {
  while (true) {
    const action = yield take(actions.initialize)

    yield fork(handle, action)
  }
}
