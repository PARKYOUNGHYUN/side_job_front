import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/views/Top'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Mypage from '@/views/Mypage'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false
  if (isAuthenticated) return next()
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
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Mypage',
      name: 'Mypage',
      component: Mypage,
      beforeEnter: requireAuth()
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history'
})
