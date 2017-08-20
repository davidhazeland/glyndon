import { createAction } from 'redux-actions'

export const CLEAR = 'analytics/CLEAR'
export const SET = 'analytics/SET'
export const INITIALIZE = 'analytics/INITIALIZE'
export const START_REALTIME_ANALYTICS = 'analytics/START_REALTIME_ANALYTICS'
export const STOP_REALTIME_ANALYTICS = 'analytics/STOP_REALTIME_ANALYTICS'

export const clear = createAction(CLEAR)
export const set = createAction(SET)
export const initialize = createAction(INITIALIZE)
export const startRealtimeAnalytics = createAction(START_REALTIME_ANALYTICS)
export const stopRealtimeAnalytics = createAction(STOP_REALTIME_ANALYTICS)
