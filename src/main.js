// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { store } from './store'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import vSelect from 'vue-select'
import VueSweetalert2 from 'vue-sweetalert2';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

Vue.component('v-pulse',PulseLoader)
Vue.use(VueSweetalert2);
Vue.component('v-select', vSelect)
Vue.config.productionTip = false

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(reg => {
      console.log('Service Worker has been registered');
    })
    .catch(e =>
      console.error('Error during service worker registration:', e)
    );
} else {
  console.warn('Service Worker is not supported');
}
/* eslint-disable no-new */

Vue.use(BootstrapVue)
Vue.use(Notifications,{velocity})
router.beforeEach((to, from, next) => {
  // document.title = to.meta.title
  const user = localStorage.getItem(`isloggedIn`);
  console.log(user)
  next()
  // check if the route requires authentication and user is not logged in
  if (to.matched.some(route => route.meta.requiresAuth) && user == 'false' || to.matched.some(route => route.meta.requiresAuth) && user == null) {
      // redirect to login page
      next({ path: '/auth/login' })
      return
  }
  // if logged in redirect to dashboard
  if(to.path == '/auth/login' && user == 'true' || to.path == '/auth/register' && user == 'true') {
      next({ path: '/dashboard' })
      return
  }

  next()
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

