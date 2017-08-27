import React from 'react'

import { Form } from 'odem/components'
import { Button } from 'semantic-ui-react'

import Fields from './product-edit-fields'

const ProductEditForm = (props) => {
  const {
    submitting,
    Initial: {
      initializing
    }
  } = props

  return (
    <div className="ProductEditForm">
      <Form {...props} loading={initializing}>
        <Fields/>

        <Button primary loading={submitting}>Update</Button>
      </Form>
    </div>
  )
}

ProductEditForm.propTypes = {

}

ProductEditForm.displayName = 'ProductEditForm'

export default ProductEditForm
