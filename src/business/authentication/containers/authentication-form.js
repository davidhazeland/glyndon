import { reduxForm } from 'redux-form'

import Component from '../components/authentication-form'

export const name = 'authentication'

export default reduxForm({
  form: name
})(Component)
