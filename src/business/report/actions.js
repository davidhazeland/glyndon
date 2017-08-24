import { createAction } from 'redux-actions'
import {actions as listActions} from 'raket-react/business/list';

import API from 'api/report';

export const CLEAR = 'report/CLEAR'

export const clear = createAction(CLEAR)

export const fetchRequest = payload => listActions.fetchRequest({
  ...payload,
  endpoint: API.getByStoreId
});
