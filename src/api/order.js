import Parse from 'services/parse'

import * as myself from './order'
export default myself

const Order = Parse.Object.extend('Order')
const Store = Parse.Object.extend('Store')

export function getByStoreId(id, todayTimestamp) {
  const query = new Parse.Query(Order)
  query.equalTo('store', new Store({id}))
  query.greaterThan('orderDate', todayTimestamp)

  return query.find()
}
