import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/base.css'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import ElementUi from 'element-ui'

import '@/utils/ax.js'

Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
