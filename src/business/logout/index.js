import * as actions from './actions'
import reducer, {name} from './reducer'
import sagas from './sagas'

export {
  name,
  actions,
  sagas
}

export default {
  name: reducer
}
