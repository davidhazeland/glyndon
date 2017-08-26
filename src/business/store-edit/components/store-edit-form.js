import React from 'react'

import { Form } from 'odem/components'
import { Button } from 'semantic-ui-react'

import Fields from './store-edit-fields'

const StoreEditForm = (props) => {
  const {
    submitting,
    Initial: {
      initializing
    }
  } = props

  return (
    <div className="StoreEditForm">
      <Form {...props} loading={initializing}>
        <Fields/>

        <Button primary loading={submitting}>Update</Button>
      </Form>
    </div>
  )
}

StoreEditForm.propTypes = {

}

StoreEditForm.displayName = 'StoreEditForm'

export default StoreEditForm
