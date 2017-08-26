import React from 'react'

import { Header } from 'semantic-ui-react'
import Form, { name as form } from '../containers/store-add-form'

const StoreAdd = (props) => {
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
    <div className="StoreAdd" style={{width: 300, margin: '0 auto'}}>
      <Header as="h3">Edit Store</Header>
      <Form onSubmit={handleSubmit}/>
    </div>
  )
}

StoreAdd.propTypes = {

}

StoreAdd.displayName = 'StoreAdd'

export default StoreAdd
