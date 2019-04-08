import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import RegisterPage from './views/RegisterPage.vue'
import LoginPage from './views/LoginPage.vue'
import store from './store'

Vue.use(Router)
Vue.use(store)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      beforeEnter(to, from, next) {
        store.dispatch('isAuth').then(res => {
          if (res.status === 200) {
            next()
          } else {
            router.push({ name: 'login' })
          }
        })
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
