import Parse from 'services/parse'

import * as myself from './ad-insight'
export default myself

const AdInsight = Parse.Object.extend('AdInsight')
const AdvertAccount = Parse.Object.extend('AdvertAccount')

export function getByAdAccId(id, date) {
  const query = new Parse.Query(AdInsight)
  query.equalTo('account', new AdvertAccount({id}))
  query.equalTo('date', date)

  return query.find()
}
