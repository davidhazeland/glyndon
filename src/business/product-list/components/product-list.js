
import React from 'react'

import { List as ListComponent, Confirm } from 'odem/components'
import { Link } from 'react-router-dom'
import { Header, Button } from 'semantic-ui-react'

const ProductList = (props) => {
  const {
    storeId,
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
    <div className="ProductList">
      <Header as="h3">Product Management</Header>
      <ListComponent
        {...List}
        renderers={createRenderers(handleDelete, storeId)}
        actions={{fetchRequest}}
        />
    </div>
  )
}

function createRenderers(handleDelete, storeId) {
  return [
    {header: {text: 'ID'}, body: {render: item => item.uid}},
    {header: {text: 'Title'}, body: {render: item => item.title}},
    {header: {text: 'Cost'}, body: {render: item => item.cost}},
    {header: {text: ''}, body: {render: item => {
      return (
        <div>
          <Link to={`/stores/${storeId}/products/${item.id}/edit`}>
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

ProductList.propTypes = {

}

ProductList.displayName = 'ProductList'

export default ProductList
