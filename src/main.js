import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/base.css'

import ElementUi from 'element-ui'

import '@/utils/ax.js'

Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
