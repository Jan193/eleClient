import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/page/main/main'
import Home from '@/page/home/home'
const Detail = () => import('@/page/home/subPage/detail/detail')
const PreOrder = () => import('@/page/home/subPage/preOrder/preOrder')
const Discover = () => import('@/page/discover/discover')
const Order = () => import('@/page/order/order')
const Person = () => import('@/page/person/person')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {path: '', redirect: '/home'},
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/home',
          name: '首页',
          component: Home,
          meta: { index: 0 }
        },
        {
          path: '/discover',
          name: '发现',
          component: () => import('@/page/discover/discover'),
          meta: { index: 1 }
        },
        { path: '/order', name: '订单', component: () => import(/* webpackChunkName: "order" */ '@/page/order/order'), meta: { index: 2 } },
        { path: '/person', name: '我的', component: () => import(/* webpackChunkName: "person" */ '@/page/person/person'), meta: { index: 3 } }
      ]
    },
    {
      path: '/detail',
      name: '店铺',
      // component: Detail
      component: () => import(/* webpackChunkName: "detail" */ '@/page/home/subPage/detail/detail')
    },
    {
      path: '/preOrder',
      name: '确认下单',
      meta: {
        isToken: true
      },
      component: () => import(/* webpackChunkName: "preOrder" */ '@/page/home/subPage/preOrder/preOrder')
    },
    {
      path: '/login',
      name: '登录',
      component: () => import(/* webpackChunkName: 'login' */ '@/page/login')
    },
    {
      path: '/orderSuccess',
      name: '下单成功',
      component: () => import('@/page/home/subPage/orderSuccess.vue')
    }
  ]
})
