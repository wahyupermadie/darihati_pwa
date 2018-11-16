<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
            <b-card header="<i class='fa fa-star'></i> Adik Asuh Dashboard">
            <b-img fluid 
              class="imageFile" 
              center 
              :src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/https://darihati.futnet.id/adikasuh/'+dataStudent.foto"
              alt="center image">
            </b-img>
            <b-row>
              <b-col sm="6">
                <b-form enctype="multipart/form-data">
                  <b-form-group
                    label="Nama"
                    label-for="nama">
                    <b-form-input :disabled="isDisable" v-model="dataStudent.name"  required id="nama" type="text" placeholder="Nama Adik Asuh" autocomplete="Nama"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Tanggal Lahir"
                    label-for="tanggallahir">
                    <b-form-input 
                      :disabled="isDisable"
                      v-model="dataStudent.dateofbirth"
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
                    <textarea 
                      :disabled="isDisable"
                      v-model="dataStudent.alamat" 
                      required 
                      class="form-control" 
                      placeholder="Alamat Adik Asuh" 
                      rows="5" 
                      id="alamat">
                    </textarea>
                  </b-form-group>
                  <b-form-group
                    label="Deskripsi"
                    label-for="deksripsi"> 
                    <textarea :disabled="isDisable" v-model="dataStudent.deskripsi" required class="form-control" placeholder="Deskripsi Adik Asuh" rows="5" id="deskripsi"></textarea>
                  </b-form-group>
                  <div slot="footer">
                    <b-button :disabled="isDisable" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> SUBMIT</b-button>
                    <b-button  @click="edit()" size="sm" variant="warning"><i class="fa fa-pencil"></i>EDIT</b-button>
                  </div>
                </b-form>
              </b-col>
              <b-col sm="6" style="padding-top:10px">
                <button @click="showModaladdHome()" type="button" style="margin-bottom:10px" class="btn btn-xs btn-outline-primary">Tambah Foto Rumah</button>
                  <b-row>
                    <b-col sm="4" style="margin-bottom:5px" v-for="(img,index) in fotos" :key="index">
                      <b-img thumbnail fluid :src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/https://darihati.futnet.id/rumah/'+img.foto_rumah" alt="Thumbnail" />
                    </b-col>
                  </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-modal title="Tambah Foto Rumah" class="modal-primary" v-model="isModalRumahVisible" @ok="addFotoRumah">
        <b-form enctype="multipart/form-data">
          <b-form-group
            label="Nama"
            label-for="nama">
            <b-form-input :disabled="true" v-model="dataStudent.name" required id="nama" type="text" placeholder="Nama Adik Asuh" autocomplete="Nama"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Foto Rumah"
            label-for="foto">
            <b-form-file multiple v-model="attachments.foto" id="previewImage" name="previewImage" placeholder="Foto Adik Asuh" @change="onFileHomeChange"></b-form-file>
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
import constant from './../../../store/constant'
import axios from 'axios'
import {getCache,storedCache} from '@/cache'

export default {
  data () {
    return {
        student : {},
        fotos :[],
        isDisable : true,
        dataStudent:{},
        urlFoto: "https://picsum.photos/125/125/?image=58",
        isModalVisible: false,
        isModalRumahVisible: false,
        attachments: [],
        previewImage:[]
    }
  },
  created(){

  },
  beforeMount()
  {
    this.getData()
  },
  methods:{
      edit()
      {
        this.isDisable = false
      },
      getData()
      {
        const token = localStorage.getItem(`user_token`);

          axios.get(constant._BASE_URL+"student/"+ this.$route.params.student_id,{
            headers:{
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer '+token,
                }
          }).then(response => {
            this.fotos = response.data.homes
            this.dataStudent = response.data.students
          })
      },

      addFotoRumah()
      {
        const token = localStorage.getItem(`user_token`);
        let formData = new FormData()
        if (this.attachments.length > 0) {
            for (var i = 0; i < this.attachments.length; i++) {
                let attachment = this.attachments[i];
                formData.append('foto[]', attachment);
                
            }
        }
        formData.append('id', this.$route.params.student_id)
        axios.post(constant._BASE_URL+"student/home", formData,{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
                this.getData()
            })
      },

      showModaladdHome()
      {
        this.previewImage = []
        this.isModalRumahVisible = true;
      },
      closeModaladdHome()
      {
        this.isModalRumahVisible = false;
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
  margin-bottom: 20px;
  height: 200px;
  border-radius: 15px;
}
.imageHome {
  width: 30%;
  display: inline-block;
  margin-left: 0dp;
  margin-right: 0dp;
}
/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
    .column {
        width: 100%;
    }
}
/* Create two equal columns that floats next to each other */
.column {
    float: left;
    width: 50%;
    padding: 10px;
    height: 300px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}
</style>
