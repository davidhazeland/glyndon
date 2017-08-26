import {reduxForm} from 'redux-form'

import Component from '../components/store-add-form'

export const name = 'storeAdd'

export default reduxForm({
  form: name
})(Component)
