<template>
    <div class="">
        <div class="py-4 ma-4 text-xl-h1 text-lg-h2 text-h4 text-sm-h3 blue--text font-weight-black">
            <span class="grey--text">L</span>iste des utilisateurs 
        </div>
        <v-card class="ma-4 py-4">
            <v-row>
            <v-col class='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3'>
                <v-btn @click='openDialog' color='cyan  white--text text-capitalize my-4 ml-4' >Nouveau +</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class='col-xl-4 col-lg-4 col-md-4 col-sm-5 col-8 pl-4'>
                <v-text-field
                    class="ma-4 outlined rounded-xl "
                    v-model="search"
                    outlined
                    dense
                    placeholder="Recherche d'un utilisateur"
                    append-icon="fas fa-search"
                    label="Search"
                    single-line
                    hide-details
                    @keyup="Recherche"
                ></v-text-field>
            </v-col>
        </v-row>
        </v-card>
        <v-row
                  align="center"
                  justify="space-around"
                  class="my-8 overflow-x-auto"
                >
                  <v-btn @click="active='all';getList()" :class="`col-2 rounded-t text-lg-subtitle-2 text-sm-caption ${active==='all'?'blue white--text':'grey lighten-4'}`">
                    Tous
                  </v-btn>
                  <v-btn @click="active='user';getList()" :class="`col-2  text-lg-subtitle-2 text-sm-caption ${active==='user'?'blue white--text':'grey lighten-4'}`" >
                     Actifs
                  </v-btn>
                 <v-btn @click="active='online';getList()" :class="`col-2  text-lg-subtitle-2 text-sm-caption ${active==='online'?'blue white--text':'grey lighten-4'}`" >
                    En ligne
                  </v-btn>
                   <v-btn @click="active='bloqued';getList()" :class="`col-2 text-lg-subtitle-2 text-sm-caption ${active==='bloqued'?'blue white--text':'grey lighten-4'}`" >
                    Bloqués
                  </v-btn>
                 
           </v-row>
            <v-layout row wrap class="ma-4" v-if="users.length>0">
                <v-flex  xs12 sm4  md4 lg3 v-for=" user in listUsers" :key="user.id_User">
                   <v-hover >
                       <template v-slot='{hover}'>
                            <v-card align='center' text :class='`xs6 offset-xs3 ma-3 elevation-${hover?24:4}`' >
                              
                                <v-responsive class="grey lighten-4" >
                                <v-img height='110' src='conteneuur.jpg'>
                                  <v-spacer></v-spacer>
                              <v-card-actions>
                                <v-icon  small color='red' 
                                  class="c-pointer float-xl-right mt-n2 ml-n2"
                                  @click='del=true;confirmer(user)'>
                                  fas fa-times-circle
                                </v-icon>
                              </v-card-actions></v-img >
                                <v-flex class="mt-n11 " >
                                    <v-avatar size="100"  class="grey lighten-2 elevation-1">
                                         <v-img :src="`${server}${user.profil_image}`" ></v-img>
                                    </v-avatar>
                                        
                                   <v-btn absolute v-if="$store.getters.isAdmin " icon class="ml-n6 mt-16 mb-n9">
                                        <v-file-input v-model="img"  @change="changeProfilImg" @click="utilisateur=user.id_user"  hide-input prepend-icon="fas fa-camera"></v-file-input>
                                    </v-btn>
                                    <v-progress-linear v-if="progress && utilisateur===user.id_user" :value="progress"></v-progress-linear>
                                    <div class="mt-1 mb-4">
                                        <span class="font-weight-bold grey--text darken-2 subheading mt-1 ">{{user.nom}} {{user.prenom}}</span><br>
                                       </div>
                                </v-flex>   
                            </v-responsive>
                            <v-card-text align='left'>
                                <div class="text-heading-6 pa-1 col-12 text-truncate ">
                                    <v-icon small class="ma-1">fas fa-university</v-icon>
                                    {{user.nom_div}}
                                </div>
                                <div class="text-heading-6 pa-1 col-12 text-truncate">
                                    <v-icon small class="ma-1">fas fa-user</v-icon> 
                                    {{user.role}}
                                </div>
                                <div class="text-heading-6 pa-1 col-12 text-truncate">
                                    <v-icon small class="ma-1">fas fa-envelope</v-icon>
                                    {{user.email}}
                                </div>
                                <div class="text-heading-6 cursor pa-1 col-12 text-truncate" @click="navigateTo({name:'userProfil',params:{idUser: user.id_user}})">
                                     <v-icon small class="ma-1">fas fa-ellipsis-h</v-icon>
                                     Plus d'information
                                 </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text color="grey" >
                                    <v-icon size='2x'>far fa-comment-dots</v-icon>
                                    <span class="px-2 ">Message</span>
                                </v-btn>
                               
                                <v-spacer></v-spacer>
                                <v-row class=" mx-4">
                                <v-spacer></v-spacer>
                                   <v-col cols="1" class="mr-2">
                                    <toolTip :text='`Modifier `' v-if="$store.getters.isAdmin">
                                        <v-icon slot='icon'  @click="displayData(user)" color='blue'  small class="mx-4 cursor" >fas fa-user-edit</v-icon>
                                    </toolTip>
                                    </v-col>
                                    <v-col  cols="1" class="mr-2">
                                    <toolTip :text='`${text = user.status_user? "Bloquer" : "Débloquer"}`' v-if="$store.getters.isAdmin">
                                      <v-icon small  slot='icon' :color="user.status_user? 'red' : 'green' " @click="confirmer(user)"  class="mx-2  pr-2 cursor" >{{setIcon(user)}}</v-icon>
                                     </toolTip>
                                   </v-col>
                                </v-row>
                            </v-card-actions>
                            </v-card>
                      </template>
                   </v-hover>
                    
                </v-flex>
                <v-snackbar
                    v-model="hasUpdated"
                    :timeout="3000"
                    :color="types"
                     top right> 
                    <v-alert :type='types'>
                         {{message}}
                    </v-alert>
                   <template v-slot:action="{ attrs }">
                    <v-btn
                        color="white"
                        text
                        v-bind="attrs"
                        @click="hasUpdated = false"
                      > x </v-btn>
                   </template>
              </v-snackbar>
            </v-layout>
            <div v-else  class="text-center mx-auto mt-16 text-h4 font-weight-black  pa-4" transition="fab-transition">
                <v-icon color='orange' x-large class="ma-auto">fas fa-exclamation-triangle</v-icon> Auccun utilisateur !<v-icon x-large  class="ma-2">fas fa-frown</v-icon>
              </div>
            <Pagination ref="page" :pageCount='pageCount' />          
            <Loader ref="loader" :timeOut="3000" text="Lecture de la liste des utilisateurs"/>
        <register ref="form"  />
         <deleteDialog  ref="modal" title="Bloquer l'utilisateur" @confirm='accepted' :message='bloquageMessage'  > 
        </deleteDialog>
    </div>
</template>

<script >
import moment from 'moment'
import toolTip from '@/components/toolTip'
import Pagination from '@/components/Pagination'
import deleteDialog from '@/components/Delete'
import register from '../Register'
import AuthentificationService from '@/services/AuthentificationServices'
import server from  '@/services/server.config'
 import  Loader  from "@/components/loader";

 export default {
     
    data () {
        return{        
            server:server.URL,
            page:1,
            utilisateur:'',
            message : '',
            hasUpdated: false,
            users:'',
            show:false,
            search:'',
            file:null,
            img:null,
            types:'success',
            bloquageMessage : '',
            del:false,
            perPage:"10",
            progress:0,
            url_image:null,
            active:'all',
            userCopy:''
        }
    },
  methods :{
      getList(){
          this.page=1
          console.log(this.userCopy)
         if (this.active==='all') {
              this.users = this.userCopy
         }else if(this.active==='bloqued'){
             this.users = this.userCopy.filter(d => d.status_user===false )
         }else if(this.active==='online'){
             this.users = this.userCopy.filter(d => d.status_connexion===true )
         } else{
             this.users = this.userCopy.filter(d => d.status_user===true )
         } 
      },
     navigateTo (route) {
         this.$router.push(route)
       
        },
    setIcon(user){
          return user.status_user ? 'fas fa-user-times': 'fas fa-user'
      },
      openDialog(){
          this.$refs.form.openDialog()
      },
    displayData(data){
        this.show = true
        this.$refs.form.dispalayData(data)
    },
    async changeProfilImg () {
         if(this.img!==""){ 
         let formData = new FormData()
         formData.append('file',this.img)
         formData.append('name','picture') 
         AuthentificationService.upload(formData,(event)=>{
                this.progress = Math.round((100 * event.loaded)/event.total)
            })
            .then(resp=>{
                if (resp.data.message) {
                   this.updateProfil('uploads/'+this.img.name)
                   
                 }
            }).catch(err=>{
                this.hasUpdated=true
                this.message =  err
                this.types= 'error'

            })
           }
    },
    async updateProfil(img){
         await AuthentificationService.updateAccount({
            account:{
                profil_image: img,
                updated_at : moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            where :{ id_user : this.utilisateur}
            }).then(response => {
                if (response.data) {
                this.hasUpdated=true
                this.types= 'success'
                this.message =  response.data.success
                this.progress = 0
                } })
                .catch(error =>{
                this.alert=true
                this.alertType= 'error'
                this.message =  error
                })
                this.getAllUsers() 
    },
    closeDialog(){
        this.$refs.modal.closeDialog()
        this.del = false
       this.utilisateur = ""
    },
    accepted(){
        if(this.del) {
           this.deleteUser()
           } 
           else this.setStatusUser()
    },
    async getAllUsers () {
        this.$refs.loader.loading()
       const response = await AuthentificationService.show()
       this.users = response.data.user
       this.userCopy = this.users
       this.getList()
       }, 
      Recherche (){
         if(this.search === ''){
           this.getAllUsers()
          }
        else{
          var doc = this.users.filter(d => 
                d.nom.includes(this.search.toLowerCase())||d.prenom.toLowerCase().includes(this.search.toLowerCase())
                ||d.email.toLowerCase().includes(this.search.toLowerCase())
                )
                this.users = doc 
        }
    },  
    async changePassword () {
       const response = await AuthentificationService.updateAccount({
          account:{
               password: 'avotra54',
               updated_at : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          },
          where :{ email : 'avoutrarandriah@gmail.com',}
          }) 
       this.message= response.data.success
       this.hasUpdated = true
       this.getAllUsers()

    },
    confirmer(user){
       this.$refs.modal.openDialog()

       this.bloquageMessage =this.del ? `Voulez vous supprimer ${user.nom } ${user.prenom} de la liste des utilisateurs ?` : user.status_user ? `Voulez vous bloquer  ${user.nom } ${user.prenom}  ?` : `Voulez vous débloquer  ${user.nom } ${user.prenom}  ?`
       this.utilisateur = user
      },
    async setStatusUser () {
        var status = this.utilisateur.status_user
        await AuthentificationService.updateAccount({
          account:{
               status_user: !status,
               updated_at : moment().format('YYYY-MM-DD HH:mm:ss'),
          },
          where :{ id_user : this.utilisateur.id_user}
          }).then(response => {
              if (response.data) {
              this.hasUpdated=true
              this.types= 'success'
              this.message = `Vous avez  ${status ? 'bloqué ': 'débloqué '} ${this.utilisateur.nom} ${this.utilisateur.prenom}`
              } })
              .catch(error =>{
               this.hasUpdated=true
              this.types= 'error'
              this.message =  error.response.data.error
               })
       this.getAllUsers()
       this.closeDialog()
    }, 
    async deleteUser () {
       await AuthentificationService.delete({data :{ id_user : this.utilisateur.id_user}})
        .then(response => {
              if (response.data) {
              this.hasUpdated=true
              this.types= 'success'
              this.message = `Vous avez  supprimé ${this.utilisateur.nom} ${this.utilisateur.prenom}`
              } })
              .catch(error =>{
               this.hasUpdated=true
              this.types= 'error'
              this.message =  error.response.data.error
               })
       this.getAllUsers()
       this.$refs.modal.closeDialog()
    },

  },
  mounted (){
    // this.getAllUsers()
    this.nbr =this.$refs.page.perPage
   
  },
  computed:{
       listUsers(){
        var items = this.perPage === 'All' ? this.users : this.users.slice((this.page - 1) * this.perPage, this.page * this.perPage)
         return items
     },
     pageCount (){
        return this.perPage === 'All' ? 1 : Math.ceil(this.users.length/this.perPage)
     }
  },
  components :{
     deleteDialog,
     toolTip,
     register,
     Pagination,
     Loader
  }

}
</script>
<style scoped>
.cursor {
    cursor: pointer
}
</style>


