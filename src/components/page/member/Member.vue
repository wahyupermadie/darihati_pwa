<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card header="<i class='fa fa-star'></i> Member Dashboard">
            <b-tabs>
            <b-tab @click="getData()" title="Daftar Member" active>
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
                                <th>Nama</th>
                                <th>Telepon</th>
                                <th>Alamat</th>
                                <th>Foto</th>
                                <!-- <th>Aksi</th> -->
                            </tr>
                        </thead>
                        <tbody v-if="members.length !== null && members.length > 0">
                            <tr v-for="(value,index) in members" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{value.name}}</td>
                                <td>{{value.phone}}</td>
                                <td>{{value.alamat}}</td>
                                <td>
                                    <b-img thumbnail fluid :src="'https://darihati.futnet.id/member/'+value.foto" alt="Thumbnail" />
                                </td>
                                <!-- <td>
                                    <button type="button" class="btn btn-xs btn-outline-warning"><span class="fa fa-pencil"></span></button>
                                    <button type="button" class="btn btn-xs btn-outline-danger"><span class="fa fa-trash"></span></button>
                                </td> -->
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <td colspan="6">
                                <center>
                                    Tidak Ada Data
                                </center>
                            </td>
                        </tbody>
                    </table>
                </div>
            </b-tab>
            <b-tab @click="getRequest()" title="Member Request" >
                <MemberRequest :members="req_members"/>
            </b-tab>
            </b-tabs>
          </b-card>
        </b-col><!--/.col-->
      </b-row><!--/.row-->
    </div>
  </div>
</template>

<script>
import MemberRequest from './MemberRequest.vue';
import {getCache,storedCache} from '@/cache'
import constant from './../../../store/constant'
import axios from 'axios'
const REGEX_FIRST_PARAGRAPH = /<p>.*.<\/p>\n</g
export default {
    components: {
        MemberRequest,
    },
  data () {
    return {
        req_members : [],
        members : [],
        isModalVisible: false,
        attachments: [],
        previewImage: [],
        isLoading: false
    }
  },
  created(){
      this.getData()
  },
  beforeMount()
  {

  },
  watch: {
    '$route' : 'getData'
  },
  methods:{
      getRequest()
      {
            const community_id = localStorage.getItem('user_id');
            const token = localStorage.getItem(`user_token`);
            let data = {
                'id' : community_id
            }
            this.openSpinner()
            axios.post(constant._BASE_URL+"member/request",data,{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
                // console.log(response.data)
                this.req_members = response.data
                this.closeSpinner()
            })
      },
      getParagraf(text)
      {
        return text.substring(0, 200)
      },
      openSpinner()
        {
            this.isLoading = true
        },
        closeSpinner()
        {
            this.isLoading = false
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        getData()
        {
            const community_id = localStorage.getItem('user_id');
            const token = localStorage.getItem(`user_token`);
            let data = {
                'id' : community_id
            }
            this.openSpinner()
            axios.post(constant._BASE_URL+"member/all",data,{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
                // console.log(response.data)
                this.members = response.data
                this.closeSpinner()
            })
        },
        onFileHomeChange(e)
        {
          this.previewImage = []
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
              return;
          for (var i = files.length - 1; i >= 0; i--) {
              this.previewImage.push(URL.createObjectURL(files[i]))
              this.attachments.push(files[i]);
          }
          // Reset the form to avoid copying these files multiple times into this.attachments
          document.getElementById("previewImage").value = [];
        },
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
