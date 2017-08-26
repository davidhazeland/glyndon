import React from 'react'

import { Field, TextBox } from 'odem/components'

import { required } from 'odem/utils/validation'

const StoreEditFields = () => {
  return (
    <div className="StoreEditFields field">
      <Field
        name="storeUrl"
        label="Url"
        component={TextBox}
        validate={[required]}
        />
    </div>
  )
}

StoreEditFields.propTypes = {

}

StoreEditFields.displayName = 'StoreEditFields'

export default StoreEditFields
