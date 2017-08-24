import Parse from 'services/parse'

import * as myself from './report'
export default myself

const Report = Parse.Object.extend('Report')
const Store = Parse.Object.extend('Store')

export function getByStoreId(q, {storeId}) {
  const query = new Parse.Query(Report)
  query.equalTo('store', new Store({id: storeId}))

  return query.find().then(results => {
    return {
      data: results
    }
  })
}
