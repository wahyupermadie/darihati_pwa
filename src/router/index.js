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
import Funding from '@/components/page/fundings/Funding'
import Payment from '@/components/page/fundings/KonfirmasiFunding'
import News from '@/components/page/news/News'
import Member from '@/components/page/member/Member'
import User from '@/components/page/user/User'

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
          component: Dashboard,
          meta: {
            requiresAuth: true 
          }  
        },
        {
          path: 'student',
          name: 'Student',
          component: Student,
          meta: {
            requiresAuth: true 
          }  
        },
        {
          path: 'student/:student_id',
          name: 'DetailStudent',
          component: DetailStudent,
          meta: {
            requiresAuth: true 
          }  
        },
        {
          path: 'funding',
          name: 'Funding',
          component : Funding,
          meta: {
            requiresAuth: true 
          }  
        },
        {
          path: 'payment',
          name: 'Payment',
          component: Payment,
          meta: { 
            requiresAuth: true 
          }  
        },
        {
          path: 'news',
          name: 'News',
          component: News,
          meta: { 
            requiresAuth: true 
          }  
        },
        {
          path: 'members',
          name: 'Members',
          component: Member,
          meta: { 
            requiresAuth: true 
          }  
        },
        {
          path: 'user',
          name: 'User',
          component: User,
          meta: { 
            requiresAuth: true 
          }  
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
  ],
})
