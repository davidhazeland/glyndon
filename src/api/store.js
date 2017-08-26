import Parse from 'services/parse'

import { listMapper } from 'utils/parse'

import * as myself from './store'
export default myself

const Store = Parse.Object.extend('Store');

export function fetch({page}) {
  const query = new Parse.Query(Store);
  query.limit(10)
  return query.find().then(listMapper)
}

export function get(id) {
  const query = new Parse.Query(Store);
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
  const user = new Store()
  user.id = id
  user.set(data)
  return user.save()
}

export function add(data) {
  const user = new Store()
  user.set(data)
  return user.save()
}

export function remove(id) {
  const user = new Store()
  user.id = id
  return user.destroy()
}
