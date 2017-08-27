import * as actions from './actions'
import reducer, { name } from './reducer'
import sagas from './sagas'
import * as selectors from './selectors'

import component from './containers/ad-account-add'

export {
  component,

  name,
  reducer,
  actions,
  sagas,
  selectors
}

export default {
  [name]: reducer
}
