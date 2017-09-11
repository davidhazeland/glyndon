import { createAction } from 'redux-actions'

import {actions as listActions} from 'raket-react/business/list';

import API from 'api/order';

export const CLEAR = 'day-report/CLEAR'

export const clear = createAction(CLEAR)

export const fetchRequest = payload => listActions.fetchRequest({
  ...payload,
  endpoint: API.getOrdersByDay
});
