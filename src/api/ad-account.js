import Parse from 'services/parse'

import { listMapper } from 'utils/parse'

import * as myself from './ad-account'
export default myself

const AdvertAccount = Parse.Object.extend('AdvertAccount');
const Store = Parse.Object.extend('Store');

export function fetch({page}) {
  const query = new Parse.Query(AdvertAccount);
  query.limit(10)
  return query.find().then(listMapper)
}

export function get(id) {
  const query = new Parse.Query(AdvertAccount);
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
  const adAccount = new AdvertAccount()
  adAccount.id = id
  adAccount.set({
    ...data,
    store: new Store({id: data.store})
  })
  return adAccount.save()
}

export function add(data) {
  const adAccount = new AdvertAccount()
  adAccount.set({
    ...data,
    store: new Store({id: data.store})
  })
  return adAccount.save()
}

export function remove(id) {
  const adAccount = new AdvertAccount()
  adAccount.id = id
  return adAccount.destroy()
}
