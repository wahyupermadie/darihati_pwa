<template>
  <div class="wrapper">
      <b-row>
          <b-col md="3">
                wkwk
          </b-col>
          <b-co md="9">
                hehe
          </b-co>
      </b-row>
  </div>
</template>

<script>
import {getCache,storedCache} from '@/cache'
import constant from './../../../store/constant'
import axios from 'axios'
const REGEX_FIRST_PARAGRAPH = /<p>.*.<\/p>\n</g
const community_id = localStorage.getItem('user_id');
const token = localStorage.getItem(`user_token`);
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
            })
            this.attachments = []
            this.closeModal()
            this.getData()
        },
        getData()
        {
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
