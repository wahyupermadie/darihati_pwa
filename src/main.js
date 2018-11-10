// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { store } from './store'
import Vuelidate from 'vuelidate'

import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import vSelect from 'vue-select'

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

Vue.use(Vuelidate)
Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

