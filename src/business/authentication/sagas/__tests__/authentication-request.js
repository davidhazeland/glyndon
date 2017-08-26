import {call, put, take, fork} from 'redux-saga/effects'
import {push} from 'react-router-redux'

import saga, {handle} from '../authentication-request'
import {actions} from '../../index'
import {actions as notificationActions} from 'raket-react/business/notification'
import {actions as authorizationActions} from 'raket-react/business/authorization'

import {startSubmit, stopSubmit} from 'redux-form'

import {takeFirst} from 'odem/utils/saga'

import Auth from 'services/auth'
import API from 'api/authorization'

describe('[Saga] Authentication Request - handle', function() {
  test('Success', () => {
    const action = actions.authenticationRequest({
      data: {
        email: 'email',
        password: 'password'
      },
      form: 'form'
    })
    const sagaIterator = handle(action)

    let actual
    let expected

    actual = sagaIterator.next().value
    expected = put(startSubmit('form'))

    expect(actual).toEqual(expected)

    actual = sagaIterator.next().value
    expected = call(API.authorize, {
      email: 'email',
      password: 'password'
    })

    expect(actual).toEqual(expected)

    const response = {
      token: 'token'
    }

    actual = sagaIterator.next(response).value
    expected = put(authorizationActions.save({
      token: 'token',
      Auth,
      API
    }))

    expect(actual).toEqual(expected)

    actual = sagaIterator.next().value
    expected = put(push('/'))

    expect(actual).toEqual(expected)

    actual = sagaIterator.next().value
    expected = put(stopSubmit('form'))

    expect(actual).toEqual(expected)
  })

  test('Exception', () => {
    const action = actions.authenticationRequest({
      data: {
        email: 'email',
        password: 'password'
      },
      form: 'form'
    })
    const sagaIterator = handle(action)

    let actual
    let expected

    actual = sagaIterator.next().value
    expected = put(startSubmit('form'))

    expect(actual).toEqual(expected)

    actual = sagaIterator.next().value
    expected = call(API.authorize, {
      email: 'email',
      password: 'password'
    })

    expect(actual).toEqual(expected)

    const error = new Error('error')

    actual = sagaIterator.throw(error).value
    expected = put(notificationActions.notifyError({
      text: 'error'
    }))

    expect(actual).toEqual(expected)

    actual = sagaIterator.next().value
    expected = put(stopSubmit('form'))

    expect(actual).toEqual(expected)
  })
})
