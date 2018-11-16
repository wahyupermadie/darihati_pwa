import constant from './constant'
import Vue from "vue"
import router from '@/router/index'
import axios from "axios"

const AuthModule = {
    state: {
        user : null,
        flag : '',
        authMessage: ''
    },
    mutations: {
        setUser(state, payload)
        {
            localStorage.setItem(`user_token`, payload.success['token']);
            localStorage.setItem(`user_name`, payload.success['user_name']);
            localStorage.setItem(`user_email`, payload.success['user_email']);
            localStorage.setItem(`user_id`, payload.success['user_id']);
            localStorage.setItem(`user_logo`, payload.success['user_logo']);
            localStorage.setItem(`isloggedIn`, true);
        },
        setFlag(state,payload)
        {
            // console.log(payload)
            state.flag = payload
        },
        setAuthMessage(state,payload)
        {
            state.authMessage = payload
        }
    },
    actions: {
        loginAdmin ({commit}, payload)
        {
            axios.post(constant._BASE_URL+"login", payload,{ 
                headers: {
                'Content-type': 'application/json',
                }
            }).then(response => {
            
                var user = response.data
                commit('setUser', user)
                router.push({name: 'Dashboard'})
            })
        },

        registerAdmin({commit}, payload)
        {
            axios.post(constant._BASE_URL+"register", payload,{
                headers:{
                    'Content-type':'application/json'
                }
            }).then(response => {
                var user = response.data
                commit('setUser', user)
                router.push({name: 'Dashboard'})
            })
        }
    },
    getters:{
        getFlag(state){
            return state.flag
        },
        getMessage(state)
        {
            return state.authMessage
        }
    }
}

export default AuthModule