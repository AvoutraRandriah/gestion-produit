import Api from '@/services/Api'

export default { 
    register (data) {
         return Api().post('register', data)
         },
    login (data) {
      return Api().post('login',data)
    },
    delete (data) {
        return Api().delete('user', data)
        },
    updateAccount (data) {
         return Api().put('user', data)
        },
    updateInfos (data) {
        return Api().put('userInfos', data)
        },
    show () {
        return Api().get('user')
        },
    profil (data) {
        return Api().get('user-profil/'+data)
        },
    infos (data) {
        return Api().get('user-infos/'+data)
        },  
    upload(file,onUploadProgress){
        return Api().post('/upload',file,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            onUploadProgress
        })
    },
    getFiles(){
        return Api().get('/files')
    } 
     }

