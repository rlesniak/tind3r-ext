import axios from 'axios'

let config = {}

let instance = axios.create(config)

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
  setConfig(value) {
    config = value;
    console.log('set', value, config);

    instance = axios.create(config);
  },
  auth(facebook_token) {
    console.log(config);

    return axios.post(config.baseURL + '/auth', { facebook_token })
  },

  get(url, params = {}) {
    return tokenInstance().get(url, { params })
  },

  post(url, params = {}) {
    return tokenInstance().post(url, params)
  },

  put(url, params = {}) {
    return tokenInstance().put(url, params)
  },

  delete(url, params = {}) {
    return tokenInstance().delete(url, params)
  },
}
