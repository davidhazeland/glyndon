import { reduxForm } from 'redux-form'

import Component from '../components/day-report-filter'

export const name = 'dayReport'

export default reduxForm({
  form: name
})(Component)
