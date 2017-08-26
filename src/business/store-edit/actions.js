import { createAction } from 'redux-actions'
import {actions as itemActions} from 'raket-react/business/item'

import API from 'api/store'

export const CLEAR = 'store-edit/CLEAR'
export const INITIALIZE = 'store-edit/INITIALIZE'

export const clear = createAction(CLEAR)
export const initialize = createAction(INITIALIZE)

export const updateRequest = payload => itemActions.updateRequest({
  ...payload,
  endpoint: API.edit
})
