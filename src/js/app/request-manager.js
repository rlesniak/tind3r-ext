import axios from 'axios'

const config = {
  baseURL: 'https://api.gotinder.com/',
  timeout: 30000,
}

const instance = axios.create(config)

const token = () => localStorage.getItem('tinder-token')

const tokenInstance = () => axios.create({
  ...config,
  headers: {
    'os_version': '100000000002',
    'Authorization': `Token token="${token()}"`,
    'x-client-version': '63105',
    'X-Auth-Token': token(),
    'platform': 'ios',
    'app-version': '1786',
  }
})

export default {
  auth(facebook_token) {
    return instance.post('/auth', { facebook_token })
  },

  get(url, params = {}) {
    return tokenInstance().get(url, { params })
  },

  post(url, params = {}) {
    return tokenInstance().post(url, params)
  },
}
