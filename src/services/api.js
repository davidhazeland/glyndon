import { create } from 'odem/utils/api'
import { getToken } from './auth'

import { apiBaseURL } from 'config'

const api = create({
  baseURL: apiBaseURL,
  token: getToken()
})

export default {
  request(...params) {
    return api.request(...params)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  }
}
