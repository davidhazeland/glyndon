import Parse from 'services/parse'

import * as myself from './authorization'
export default myself

export function authorize({username, password}) {
  return Parse.User.logIn(username, password)
}

export function logout() {
  new Parse.User.logOut()
}
