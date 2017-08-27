import React from 'react'

import { Form } from 'odem/components'
import { Button } from 'semantic-ui-react'

import { Fields } from 'business/ad-account-edit'

const AdAccountAddForm = (props) => {
  const {
    submitting
  } = props

  return (
    <div className="AdAccountAddForm">
      <Form {...props}>
        <Fields/>

        <Button primary loading={submitting}>Add</Button>
      </Form>
    </div>
  )
}

AdAccountAddForm.propTypes = {

}

AdAccountAddForm.displayName = 'AdAccountAddForm'

export default AdAccountAddForm
