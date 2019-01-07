import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => Promise.reject(error))

// 封装
// export function fetch (type, url, params = {}) {
//   return new Promise((resolve, reject) => {
//     type.toUpperCase() === 'GET' ? axios.get(url, params).then(response => resolve(response)).catch(error => reject(error)) : axios.post(url, params).then(response => resolve(response)).catch(error => reject(error))
//   })
// }

// export default {
//   API (type, url, params) {
//     return fetch(type, url, params)
//   }
// }

const http = {
  get (url, params = {}) {
    return axios.get(url, params)
  },
  post (url, params = {}) {
    return axios.post(url, params)
  }
}

export default http
