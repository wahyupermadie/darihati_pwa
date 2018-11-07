import constant from './constant'
import axios from 'axios'
import {getCache,storedCache} from '@/cache'

const token = localStorage.getItem(`user_token`);
const user_id = localStorage.getItem(`user_id`);

const StudentModule = {
    state: {
        students : [],
        student:{}
    },
    
    mutations: {
        cacheStudent(state, payload)
        {
            storedCache(`student`+user_id, payload)
        },
        setStudents(state, payload)
        {
            state.students = payload
        },
        setStudent(state, payload)
        {
            state.students.push(payload)
        }
    },
    actions: {
        getLocal({commit})
        {
            let student_data = getCache('student'+user_id)
            commit("setStudents",student_data)
        },
        getStudent ({commit})
        {
            var user_data = {
                "id":user_id
            }

            let student_data = getCache('student'+user_id)
            axios.post(constant._BASE_URL+"student/all",user_data,{ 
                headers: {
                'Content-type': 'application/json',
                'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
            
                var user = response.data
                commit('cacheStudent', user)
                commit('setStudents', user)

            }).catch(error => {
                console.log(error)
                commit('setStudents', student_data)
            });
        },

        addStudent({commit, dispatch}, payload)
        {
            console.log(payload)
            axios.post(constant._BASE_URL+"student",payload,{ 
                headers: {
                'Content-type': 'application/json',
                'Authorization' : 'Bearer '+token,
                }
            }).then(response => {
                dispatch('getStudent')
                let dataStudent = {
                    "id":response.data.data['id'],
                    "name":response.data.data['name'],
                    "alamat":response.data.data['alamat'],
                    "dateofbirth":response.data.data['dateofbirth'],
                    "file": response.data.data['foto'],
                    "deskripsi": response.data.data['deskripsi'],
                    "community_id":response.data.data['community_id']
                  }
                commit('setStudent', dataStudent)
            }).catch(error => {
                console.log(error)
            });
        }
    },
    getters:{
        students(state){
            return state.students
        },
        student(state){
            return state.student
        },
    }
}

export default StudentModule