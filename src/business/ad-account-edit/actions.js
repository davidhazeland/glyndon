import { createAction } from 'redux-actions'
import {actions as itemActions} from 'raket-react/business/item'

import API from 'api/ad-account'

export const CLEAR = 'ad-account-edit/CLEAR'
export const INITIALIZE = 'ad-account-edit/INITIALIZE'

export const clear = createAction(CLEAR)
export const initialize = createAction(INITIALIZE)

export const updateRequest = payload => itemActions.updateRequest({
  ...payload,
  endpoint: API.edit
})
