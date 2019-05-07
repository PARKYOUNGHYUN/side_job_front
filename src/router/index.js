import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/views/Top'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Mypage from '@/views/Mypage'
import store from '@/store'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  console.log("test1 = " + store.getters.getIsAuth);
  if (store.getters.getIsAuth) return next()
  next('/')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage,
      beforeEnter: requireAuth()
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history'
})
