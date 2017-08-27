import React from 'react'

import { Field, TextBox } from 'odem/components'

import { required } from 'odem/utils/validation'

const ProductEditFields = () => {
  return (
    <div className="ProductEditFields field">
      <Field
        name="title"
        label="Title"
        component={TextBox}
        validate={[required]}
        />

      <Field
        name="cost"
        label="Cost"
        component={TextBox}
        componentProps={{
          type: 'number'
        }}
        validate={[required]}
        />
    </div>
  )
}

ProductEditFields.propTypes = {

}

ProductEditFields.displayName = 'ProductEditFields'

export default ProductEditFields
