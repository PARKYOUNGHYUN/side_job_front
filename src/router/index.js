import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/views/Top'
import Search from '@/views/Search'
import Mypage from '@/views/Mypage'
import Detail from '@/views/Detail'
import store from '@/store'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
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
      path: '/job/Detail/:id',
      name: 'Detail',
      component: Detail
    }
  ],
  mode: 'history'
})
