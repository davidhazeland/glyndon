import React from 'react'

import { Header } from 'semantic-ui-react'
import Form, { name as form } from '../containers/store-edit-form'

const StoreEdit = (props) => {
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
    <div className="StoreEdit" style={{width: 300, margin: '0 auto'}}>
      <Header as="h3">Edit Store</Header>

      <Form onSubmit={handleSubmit} Initial={Initial}/>
    </div>
  )
}

StoreEdit.propTypes = {

}

StoreEdit.displayName = 'StoreEdit'

export default StoreEdit
