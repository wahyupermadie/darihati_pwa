import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

// Containers
import DefaultContainer from '@/components/container/DefaultContainer'

// Views
import Dashboard from '@/components/page/Dashboard'
import Student from '@/components/page/student/Student'
import DetailStudent from '@/components/page/student/DetailStudent'

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
        },
        {
          path: 'student',
          name: 'Student',
          component: Student
        },
        {
          path: 'student/:student_id',
          name: 'DetailStudent',
          component: DetailStudent
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
