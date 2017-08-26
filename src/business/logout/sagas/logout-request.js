import {delay} from 'redux-saga'
import {call, put, take, fork} from 'redux-saga/effects'
import {push} from 'react-router-redux'

import * as actions from '../actions'
import {actions as notificationActions} from 'raket-react/business/notification'

import API from 'api/authorization'

export function* handle() {
  try {
    yield call(API.logout)
    yield delay(0) // I don't know why I have to do this (Parse issue)
    yield put(push('/authentication'))
  }
  catch (error) {
    yield put(notificationActions.notifyError({
      text: error.message
    }))
  }
}

export default function* () {
  while (true) {
    const action = yield take(actions.logoutRequest)

    yield fork(handle, action)
  }
}
