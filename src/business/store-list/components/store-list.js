
import React from 'react'

import { List as ListComponent, Confirm } from 'odem/components'
import { Link } from 'react-router-dom'
import { Header, Button, Icon } from 'semantic-ui-react'

const StoreList = (props) => {
  const {
    List,
    actions: {
      fetchRequest,
      deleteRequest
    }
  } = props

  function handleDelete (id) {
    deleteRequest({
      id
    })
  }

  return (
    <div className="StoreList">
      <Header as="h3">Store Management</Header>
      <ListComponent
        {...List}
        renderers={createRenderers(handleDelete)}
        actions={{fetchRequest}}
        footer={
          <Link to="/stores/add">
            <Button floated='right' icon labelPosition='left' positive size='small'>
              <Icon name='shopping bag' /> Add Store
            </Button>
          </Link>
        }
        />
    </div>
  )
}

function createRenderers(handleDelete) {
  return [
    {header: {text: 'ID'}, body: {render: item => item.id}},
    {header: {text: 'URL'}, body: {render: item => item.storeUrl}},
    {header: {text: ''}, body: {render: item => {
      return (
        <div>
          <Link to={`/stores/${item.id}/edit`}>
            <Button primary size="mini">Edit</Button>
          </Link>

          <Confirm
            trigger={
              <Button
                negative
                size="mini"
                loading={item.isRemoving}>Delete</Button>
            }
            text="Do you wanna delete this one?"
            onConfirm={handleDelete.bind(null, item.id)}
          />
        </div>
      )
    }, props: {textAlign: 'right'}}}
  ]
}

StoreList.propTypes = {

}

StoreList.displayName = 'StoreList'

export default StoreList
