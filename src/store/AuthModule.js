import constant from './constant'
import Vue from "vue"
import axios from "axios"

const AuthModule = {
    state: {
        user : null
    },
    mutations: {
        setUser(state, payload)
        {
            localStorage.setItem(`user_token`, payload.success['token']);
            localStorage.setItem(`user_name`, payload.success['user_name']);
            localStorage.setItem(`user_email`, payload.success['user_email']);
            localStorage.setItem(`user_id`, payload.success['user_id']);
            localStorage.setItem(`isloggedIn`, true);
        }
    },
    actions: {
        loginAdmin ({commit}, payload)
        {
            axios.post(constant._BASE_URL+"admin/login", payload,{ 
                headers: {
                'Content-type': 'application/json',
                }
            }).then(response => {
            
                var user = response.data
                commit('setUser', user)
            })
        },

        registerAdmin({commit}, payload)
        {
            axios.post(constant._BASE_URL+"admin/register", payload,{
                headers:{
                    'Content-type':'application/json'
                }
            }).then(response => {
                var user = response.data
                console.log(user)
                commit('setUser', user)
            })
        }
    }
}

export default AuthModule