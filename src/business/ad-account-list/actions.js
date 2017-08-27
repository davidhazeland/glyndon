import { createAction } from 'redux-actions'
import {actions as listActions} from 'raket-react/business/list'

import API from 'api/ad-account'

export const CLEAR = 'ad-account-list/CLEAR'
export const INITIALIZE = 'ad-account-list/INITIALIZE'

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
