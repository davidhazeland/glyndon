import {reduxForm} from 'redux-form'

import Component from '../components/ad-account-add-form'

export const name = 'ad-accountAdd'

export default reduxForm({
  form: name
})(Component)
