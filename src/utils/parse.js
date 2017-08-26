export const listMapper = response => ({
  data: response.map(object => {
    const json = object.toJSON()
    return {
      ...json,
      id: json.objectId
    }
  })
})
