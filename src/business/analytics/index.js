import * as actions from './actions'
import reducer, { name } from './reducer'
import sagas from './sagas'
import * as selectors from './selectors'

import component from './containers/analytics'

export {
  component,

  name,
  actions,
  sagas,
  selectors
}

export default reducer
