<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
          <b-card no-body class="bg-primary">
            <b-card-body class="pb-0">
              <b-row>
                <b-col>
                  <h4 class="mb-0">9.823</h4>
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
                  <h4 class="mb-0">9.823</h4>
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
                  <h4 class="mb-0">9.823</h4>
                  <p>Jumlah Funding</p>
                </b-col>
                <b-col>
                  <i class="fa fa-handshake-o fa-5x"></i>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
      </b-col>
      <b-col sm="6" lg="3">
          <b-card no-body class="bg-warning">
            <b-card-body class="pb-0">
              <b-row>
                <b-col>
                  <h4 class="mb-0">9.823</h4>
                  <p>Jumlah Sumbangan</p>
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
        <b-card header="Traffic &amp; Sales">
          <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover" >
                <thead>
                  <tr>
                      <th>NIM</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>No Telepon</th>
                      <th>Tanggal Lahir</th>
                      <th>Poin SKP</th>
                      <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                      <td>sadd</td>
                      <td>asd</td>
                      <td>asd</td>
                      <td>asd</td>
                      <td>sadsd</td>
                      <td>dasdasd</td>
                      <td></td>
                  </tr>
                </tbody>
              </table>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';
export default {
  name: 'dashboard',
  data: function () {
    return {
      items: items
    }
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
