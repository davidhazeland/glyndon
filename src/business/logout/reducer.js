import freeze from 'deep-freeze'
import {handleActions} from 'redux-actions'

import {clear} from './actions'

export const name = 'Logout'

const initialState = freeze({

})

export default handleActions({
  [clear]: () => initialState
}, initialState)
