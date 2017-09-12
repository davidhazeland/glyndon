import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Component from '../components/day-report-filter'

export const name = 'dayReport'

const form = reduxForm({
  form: name,
  enableReinitialize: true
})(Component)

export default connect(state => ({
  initialValues: {
    country: 'All'
  }
}))(form)
