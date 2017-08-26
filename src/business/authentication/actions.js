import {createAction} from 'redux-actions'

export const CLEAR = 'raket-app/authentication/CLEAR'
export const AUTHENTICATION_REQUEST = 'raket-app/authentication/AUTHENTICATION_REQUEST'

export const clear = createAction(CLEAR)
export const authenticationRequest = createAction(AUTHENTICATION_REQUEST)
