import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import RegisterPage from './views/RegisterPage.vue'
import LoginPage from './views/LoginPage.vue'
import store from './store'

Vue.use(Router)
Vue.use(store)

/**
 * Router is used to 'push' specific views. 
 */
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
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

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // Before each attempt to change current view, Router checks if accessToken exists and if the user is logged in.
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('user-token')
  const loggedIn = store.state.auth

  if (authRequired && !loggedIn && !token) {
    return next('/login')
  }

  next()
})

export default router
