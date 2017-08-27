
import React from 'react'

import { List as ListComponent, Confirm } from 'odem/components'
import { Link } from 'react-router-dom'
import { Header, Button, Icon } from 'semantic-ui-react'

const AdAccountList = (props) => {
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
    <div className="AdAccountList">
      <Header as="h3">Advert Account Management</Header>
      <ListComponent
        {...List}
        renderers={createRenderers(handleDelete)}
        actions={{fetchRequest}}
        footer={
          <Link to="/ad-accounts/add">
            <Button floated='right' icon labelPosition='left' positive size='small'>
              <Icon name='cube' /> Add Advert Account
            </Button>
          </Link>
        }
        />
    </div>
  )
}

function createRenderers(handleDelete) {
  return [
    {header: {text: 'Name'}, body: {render: item => item.name}},
    {header: {text: 'ID'}, body: {render: item => item.uid}},
    {header: {text: 'Store'}, body: {render: item => item.store.objectId}},
    {header: {text: 'Currency'}, body: {render: item => item.currency}},
    {header: {text: 'Timezone'}, body: {render: item => item.timezone}},
    {header: {text: ''}, body: {render: item => {
      return (
        <div>
          <Link to={`/ad-accounts/${item.id}/edit`}>
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

AdAccountList.propTypes = {

}

AdAccountList.displayName = 'AdAccountList'

export default AdAccountList
