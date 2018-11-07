import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from './AuthModule'
import StudentModule  from './StudentModule'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules:{
        authModule : AuthModule,
        studentModule : StudentModule
    },
    state: {
        
    },
    mutations: {

    },
    actions: {

    },
    getters: {

    }
})