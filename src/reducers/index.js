import Welcome from '../business/welcome'
import Notification from 'raket-react/business/notification'
import List from 'raket-react/business/list'
import Item from 'raket-react/business/item'
import Initial from 'raket-react/business/initial'
import Authorization from 'raket-react/business/authorization'
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import { i18nReducer as i18n } from 'react-redux-i18n'
const reducers = {
  ...Welcome,
  ...Notification,
  ...List,
  ...Item,
  ...Initial,
  ...Authorization
}
module.exports = combineReducers(Object.assign(reducers, {
  routing,
  form,
  i18n
}))
