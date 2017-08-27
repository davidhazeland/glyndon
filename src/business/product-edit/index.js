import * as actions from './actions'
import reducer, { name } from './reducer'
import sagas from './sagas'
import * as selectors from './selectors'

import component from './containers/product-edit'
import Fields from './components/product-edit-fields'

export {
  Fields,
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
