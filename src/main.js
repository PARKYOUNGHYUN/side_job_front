import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

const base = axios.create({
  baseURL: 'http://localhost:8080/api/'
})

Vue.prototype.$http = base

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
