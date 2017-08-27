import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Component from '../components/ad-account-edit-form'

import { selectors as itemSelectors } from 'raket-react/business/item'
import { mapPath } from 'odem/utils/form'

export const name = 'ad-accountEdit'

const form = reduxForm({
  form: name,
  enableReinitialize: true
})(Component)

export default connect(state => ({
  initialValues: mapPath(itemSelectors.get(state), {
    name: 'name',
    uid: 'uid',
    store: 'store.objectId',
    currency: 'currency',
    timezone: 'timezone'
  })
}))(form)
