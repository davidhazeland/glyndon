import * as actions from './actions'
import reducer, { name } from './reducer'
import sagas from './sagas'
import * as selectors from './selectors'

import component from './containers/analytics'
import { getAnalytics } from './sagas/start-realtime-analytics'

export {
  getAnalytics,
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
