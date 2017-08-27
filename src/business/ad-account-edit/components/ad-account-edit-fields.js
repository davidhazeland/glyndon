import React from 'react'
import _ from 'lodash'

import { Field, TextBox, SelectBox } from 'odem/components'

import { required } from 'odem/utils/validation'

import { StoreList } from 'constants'

const AdAccountEditFields = () => {
  return (
    <div className="AdAccountEditFields field">
      <Field
        name="name"
        label="Name"
        component={TextBox}
        validate={[required]}
        />

      <Field
        name="uid"
        label="ID"
        component={TextBox}
        validate={[required]}
        />

      <Field
        name="store"
        label="Store"
        component={SelectBox}
        componentProps={{
          options: _.map(StoreList, (value, key) => {
            return {
              key,
              value: key,
              text: value
            }
          })
        }}
        validate={[required]}
        />

      <Field
        name="currency"
        label="Currency"
        component={TextBox}
        validate={[required]}
        />

      <Field
        name="timezone"
        label="Timezone"
        component={TextBox}
        validate={[required]}
        />

    </div>
  )
}

AdAccountEditFields.propTypes = {

}

AdAccountEditFields.displayName = 'AdAccountEditFields'

export default AdAccountEditFields
