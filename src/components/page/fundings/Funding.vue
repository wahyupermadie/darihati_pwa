<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card header="<i class='fa fa-star'></i> Adik Asuh Dashboard">
            <button type="button" @click="showModal" class="btn btn-outline-primary">Tambah Adik</button>
            <br> </br>
            <div class="table-responsive">

            <table class="table table-striped table-bordered table-hover" >
                <thead>
                  <tr>
                      <th>No</th> 
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>Tanggal Lahir</th>
                      <th>Deskripsi</th>
                      <th>Foto</th>
                      <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-for="(student,index) in student" :key="index">
                      <td>{{index+1}}</td>
                      <td>{{student.name}}</td>
                      <td style="max-width: 150px;">{{student.alamat}}</td>
                      <td>{{student.dateofbirth}}</td>
                      <td>
                        <b-img fluid 
                          class="imageFile" 
                          center 
                          :src="'http://127.0.0.1:8000/adikasuh/'+student.foto"
                          alt="center image">
                        </b-img>
                      </td>
                      <td>
                          <button type="button" class="btn btn-xs btn-outline-warning"><span class="fa fa-pencil"></span></button>
                          <router-link :to="{ name:'DetailStudent', params:{student_id: student.id}}" >
                            <button type="button" class="btn btn-xs btn-outline-success"><span class="fa fa-search"></span></button>
                          </router-link>
                          <button type="button" class="btn btn-xs btn-outline-danger"><span class="fa fa-trash"></span></button>
                      </td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </b-card>
        </b-col><!--/.col-->
      </b-row><!--/.row-->
      <b-modal title="Buat Pendanaan" class="modal-primary" v-model="isModalVisible" @ok="addFunding">
        <b-form enctype="multipart/form-data">
            <b-form-group
                label="Nama Pendanaan"
                label-for="nama">
            <b-form-input v-model="fundings.nama" required id="nama" type="text" placeholder="Nama Pendanaan" autocomplete="Nama"></b-form-input>
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
                            v-model="fundings.start_date"
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
                            v-model="fundings.end_date"
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
                <textarea v-model="fundings.deskripsi" required class="form-control" placeholder="Deskripsi Pendanaan" rows="5" id="deskripsi"></textarea>
            </b-form-group>
            <b-form-group
                label="Jumlah Member"
                label-for="maxmember">
                <b-form-input 
                    v-model="fundings.max_member"
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
                    v-model="fundings.iuran_bulanan"
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
       isModalVisible: false,
       students : [],
       selected : null,
       fundings : {
           
       }
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
  methods:{
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      getStudent()
      {
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
        formData.append('start_date', this.fundings.start_date)
        formData.append('end_date', this.fundings.end_date)
        formData.append('max_member',this.fundings.max_member)
        formData.append('iuran_bulanan',this.fundings.iuran_bulanan)
        formData.append('deskripsi',this.fundings.deskripsi)
        formData.append('title',this.fundings.nama)
        axios.post(constant._BASE_URL+"funding",formData,{
            headers:{
                'Content-type': 'application/json',
                'Authorization' : 'Bearer '+token,
            }
        }).then(response =>{

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
