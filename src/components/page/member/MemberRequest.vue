<template>
<div class="table-responsive">
    <table class="table table-striped table-bordered table-hover" >
        <thead>
            <tr>
                <th>No</th> 
                <th>Nama</th>
                <th>Alamat</th>
                <th>Telepon</th>
                <th>Foto</th>
                <th>Action</th>
            </tr>
        </thead>
       
        <tbody v-if="member.length !== null && member.length > 0">
            <tr v-for="(value,index) in member" :key="index">
                <td>{{index+1}}</td>
                <td>{{value.name}}</td>
                <td>{{value.alamat}}</td>
                <td>{{value.phone}}</td>
                <td>
                    <b-img thumbnail fluid :src="'https://darihati.futnet.id/member/'+value.foto" alt="Thumbnail" />
                </td>
                <td>
                    <button type="button" @click="confirm(value.det_id)" class="btn btn-xs btn-outline-warning"><span class="fa fa-pencil"></span></button>
                    <button type="button" class="btn btn-xs btn-outline-danger"><span class="fa fa-trash"></span></button>
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
</template>
<script>
import constant from './../../../store/constant'
import axios from 'axios'
export default {
    name: 'MemberRequest',
    props: [
        'members',
    ],
    watch: { 
        members: function(newVal, oldVal) { // watch it
            this.member = []
            for(let i=0;i<newVal.length;i++)
            {
                this.member.push(newVal[i])
            }
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        }
    },
    data () {
        return {
            member : [],
        }
    },
    created(){

    },
    beforeMount()
    {

    },
    methods:{
        getRequest()
        {
            const community_id = localStorage.getItem('user_id');
            const token = localStorage.getItem(`user_token`);
            let data = {
                'id' : community_id
            }
            // this.openSpinner()
            axios.post(constant._BASE_URL+"member/request",data,{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
                // console.log(response.data)
                this.member = response.data
            })
        },
        alert(message,type)
        {
            this.$notify({
                group: 'notif',
                title: 'Important message',
                text: message,
                type: type
            });
        },
        confirm(det_id)
        {
            axios.put(constant._BASE_URL+"member/"+det_id,' ',{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
                this.alert(response.data['success'],'success')
                this.getRequest()
            })
        },
    }
}
</script>

