import { createAction } from 'redux-actions'

export const CLEAR = 'analytics/CLEAR'
export const INITIALIZE = 'analytics/INITIALIZE'

export const clear = createAction(CLEAR)
export const initialize = createAction(INITIALIZE)
