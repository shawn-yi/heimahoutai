import Vue from 'vue'

import router from '@/router/index.js'

import axios from 'axios'

import JSONBig from 'json-bigint'

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

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    router.push('/login')
  }
})

axios.defaults.transformResponse = function (data) {
  if (data) {
    return JSONBig.parse(data)
  } else {
    return data
  }
}

Vue.prototype.$http = axios
