import { createAction } from 'redux-actions'
import {actions as itemActions} from 'raket-react/business/item'

import API from 'api/ad-account'

export const CLEAR = 'ad-account-add/CLEAR'

export const clear = createAction(CLEAR)

export const createRequest = payload => itemActions.createRequest({
  ...payload,
  endpoint: API.add
})
