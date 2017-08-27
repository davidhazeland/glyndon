import React from 'react'

import { Header } from 'semantic-ui-react'
import Form, { name as form } from '../containers/product-edit-form'

const ProductEdit = (props) => {
  const {
    id,
    Initial,
    actions: {
      updateRequest
    }
  } = props

  function handleSubmit (data) {
    updateRequest({
      id,
      data,
      form
    })
  }

  return (
    <div className="ProductEdit" style={{width: 300, margin: '0 auto'}}>
      <Header as="h3">Edit Product</Header>

      <Form onSubmit={handleSubmit} Initial={Initial}/>
    </div>
  )
}

ProductEdit.propTypes = {

}

ProductEdit.displayName = 'ProductEdit'

export default ProductEdit
