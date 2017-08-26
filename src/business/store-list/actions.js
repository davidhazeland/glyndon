import { createAction } from 'redux-actions'
import {actions as listActions} from 'raket-react/business/list'

import API from 'api/store'

export const CLEAR = 'store-list/CLEAR'
export const INITIALIZE = 'store-list/INITIALIZE'

export const clear = createAction(INITIALIZE)
export const initialize = createAction(INITIALIZE)

export const fetchRequest = payload => listActions.fetchRequest({
  ...payload,
  endpoint: API.fetch
})

export const deleteRequest = payload => listActions.deleteRequest({
  ...payload,
  endpoint: API.remove
})
