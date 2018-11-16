<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form v-on:submit.prevent="register()" enctype="multipart/form-data">
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="nama" type="text" class="form-control" placeholder="Enter Community Name" required autocomplete="fullname" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="email" type="email" class="form-control" placeholder="Enter Community Email" required autocomplete="email" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-phone"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="no_telepon" type="text" class="form-control" placeholder="Enter Community Phone Number" required autocomplete="phone" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="password" type="password" class="form-control" placeholder="Password" required autocomplete="new-password" />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="confirm_password" type="password" class="form-control" required placeholder="Repeat password" autocomplete="new-password" />
                </b-input-group>
                
                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="cui-file"></i></b-input-group-text>
                    </b-input-group-prepend>
                        <b-form-textarea id="textarea"
                        v-model="deskripsi"
                        placeholder="Enter Deskripsi "
                        :rows="3"
                        :max-rows="6">
                    </b-form-textarea>
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-home"></i></b-input-group-text>
                    </b-input-group-prepend>
                        <b-form-textarea id="textarea1"
                        v-model="address"
                        placeholder="Enter Community Address"
                        :rows="3"
                        :max-rows="6">
                    </b-form-textarea>
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-form-file name="fileIdentity" id="fileIdentity"  placeholder="Choose identity file..."></b-form-file>
                </b-input-group>

                <b-button type="submit" variant="success" block>Create Account</b-button>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="12">
                  already have an account ? please <router-link to="/auth">login</router-link> 
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import axios from "axios"
export default {
  name: 'Register',
  data(){
      return {
            nama : "",
            email : "",
            no_telepon : "",
            password : "",
            confirm_password : "",
            address:"",
            flag : '',
            messages : '',
            deskripsi : '',
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
  methods: {
      register()
      {
        let formData = new FormData()
        var identity = document.getElementById('fileIdentity')
        formData.append('file', identity.files[0])
        formData.append('name', this.nama)
        formData.append('email', this.email)
        formData.append('telepon', this.no_telepon)
        formData.append('password',this.password)
        formData.append('address',this.address)
        formData.append('confirm_password', this.confirm_password)
        formData.append('deskripsi', this.deskripsi)
        // console.log(formData)
        this.$store.dispatch('registerAdmin', formData)
      }
  }
}
</script>
