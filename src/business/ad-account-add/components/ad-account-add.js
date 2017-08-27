import React from 'react'

import { Header } from 'semantic-ui-react'
import Form, { name as form } from '../containers/ad-account-add-form'

const AdAccountAdd = (props) => {
  const {
    actions: {
      createRequest
    }
  } = props

  function handleSubmit (data) {
    createRequest({
      data,
      form
    })
  }

  return (
    <div className="AdAccountAdd" style={{width: 300, margin: '0 auto'}}>
      <Header as="h3">Edit AdAccount</Header>
      <Form onSubmit={handleSubmit}/>
    </div>
  )
}

AdAccountAdd.propTypes = {

}

AdAccountAdd.displayName = 'AdAccountAdd'

export default AdAccountAdd
