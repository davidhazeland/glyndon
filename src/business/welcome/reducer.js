import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import { clear, set } from './actions'

export const name = 'Welcome'

export const initialState = freeze({
  analytics: [],
  pure: true
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
