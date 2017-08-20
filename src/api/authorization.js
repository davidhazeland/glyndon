import api from 'services/api'

import * as myself from './authorization'
export default myself

const baseEndpoint = ''

export function authorize({email, password}) {
  const endpoint = `${baseEndpoint}/auth`
  return api.request({
    url: endpoint,
    method: 'POST',
    data: {
      email,
      password
    }
  })
}
