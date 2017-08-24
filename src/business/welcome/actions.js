import { createAction } from 'redux-actions'

export const CLEAR = 'welcome/CLEAR'
export const SET = 'welcome/SET'
export const START_REALTIME_OVERVIEW = 'welcome/START_REALTIME_OVERVIEW'
export const STOP_REALTIME_OVERVIEW = 'welcome/STOP_REALTIME_OVERVIEW'

export const clear = createAction(CLEAR)
export const set = createAction(SET)
export const startRealtimeOverview = createAction(START_REALTIME_OVERVIEW)
export const stopRealtimeOverview = createAction(STOP_REALTIME_OVERVIEW)
