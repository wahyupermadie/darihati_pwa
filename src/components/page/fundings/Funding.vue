<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card header="<i class='fa fa-star'></i> Pendanaan Dashboard">
            <button type="button" @click="showModal" class="btn btn-outline-primary">Tambah Pendanaan</button>
            <br></br>
            <b-row v-if="isLoading" > 
                <b-col sm="12">
                    <center>
                        <v-pulse></v-pulse>
                    </center>
                </b-col>
            </b-row>
            <b-row v-else >
               <div class="container" v-if="fundings.length !== null && fundings.length > 0">
                   <b-row>
                    <b-col sm="3" v-for="(value, index) in fundings" :key="index">
                        <b-card no-body
                            style="max-width: 20rem;"
                            :img-src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/https://darihati.futnet.id/adikasuh/'+value.student_foto"
                            img-alt="Image"
                            img-top>
                            <h3 slot="header">{{value.title}}</h3>
                            <b-list-group flush>
                                <b-list-group-item v-if="value.is_full == true">
                                    <b-badge pill variant="success">Member Full</b-badge>
                                </b-list-group-item>
                                <b-list-group-item v-else>
                                    <b-badge pill variant="primary">Belum Full</b-badge>
                                </b-list-group-item>
                                <b-list-group-item>
                                    {{value.start_date}} 
                                    sampai 
                                    {{value.end_date}}
                                </b-list-group-item>
                                <b-list-group-item>
                                    {{value.jumlah_member}} / {{value.max_member}}
                                </b-list-group-item>
                            </b-list-group>
                            <b-card-body>
                                <p class="card-text">
                                    {{value.deskripsi}}
                                </p>
                            </b-card-body>
                        </b-card>
                    </b-col>
                   </b-row>
               </div>
               <div v-else>
                   <b-col cols="12">
                        <center>
                            Tidak Ada Data
                        </center>
                   </b-col>
               </div>
            </b-row>
          </b-card>
        </b-col><!--/.col-->
      </b-row><!--/.row-->
      <b-modal title="Buat Pendanaan" class="modal-primary" v-model="isModalVisible" @ok="addFunding">
        <b-form enctype="multipart/form-data">
            <b-form-group
                label="Nama Pendanaan"
                label-for="nama">
            <b-form-input v-model="funding.nama" required id="nama" type="text" placeholder="Nama Pendanaan" autocomplete="Nama"></b-form-input>
            </b-form-group>
            <b-form-group
                label="Pilih Adik Asuh"
                label-for="adikasuh">
                <v-select v-model="selected" :options="students"></v-select>
            </b-form-group>
            <b-row>
                <b-col sm="6">
                        <b-form-group
                            label="Tanggal Mulai"
                            label-for="tanggalmulai">
                            <b-form-input 
                            v-model="funding.start_date"
                            id="tanggallahir" 
                            type="date" 
                            placeholder="Tanggal Mulai" 
                            required 
                            autocomplete="tanggallahir">
                            </b-form-input>
                        </b-form-group>
                </b-col>
                <b-col sm="6">
                    <b-form-group
                        label="Tanggal Akhir"
                        label-for="tanggalakhir">
                        <b-form-input 
                            v-model="funding.end_date"
                            id="tanggalakhir" 
                            type="date" 
                            placeholder="Tanggal Mulai" 
                            required 
                            autocomplete="tanggalakhir">
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-group
                label="Deskripsi"
                label-for="deskripsi">
                <textarea v-model="funding.deskripsi" required class="form-control" placeholder="Deskripsi Pendanaan" rows="5" id="deskripsi"></textarea>
            </b-form-group>
            <b-form-group
                label="Jumlah Member"
                label-for="maxmember">
                <b-form-input 
                    v-model="funding.max_member"
                    id="maxmember" 
                    type="text" 
                    placeholder="Jumlah Member Maksimal" 
                    required 
                    autocomplete="maxmember">
                </b-form-input>
            </b-form-group>
            <b-form-group
                label="Jumlah Pendanaan"
                label-for="pendanaan">
                <b-form-input 
                    v-model="funding.iuran_bulanan"
                    id="pendanaan" 
                    type="number" 
                    placeholder="Jumlah Pendaaan Per Bulan" 
                    required 
                    autocomplete="pendanaan">
                </b-form-input>
            </b-form-group>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {getCache,storedCache} from '@/cache'
const token = localStorage.getItem(`user_token`);
import constant from '../../../store/constant';
const community_id = localStorage.getItem('user_id');
export default {
  data () {
    return {
        isLoading: true,
        isModalVisible: false,
        students : [],
        selected : null,
        funding : {},
        fundings:[]
    }
  },
  created(){
     this.$store.dispatch('getStudent')
     this.getStudent()
     this.getFunding()
  },
  beforeMount()
  {
    
  },
  watch: {
    '$route' : 'getFunding'
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
      getFunding()
      {
        let data = {
            "id":localStorage.getItem('user_id')
        }
        this.openSpinner()
        // this.fundings = getCache(`funding`+community_id)
        axios.post(constant._BASE_URL+"funding/all",data,{
            headers:{
                'Content-type': 'application/json',
                'Authorization' : 'Bearer '+token,
            }
        }).then(response =>{
            storedCache(`funding`+community_id, response.data)
            this.fundings = getCache(`funding`+community_id)
            this.closeSpinner()
        }).catch(error => {
            console.log(error)
            this.closeSpinner()
        });
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      getStudent()
      {
            this.$store.dispatch('getStudent')
            this.$store.dispatch('getLocal')
            var student = this.$store.getters.students
            for(let i=0;i<student.length;i++)
            {
                let data = {
                    'label' : student[i]['name'],
                    'value' : student[i]['id']
                }
                this.students.push(data)
            }
      },
      addFunding(e)
      {
        e.preventDefault()
        let formData = new FormData()
        formData.append('student_id', this.selected['value'])
        formData.append('community_id', community_id)
        formData.append('start_date', this.funding.start_date)
        formData.append('end_date', this.funding.end_date)
        formData.append('max_member',this.funding.max_member)
        formData.append('iuran_bulanan',this.funding.iuran_bulanan)
        formData.append('deskripsi',this.funding.deskripsi)
        formData.append('title',this.funding.nama)
        axios.post(constant._BASE_URL+"funding",formData,{
            headers:{
                'Content-type': 'application/json',
                'Authorization' : 'Bearer '+token,
            }
        }).then(response =>{
            this.getFunding()
        })
        this.closeModal()
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
