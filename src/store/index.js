import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from './AuthModule'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules:{
        authModule : AuthModule
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