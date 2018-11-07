<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card header="<i class='fa fa-star'></i> Adik Asuh Dashboard">
            <button type="button" @click="showModal" class="btn btn-outline-primary">Tambah Adik</button>
            <br></br>
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
                  <tr v-for="(student,index) in student" :key="index">
                      <td>{{index+1}}</td>
                      <td>{{student.name}}</td>
                      <td>{{student.alamat}}</td>
                      <td>{{student.dateofbirth}}</td>
                      <td>{{student.deskripsi}}</td>
                      <td>Deskripsi</td>
                      <td>
                          <button type="button" class="btn btn-xs btn-outline-warning"><span class="fa fa-pencil"></span></button>
                          <button type="button" class="btn btn-xs btn-outline-success"><span class="fa fa-search"></span></button>
                          <button type="button" class="btn btn-xs btn-outline-danger"><span class="fa fa-trash"></span></button>
                          <button type="button" @click="showModaladdHome(student.id,student.name)" class="btn btn-xs btn-outline-primary"><span class="fa fa-plus"></span></button>
                      </td>
                  </tr>
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
            <b-img class="imageFile" center :src="urlFoto" alt="center image" />
          </b-form-group>
        </b-form>
      </b-modal>

      <b-modal title="Tambah Foto Rumah" class="modal-primary" v-model="isModalRumahVisible" @ok="addFotoRumah">
        <b-form enctype="multipart/form-data">
          <b-form-group
            label="Nama"
            label-for="nama">
            <b-form-input :disabled="true" required id="nama" type="text" :value="isName" placeholder="Nama Adik Asuh" autocomplete="Nama"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Foto Rumah"
            label-for="foto">
            <b-form-file multiple v-model="dataStudent.foto" id="previewImage" name="previewImage" placeholder="Foto Adik Asuh" @change="onFileHomeChange"></b-form-file>
          </b-form-group>
          <b-form-group>
              <b-img v-for="(preview, index) in previewImage" :key="index" class="imageHome" :src="preview" alt="center image" />
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
        dataStudent:{
          "nama":"",
          "alamat":"",
          "tanggallahir":"",
          "file": "",
          "deskripsi": "",
          "community_id":community_id
        },
        urlFoto: "https://picsum.photos/125/125/?image=58",
        isModalVisible: false,
        isModalRumahVisible: false,
        isId : "",
        isName : "",
        attachments: [],
        previewImage:[]
    }
  },
  created(){
      this.$store.dispatch('getStudent')
  },
  beforeMount()
  {
    this.getData()
  },
  methods:{
      getData()
      {
        this.$store.dispatch('getLocal')
        this.student = this.$store.getters.students
      },

      addFotoRumah()
      {

      },
      showModaladdHome(id,name)
      {
        this.idId = id
        this.isName = name
        this.isModalRumahVisible = true;
      },
      closeModaladdHome()
      {
        this.isModalRumahVisible = false;
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      onFileChange(e)
      {
        const file = e.target.files[0]
        this.urlFoto = URL.createObjectURL(file)
      },
      onFileHomeChange(e)
      {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
              return;
          for (var i = files.length - 1; i >= 0; i--) {
              this.previewImage.push(URL.createObjectURL(files[i]))
          }
          // Reset the form to avoid copying these files multiple times into this.attachments
          document.getElementById("previewImage").value = [];
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
        this.student = this.$store.getters.students
        console.log(this.student)
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
