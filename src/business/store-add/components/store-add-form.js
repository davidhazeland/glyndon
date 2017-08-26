import React from 'react'

import { Form } from 'odem/components'
import { Button } from 'semantic-ui-react'

import { Fields } from 'business/store-edit'

const StoreAddForm = (props) => {
  const {
    submitting
  } = props

  return (
    <div className="StoreAddForm">
      <Form {...props}>
        <Fields/>

        <Button primary loading={submitting}>Add</Button>
      </Form>
    </div>
  )
}

StoreAddForm.propTypes = {

}

StoreAddForm.displayName = 'StoreAddForm'

export default StoreAddForm
