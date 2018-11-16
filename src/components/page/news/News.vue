<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card header="<i class='fa fa-star'></i> Berita Dashboard">
            <button type="button" @click="showModal" class="btn btn-outline-primary">Tambah Berita</button>
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
                      <th>Judul</th>
                      <th>Konten</th>
                      <th>Gambar</th>
                  </tr>
                </thead>
                <tbody v-if="newsList.length !== null && newsList.length > 0">
                    <tr v-for="(value,index) in newsList" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{value.title}}</td>
                        <td>{{getParagraf(value.content)}}</td>
                        <td>
                            <b-row>
                                <b-col sm="3" style="margin-bottom:2px" v-for="(img,key) in value.news_detail" :key="key">
                                <b-img thumbnail fluid :src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/https://darihati.futnet.id/berita/'+img.foto" alt="Thumbnail" />
                                </b-col>
                            </b-row>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <td colspan="5">
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

      <b-modal title="Tambah Adik Asuh" class="modal-primary" v-model="isModalVisible" @ok="addNews">
        <b-form enctype="multipart/form-data">
          <b-form-group
            label="Judul Berita"
            label-for="title">
            <b-form-input v-model="news.title" required id="title" type="text" placeholder="Judul Berita" autocomplete="title"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Konten Berita"
            label-for="konten">
            <textarea v-model="news.content" required class="form-control" placeholder="Konten Berita" rows="5" id="content"></textarea>
          </b-form-group>
          <b-form-group
            label="Foto Berita"
            label-for="foto">
            <b-form-file multiple v-model="attachments.foto" id="previewImage" name="previewImage" placeholder="Foto Berita" @change="onFileHomeChange"></b-form-file>
          </b-form-group>
          <b-form-group>
              <b-img thumbnail style="margin:5px" v-for="(preview, index) in previewImage" :key="index" class="imageNews" :src="preview" alt="center image" />
          </b-form-group>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {getCache,storedCache} from '@/cache'
import constant from './../../../store/constant'
import axios from 'axios'
const REGEX_FIRST_PARAGRAPH = /<p>.*.<\/p>\n</g

export default {
  data () {
    return {
        news : {},
        newsList : [],
        isModalVisible: false,
        attachments: [],
        previewImage: [],
        isLoading: false
    }
  },
  created(){
      this.getData()
  },
  watch: {
    '$route' : 'getData'
  },
  beforeMount()
  {

  },
  methods:{
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
        addNews(e)
        {
            e.preventDefault()
            const community_id = localStorage.getItem('user_id');
            const token = localStorage.getItem(`user_token`);
            this.previewImage = []
            let formData = new FormData()
            if (this.attachments.length > 0) {
                for (var i = 0; i < this.attachments.length; i++) {
                    let attachment = this.attachments[i];
                    formData.append('foto[]', attachment);
                    
                }
            }
            
            formData.append('id', community_id)
            formData.append('title', this.news.title)
            formData.append('content', this.news.content)
            this.openSpinner()
            axios.post(constant._BASE_URL+"news",formData,{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
                this.closeSpinner()
                this.getData()
            })
            this.attachments = []
            this.closeModal()
        },
        getData()
        {
            const token = localStorage.getItem(`user_token`);
            const community_id = localStorage.getItem('user_id');
            let data = {
                'id' : community_id
            }
            this.openSpinner()
            axios.post(constant._BASE_URL+"news/all",data,{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
                // console.log(response.data)
                this.newsList = response.data
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
