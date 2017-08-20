import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import { clear, set } from './actions'

export const name = 'Analytics'

export const initialState = freeze({

})

export default handleActions({
  [clear]: () => initialState,

  [set]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  }
}, initialState)
