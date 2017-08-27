import Parse from 'services/parse'
import { listMapper } from 'utils/parse'

import * as myself from './product'
export default myself

const Product = Parse.Object.extend('Product')
const Store = Parse.Object.extend('Store')

export function getByStoreId(id) {
  const query = new Parse.Query(Product)
  query.equalTo('store', new Store({id}))

  return query.find()
}

export function fetch({page}, {storeId}) {
  const query = new Parse.Query(Product);
  query.limit(100)
  query.equalTo('store', new Store({id: storeId}))
  return query.find().then(listMapper)
}

export function get(id) {
  const query = new Parse.Query(Product);
  query.equalTo('objectId', id)
  return query.first().then(response => {
    const json = response.toJSON()
    return {
      ...json,
      id: json.objectId
    }
  })
}

export function edit(id, data) {
  const user = new Product()
  user.id = id
  user.set(data)
  return user.save()
}

export function add(data) {
  const user = new Product()
  user.set(data)
  return user.save()
}

export function remove(id) {
  const user = new Product()
  user.id = id
  return user.destroy()
}
