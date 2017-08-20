import Parse from 'services/parse'

import * as myself from './advert-account'
export default myself

const AdvertAccount = Parse.Object.extend('AdvertAccount')
const Store = Parse.Object.extend('Store')

export function getByStoreId(id) {
  const query = new Parse.Query(AdvertAccount)
  query.equalTo('store', new Store({id}))

  return query.find()
}
