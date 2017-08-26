import Parse from 'services/parse'

import * as myself from './authorization'
export default myself

export function authorize({email, password}) {
  return Parse.User.logIn(email, password)
}

export function logout() {
  new Parse.User.logOut()
}
