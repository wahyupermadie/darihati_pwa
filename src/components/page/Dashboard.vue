<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
          <b-card no-body class="bg-primary">
            <b-card-body class="pb-0">
              <b-row>
                <b-col>
                  <h4 class="mb-0">{{countMember}}</h4>
                  <p>Jumlah Anggota</p>
                </b-col>
                <b-col>
                  <i class="fa fa-user fa-5x"></i>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
            <b-card-body class="pb-0">
              <b-row>
                <b-col>
                  <h4 class="mb-0">{{countStundent}}</h4>
                  <p>Jumlah Adik Asuh</p>
                </b-col>
                <b-col>
                  <i class="fa fa-child fa-5x"></i>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-success">
            <b-card-body class="pb-0">
              <b-row>
                <b-col>
                  <h4 class="mb-0">{{countFunding}}</h4>
                  <p>Jumlah Pendanaan</p>
                </b-col>
                <b-col>
                  <i class="fa fa-handshake-o fa-5x"></i>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
      </b-col>
      <b-col sm="6" lg="3">
          <b-card no-body class="bg-danger">
            <b-card-body class="pb-0">
              <b-row>
                <b-col>
                  <h4 class="mb-0">{{countTransaction}}</h4>
                  <p>Jumlah Pembayaran</p>
                </b-col>
                <b-col>
                  <i class="fa fa-money fa-5x"></i>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12">
        <b-card header="Daftar Anggota Komunitas">
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
                    <th>No Telepon</th>
                </tr>
              </thead>
              <tbody v-if="members.length !== null && members.length > 0">
                <tr v-for="(value,index) in members" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{value.name}}</td>
                    <td>{{value.alamat}}</td>
                    <td>{{value.phone}}</td>
                </tr>
              </tbody>
              <tbody v-else>
                  <td colspan="4">
                    <center> Tidak Ada Data </center>
                  </td>
              </tbody>
            </table>
          </div>
        </b-card>
        <b-card header="Daftar Adik Asuh">
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
                    <th>Foto</th>
                </tr>
              </thead>
              <tbody v-if="students.length !== null && students.length > 0">
                <tr v-for="(value,index) in students" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{value.name}}</td>
                    <td>{{value.alamat}}</td>
                    <td>{{value.dateofbirth}}</td>
                    <td>{{value.deskripsi}}</td>
                    <td><b-img class="imageFile" 
                          center  thumbnail fluid :src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_fill,g_auto:face,h_120,w_120,fl_force_strip.progressive/f_webp/https://darihati.futnet.id/adikasuh/'+value.foto" alt="Thumbnail" /></td>
                </tr>
              </tbody>
              <tbody v-else>
                  <td colspan="6">
                    <center> Tidak Ada Data </center>
                  </td>
              </tbody>
            </table>
          </div>
        </b-card>
        <b-card header="Daftar Pendanaan">
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
                    <th>Judul Funding</th>
                    <th>Deskripsi</th>
                    <th>Nama Adik Asuh</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Akhir</th>
                </tr>
              </thead>
              <tbody v-if="fundings.length !== null && fundings.length > 0">
                <tr v-for="(value,index) in fundings" :key="index" >
                    <td>{{index+1}}</td>
                    <td>{{value.title}}</td>
                    <td>{{value.deskripsi}}</td>
                    <td>{{value.student_name}}</td>
                    <td>{{value.start_date}}</td>
                    <td>{{value.end_date}}</td>
                </tr>
              </tbody>
              <tbody v-else>
                  <td colspan="6">
                    <center> Tidak Ada Data </center>
                  </td>
              </tbody>
            </table>
          </div>
        </b-card>
        <b-card header="Daftar Pembayaran">
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
                    <th>Nama Funding</th>
                    <th>Nama User</th>
                    <th>Tanggal Transfer</th>
                    <th>Status</th>
                </tr>
              </thead>
              <tbody v-if="payments.length !== null && payments.length > 0">
                <tr v-for="(value,index) in payments" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{value.title_fundings}}</td>
                    <td>{{value.name}}</td>
                    <td>{{value.tanggal_transfer}}</td>
                    <td><b-badge pill variant="danger">Belum Lunas</b-badge> </td>
                </tr>
              </tbody>
              <tbody v-else>
                  <td colspan="5">
                    <center> Tidak Ada Data </center>
                  </td>
              </tbody>
            </table>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import constant from '../../store/constant';
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';
export default {
  name: 'dashboard',
  data: function () {
    return {
        isLoading: true,
        countStundent: '',
        countFunding: '',
        countMember:'',
        countTransaction: '',
        students : [],
        fundings : [],
        payments : [],
        members : []
    }
  },
  created: function(){
        this.getDashboard()
  },
  mounted() {
    console.log('mounted')
    this.getDashboard()
  },
  methods:{
    getDashboard()
    {
      const community_id = localStorage.getItem('user_id');
      const token = localStorage.getItem(`user_token`);
      let data = {
        'id' : community_id
      }
      this.openSpinner
      axios.post(constant._BASE_URL+"dashboard",data,{
        headers:{
                'Content-type': 'application/json',
                'Authorization' : 'Bearer '+token,
            }
      }).then(response => {
        this.countStundent = response.data.student
        this.countFunding = response.data.funding
        this.countMember = response.data.member
        this.countTransaction = response.data.payment
        this.students = response.data.students
        this.fundings = response.data.fundings
        this.members = response.data.members
        this.payments = response.data.payments
        this.closeSpinner()
      })
    },
    openSpinner()
    {
      this.isLoading = true
    },
    closeSpinner()
    {
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
  .imageFile {
    height: 150px;
  }
</style>
