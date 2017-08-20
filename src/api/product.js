import Parse from 'services/parse'

import * as myself from './product'
export default myself

const Product = Parse.Object.extend('Product')
const Store = Parse.Object.extend('Store')

export function getByStoreId(id) {
  const query = new Parse.Query(Product)
  query.equalTo('store', new Store({id}))

  return query.find()
}
