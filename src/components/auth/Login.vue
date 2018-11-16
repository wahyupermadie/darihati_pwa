<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="email" type="text" class="form-control" placeholder="Email" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="password" type="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button v-on:click="login()" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
              <b-card-footer class="mb-3">
              <b-row>
                <b-col cols="12">
                  tidak punya akun ? silahkan <router-link to="/auth/register">Register</router-link> 
                </b-col>
              </b-row>
            </b-card-footer>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import axios from "axios"
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      flag : '',
      messages : '',
    }
  },
  computed:{
    getFlag(){
      
      // console.log(this.$store.getters.getFlag)
        return this.$store.getters.getFlag
    }, 
    getMessage(){
      // console.log(this.$store.getters.getMessage)
      return this.$store.getters.getMessage
    }
  },
  watch: {
    getFlag (data) {
        this.flag = data
    },
    getMessage(data){
      this.messages = data
    }
  },
  methods:{
      login(){
          var data = {
              "email": this.email,
              "password" : this.password
          }
          this.$store.dispatch('loginAdmin', data)
          
      }
  }
}
</script>
