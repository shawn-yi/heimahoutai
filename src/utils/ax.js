import Vue from 'vue'

import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

axios.interceptors.request.use(function (config) {
  let userinfo = window.sessionStorage.getItem('token')
  if (userinfo) {
    config.headers.Authorization = 'Bearer ' + JSON.parse(userinfo).token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$http = axios
