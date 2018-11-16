<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card header="<i class='fa fa-star'></i> Pembayaran Dashboard">
            <div v-if="isLoading" > 
              <center>
                <v-pulse></v-pulse>
              </center>
            </div>
            <div v-else class="table-responsive">
                <table class="table table-striped table-bordered table-hover" >
                <thead>
                  <tr>
                      <th>No</th> 
                      <th>Nama Pendanaan</th>
                      <th>Nama Member</th>
                      <th>Tanggal Transfer</th>
                      <th>Status</th>
                      <th>Bukti</th>
                      <th>Aksi</th>
                  </tr>
                </thead>
                <tbody v-if="payments.length !== null">
                  <tr v-for="(value,index) in payments" :key="index">
                      <td>{{index+1}}</td>
                      <td>{{value.title_fundings}}</td>
                      <td>{{value.name}}</td>
                      <td>{{value.tanggal_transfer}}</td>
                      <td v-if="value.confirmed == '1'">
                          <b-badge pill variant="success">LUNAS</b-badge>
                      </td>
                      <td v-else>
                            <b-badge pill variant="danger">Belum Lunas</b-badge>
                      </td>
                      <td>
                        <!-- <b-img fluid 
                          class="imageFile" 
                          center 
                          :src="'http://127.0.0.1:8000/adikasuh/'+student.foto"
                          alt="center image">
                        </b-img> -->
                      </td>
                      <td>
                          <button type="button" @click="confirm(value.id)" class="btn btn-xs btn-outline-success"><span class="fa fa-pencil"></span></button>
                          <button type="button" class="btn btn-xs btn-outline-danger"><span class="fa fa-trash"></span></button>
                      </td>
                  </tr>
                </tbody>
                <tbody v-else>
                    <td colspan="8">
                        <center>
                            Tidak Ada Data
                        </center>
                    </td>
                </tbody>
              </table>
            </div>
          </b-card>
        </b-col><!--/.col-->
      </b-row><!--/.row-->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {getCache,storedCache} from '@/cache'
const token = localStorage.getItem(`user_token`);
import constant from '../../../store/constant';
const community_id = localStorage.getItem('user_id');
export default {
  data () {
    return {
       isModalVisible: false,
       payments : [],
       isLoading: true,
    }
  },
  created(){
     this.getPayment()
  },
  beforeMount()
  {
    
  },
  methods:{
      openSpinner()
      {
        this.isLoading = true
      },
      closeSpinner()
      {
        this.isLoading = false
      },
      alert(message,type)
      {
        this.$notify({
            group: 'notif',
            title: 'Important message',
            text: message,
            type: type
        });
      },
      getPayment()
      {
        let data = {
            "id":localStorage.getItem('user_id')
        }
        this.openSpinner()
        axios.post(constant._BASE_URL+"payment/all",data,{
            headers:{
                'Content-type': 'application/json',
                'Authorization' : 'Bearer '+token,
            }
        }).then(response =>{
            this.payments = response.data
            this.closeSpinner()
        })
      },
      confirm(id)
      {
            let data = {
                "id":id
            }
            axios.post(constant._BASE_URL+"payment/update",data,
                {
                headers:{
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
                this.alert(response.data['success'],'success')
            })
      }
  }
}
</script>
<style scoped>
.imageFile {
  height: 150px;
}
.imageHome {
  width: 30%;
  display: inline-block;
  margin-left: 0dp;
  margin-right: 0dp;
}
</style>
