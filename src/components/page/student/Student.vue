<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card header="<i class='fa fa-star'></i> Adik Asuh Dashboard">
            <button type="button" @click="showModal" class="btn btn-outline-primary">Tambah Adik</button>
            <br></br>
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
                      <th>Alamat</th>
                      <th>Tanggal Lahir</th>
                      <th>Deskripsi</th>
                      <th>Aksi</th>
                  </tr>
                </thead>
                <tbody v-if="student.length !== null && student.length > 0">
                  <tr v-for="(student,index) in student" :key="index">
                      <td>{{index+1}}</td>
                      <td>{{student.name}}</td>
                      <td style="max-width: 150px;">{{student.alamat}}</td>
                      <td>{{student.dateofbirth}}</td>
                      <td>
                        <b-img fluid 
                          class="imageFile" 
                          center 
                          :src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/https://darihati.futnet.id/adikasuh/'+student.foto"
                          alt="center image">
                        </b-img>
                      </td>
                      <td>
                          <!-- <button type="button" class="btn btn-xs btn-outline-warning"><span class="fa fa-pencil"></span></button> -->
                          <router-link :to="{ name:'DetailStudent', params:{student_id: student.id}}" >
                            <button type="button" class="btn btn-xs btn-outline-success"><span class="fa fa-search"></span></button>
                          </router-link>
                          <!-- <button type="button" class="btn btn-xs btn-outline-danger"><span class="fa fa-trash"></span></button> -->
                      </td>
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
          </b-card>
        </b-col><!--/.col-->
      </b-row><!--/.row-->
      <b-modal title="Tambah Adik Asuh" class="modal-primary" v-model="isModalVisible" @ok="addAdikAsuh">
        <b-form enctype="multipart/form-data">
          <b-form-group
            label="Nama"
            label-for="nama">
            <b-form-input v-model="dataStudent.nama" required id="nama" type="text" placeholder="Nama Adik Asuh" autocomplete="Nama"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Tanggal Lahir"
            label-for="tanggallahir">
            <b-form-input 
              v-model="dataStudent.tanggallahir"
              id="tanggallahir" 
              type="date" 
              placeholder="Tanggal Lahir Adik Asuh" 
              required 
              autocomplete="tanggallahir">
            </b-form-input>
          </b-form-group>
          <b-form-group
            label="Alamat"
            label-for="alamat">
            <textarea v-model="dataStudent.alamat" required class="form-control" placeholder="Alamat Adik Asuh" rows="5" id="alamat"></textarea>
          </b-form-group>
          <b-form-group
            label="Deskripsi"
            label-for="deksripsi">
            <textarea v-model="dataStudent.deskripsi" required class="form-control" placeholder="Deskripsi Adik Asuh" rows="5" id="deskripsi"></textarea>
          </b-form-group>
          <b-form-group
            label="Foto"
            label-for="foto">
            <b-form-file v-model="dataStudent.foto" id="fotoadikasuh" name="fotoadikasuh" placeholder="Foto Adik Asuh" @change="onFileChange"></b-form-file>
          </b-form-group>
          <b-form-group>
            <b-img 
              class="imageFile" 
              center 
              :src="urlFoto" 
              alt="center image">
            </b-img>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {getCache,storedCache} from '@/cache'
const community_id = localStorage.getItem('user_id');
export default {
  data () {
    return {
        student : [],
        isLoading: true,
        dataStudent:{
          "nama":"",
          "alamat":"",
          "tanggallahir":"",
          "file": "",
          "foto": "",
          "deskripsi": "",
          "community_id":community_id
        },
        urlFoto: "https://picsum.photos/125/125/?image=58",
        isModalVisible: false,
    }
  },
  created(){
      this.$store.dispatch('getStudent')
  },
  watch: {
    '$route' : 'getData'
  },
  beforeMount()
  {
    this.getData()
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
      getData()
      {
        this.openSpinner()
        this.$store.dispatch('getStudent')
        this.$store.dispatch('getLocal')
        this.student = this.$store.getters.students
        this.closeSpinner()
        console.log(this.student)
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      onFileChange(e)
      {
        this.previewImage = []
        const file = e.target.files[0]
        this.urlFoto = URL.createObjectURL(file)
      },

      addAdikAsuh(e)
      {
        e.preventDefault()
        let formData = new FormData()
        var identity = document.getElementById('fotoadikasuh')
        formData.append('foto', identity.files[0])
        formData.append('nama', this.dataStudent.nama)
        formData.append('alamat', this.dataStudent.alamat)
        formData.append('tanggallahir', this.dataStudent.tanggallahir)
        formData.append('deskripsi',this.dataStudent.deskripsi)
        formData.append('community_id',this.dataStudent.community_id)
        
        this.$store.dispatch('addStudent',formData)
        this.$store.dispatch('getStudent')
        this.$store.dispatch('getLocal')
        this.student = this.$store.getters.students
        this.getData()
        console.log("hello student "+this.student)
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
