<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        v-bind:src="'https://darihati.futnet.id/community/'+logo"
        class="img-avatar"
        alt="avatar community" />
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <!-- <b-dropdown-item @click="profile()"><i class="fa fa-user" /> Profile</b-dropdown-item> -->
      <b-dropdown-item @click="logout()"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
    
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
      itemsCount: 42 
      }
  },
  computed:
  {
    logo()
    {
      return localStorage.getItem('user_logo');
    }
  },
  methods:{
    profile()
    {
      this.$router.push({name: 'User'})
    },
    logout()
    {
      this.$swal({
          title: 'Konfirmasi ',
          text: 'Apakah anda yakin akan melakukan logout ?',
          type: 'error',
          showCancelButton: true,
          confirmButtonText: 'Yes Logout!',
          cancelButtonText: 'No, Cancel!',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            this.$swal('Logout', 'You successfully logout from this system', 'success')
            localStorage.setItem('isloggedIn','false')
            this.$router.push({name: 'Login'})
          } else {
    
          }
        })
    }
  }
}
</script>
