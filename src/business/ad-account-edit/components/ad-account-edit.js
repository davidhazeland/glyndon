import React from 'react'

import { Header } from 'semantic-ui-react'
import Form, { name as form } from '../containers/ad-account-edit-form'

const AdAccountEdit = (props) => {
  const {
    id,
    Initial,
    actions: {
      updateRequest
    }
  } = props

  function handleSubmit (data) {
    updateRequest({
      id,
      data,
      form
    })
  }

  return (
    <div className="AdAccountEdit" style={{width: 300, margin: '0 auto'}}>
      <Header as="h3">Edit AdAccount</Header>

      <Form onSubmit={handleSubmit} Initial={Initial}/>
    </div>
  )
}

AdAccountEdit.propTypes = {

}

AdAccountEdit.displayName = 'AdAccountEdit'

export default AdAccountEdit
