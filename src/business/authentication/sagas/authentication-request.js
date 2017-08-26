import {call, put} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {startSubmit, stopSubmit} from 'redux-form'

import {takeFirst} from 'odem/utils/saga'

import * as actions from '../actions'

import {actions as notificationActions} from 'raket-react/business/notification'

import API from 'api/authorization'

export function* handle(action) {
  const {payload} = action
  const {data, form} = payload
  try {
    const {email, password} = data

    yield put(startSubmit(form))
    yield call(API.authorize, {email, password})

    yield put(push('/'))
  }
  catch (error) {
    yield put(notificationActions.notifyError({
      text: error.message
    }))
  }
  finally {
    yield put(stopSubmit(form))
  }
}

export default function* () {
  yield takeFirst(actions.authenticationRequest, handle)
}
