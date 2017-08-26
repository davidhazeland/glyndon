import React from 'react'

import {Button} from 'semantic-ui-react'
import { Form, Field, TextBox } from 'odem/components'

import {required, minimum} from 'odem/utils/validation'

const AuthenticationForm = (props) => {
  const {
    submitting
  } = props

  return (
    <Form {...props} className="AuthenticationForm">
      <Field
        name="email"
        label="Email"
        component={TextBox}
        componentProps={{
        }}
        validate={[required]}
        />

      <Field
        name="password"
        label="Password"
        component={TextBox}
        componentProps={{
          type: 'password'
        }}
        validate={[required, minimum(6)]}
        />

      <Button loading={submitting} disabled={submitting}>Login</Button>
    </Form>
  )
}

AuthenticationForm.propTypes = {

}

AuthenticationForm.displayName = 'AuthenticationForm'

export default AuthenticationForm
