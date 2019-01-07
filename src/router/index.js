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
          name: 'home',
          component: Home
        },
        {
          path: '/discover',
          name: '发现',
          component: import('@/page/discover/discover')
        },
        // { path: '/order', name: '订单', component: Order },
        { path: '/order', name: '订单', component: () => import(/* webpackChunkName: "order" */ '@/page/order/order') },
        // { path: '/person', name: '我的', component: Person },
        { path: '/person', name: '我的', component: () => import(/* webpackChunkName: "person" */'@/page/person/person') },
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
      // component: PreOrder
      component: () => import(/* webpackChunkName: "preOrder" */ '@/page/home/subPage/preOrder/preOrder')
    }
  ]
})
