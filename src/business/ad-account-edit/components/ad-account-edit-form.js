import React from 'react'

import { Form } from 'odem/components'
import { Button } from 'semantic-ui-react'

import Fields from './ad-account-edit-fields'

const AdAccountEditForm = (props) => {
  const {
    submitting,
    Initial: {
      initializing
    }
  } = props

  return (
    <div className="AdAccountEditForm">
      <Form {...props} loading={initializing}>
        <Fields/>

        <Button primary loading={submitting}>Update</Button>
      </Form>
    </div>
  )
}

AdAccountEditForm.propTypes = {

}

AdAccountEditForm.displayName = 'AdAccountEditForm'

export default AdAccountEditForm
