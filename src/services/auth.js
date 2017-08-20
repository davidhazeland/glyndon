import store from 'store'

import * as myself from './auth'
export default myself

export function saveToken(token) {
  store.set('token', token)
}

export function clear() {
  store.remove('token')
}

export function getToken() {
  return store.get('token')
}
