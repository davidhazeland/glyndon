import Parse from 'services/parse'

import { listMapper } from 'utils/parse'

import * as myself from './ad-account'
export default myself

const AdvertAccount = Parse.Object.extend('AdvertAccount');

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
  const user = new AdvertAccount()
  user.id = id
  user.set(data)
  return user.save()
}

export function add(data) {
  const user = new AdvertAccount()
  user.set(data)
  return user.save()
}

export function remove(id) {
  const user = new AdvertAccount()
  user.id = id
  return user.destroy()
}
