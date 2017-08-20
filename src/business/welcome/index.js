import * as actions from './actions'
import reducer, { name } from './reducer'
import sagas from './sagas'
import * as selectors from './selectors'

import component from './containers/welcome'

export {
  name,
  reducer,
  actions,
  sagas,
  component,
  selectors
}

export default {
  [name]: reducer
}
