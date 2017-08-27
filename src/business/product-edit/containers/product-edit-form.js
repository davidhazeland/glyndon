import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Component from '../components/product-edit-form'

import { selectors as itemSelectors } from 'raket-react/business/item'
import { mapPath } from 'odem/utils/form'

export const name = 'productEdit'

const form = reduxForm({
  form: name,
  enableReinitialize: true
})(Component)

export default connect(state => ({
  initialValues: mapPath(itemSelectors.get(state), {
    title: 'title',
    cost: 'cost'
  })
}))(form)
