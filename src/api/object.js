import Parse from 'services/parse'

import { listMapper } from 'utils/parse'

export default name => {
  const Type = Parse.Object.extend(name);

  return {
    fetch() {
      const query = new Parse.Query(Type);
      query.limit(10)
      return query.find().then(listMapper)
    },

    get(id) {
      const query = new Parse.Query(Type);
      query.equalTo('objectId', id)
      return query.first().then(response => {
        const json = response.toJSON()
        return {
          ...json,
          id: json.objectId
        }
      })
    },

    edit(id, data) {
      const type = new Type()
      type.id = id
      type.set(data)
      return type.save()
    },

    add(data) {
      const type = new Type()
      type.set(data)
      return type.save()
    },

    remove(id) {
      const type = new Type()
      type.id = id
      return type.destroy()
    }
  }
}
