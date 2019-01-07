// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import http from './js/api'
import Head from './page/components/Header.vue'
import Back from './page/components/Back.vue'

Vue.prototype.http = http

Vue.component('Head', Head)
Vue.component('Back', Back)

require('./js/mock.js')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
