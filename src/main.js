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

let userInfo = window.sessionStorage.getItem('userInfo')
if (userInfo) {
  userInfo = JSON.parse(userInfo)
}

Vue.prototype.getUserName = function () {
  let userName = ''
  if (userInfo) {
    userName = userInfo.userName
  }
  return userName
}
Vue.prototype.getUserId = function () {
  let userId = ''
  if (userInfo) {
    userId = userInfo.userId
  }
  return userId
}

Vue.component('Head', Head)
Vue.component('Back', Back)

require('./js/mock.js')

router.beforeEach((to, from, next) => {
  if (to.meta.isToken) {
    const userInfo = window.sessionStorage.getItem('userInfo')
    if (userInfo) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
  document.title = to.name
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
