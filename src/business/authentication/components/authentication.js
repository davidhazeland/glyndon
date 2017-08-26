import React from 'react'

import Form, {name as form} from '../containers/authentication-form'

import {Message} from 'odem/components'
import {Grid} from 'semantic-ui-react'

const Authentication = (props) => {
  const {
    Notification,
    actions: {
      authenticationRequest
    }
  } = props

  function handleSubmit (data) {
    authenticationRequest({
      data,
      form
    })
  }

  return (
    <Grid className="Authentication" centered>
      <Grid.Column mobile="12" tablet="8" computer="4">
        <Message {...Notification} dismissable={false}/>
        <Form onSubmit={handleSubmit}/>
      </Grid.Column>
    </Grid>
  )
}

Authentication.propTypes = {

}

Authentication.displayName = 'Authentication'

export default Authentication
