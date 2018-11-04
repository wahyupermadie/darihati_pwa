import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

// Containers
import DefaultContainer from '@/components/container/DefaultContainer'

// Views
import Dashboard from '@/components/page/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/auth',
      redirect: '/auth/login',
      name: 'Auths',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
