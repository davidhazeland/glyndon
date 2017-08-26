import {createAction} from 'redux-actions'

export const CLEAR = 'logout/CLEAR'
export const LOGOUT_REQUEST = 'logout/LOGOUT_REQUEST'

export const clear = createAction(CLEAR)
export const logoutRequest = createAction(LOGOUT_REQUEST)
