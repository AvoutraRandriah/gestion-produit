<template>
    <v-layout >
        <v-col cols="4">
                <v-card >
                    <v-responsive align='center'>
                            <v-flex  >
                             <v-img src='conteneuur.jpg'
                                height='320px'
                                class=""
                                gradient='to top, rgba(0,0,0,.1), rgba(0,0,0,.5)'
                              >
                                <v-avatar class="mt-2"  size='200'>
                                      <v-img :src="`${server}${user.profil_image}`" ></v-img>
                                </v-avatar> 
                                <div class="white--text text-h5 font-weight-black mb-2">
                                     {{user.prenom}} {{user.nom}}
                                </div>
                               <div class="mb-4 text-h6 white--text">{{user.role_permission}} </div>
                              </v-img>
                               
                             </v-flex> 
                              
                       </v-responsive>
                       <v-card class="pb-10 px-4">
                             <div class="ma-4 py-4 text-center font-weight-black">
                               Pérformences
                           </div> 
                           <div class="pb-4">
                            <span>Document participé : <span class="text-h6">{{document}}</span></span>   <v-progress-linear color="orange" value="100"></v-progress-linear>
                           </div>
                           <div class="pb-4">
                                <span class="">Total déclarations : <span class="text-h6">{{totalDec}}</span></span><v-progress-linear color="blue accent-4" value="100"></v-progress-linear>
                            </div>
                           <div class="pb-4">
                                <span class="">RAS : <span class="text-h6">{{RienASignaler}}%</span></span><v-progress-linear color="green accent-4" :value="RienASignaler"></v-progress-linear>
                            </div>
                            <div class="pb-4">
                                <span class="">En attente : <span class="text-h6">{{Waiting}}%</span></span><v-progress-linear color="yellow accent-4" :value="Waiting"></v-progress-linear>
                            </div>
                            <div class="pb-4">
                                <span class="">Fraude : <span class="text-h6">{{Frauduleux}}%</span></span><v-progress-linear color="red accent-4" :value="Frauduleux"></v-progress-linear>
                            </div>
                            <div class="mb-2 pb-4">
                            <span> PVS : </span><span class="text-h6">{{pvs}}/{{Fraude}}</span> <v-progress-linear color="cyan" :value="havePvs"></v-progress-linear>
                           </div>
                       </v-card>
                </v-card>
            </v-col>
            <v-col class="mr-4">
             <v-card class="ml-4 mr-2 mb-4 elevation-2"   height='42%'>
              <v-toolbar flat dense class=" rounded-t" dark>
             <v-toolbar-title><v-icon small class="mx-4">fas fa-info-circle</v-icon>Informations personnel</v-toolbar-title>
             
           </v-toolbar>
           <v-card-text>
                <div class="text-subtitle-1"><v-icon small class="mx-4">IM</v-icon><span class="font-weight-black">{{user.num_matricule}}</span> </div>
                <div class="text-subtitle-1"> <v-icon small class="mx-4">fas fa-user</v-icon> {{user.nom}}  {{user.prenom}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-calendar</v-icon>{{setDate(user.dateNaiss)}} à {{user.lieuNaiss}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-map-marker</v-icon>{{user.adresse}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-sitemap</v-icon>{{user.nom_div}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-street-view</v-icon>{{user.role}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-envelope</v-icon>{{user.email}}</div>
                <div class="text-subtitle-1"><v-icon small class="mx-4">fas fa-tty</v-icon>0{{user.num_Tel}}</div>
                
            </v-card-text>
         </v-card>
         <v-card class="ml-4 my-4" :height="`${me? '28%' : '55%'}`">
             <div class="text-h5 font-weight-black mb-4 grey py-2"><v-icon small color="black" class="mx-4">fas fa-history</v-icon>Historiques</div>
             <div>
                <div class="text-subtitle-1 mb-2"><v-icon small c class="mx-4">fas fa-clock</v-icon>Dernier mise à jour déclarations : {{lastDec}}</div>
                <div class="text-subtitle-1 mb-2"><v-icon small c class="mx-4">fas fa-clock</v-icon>Dernier rapport sectoriel : {{lastRp}}</div>
                <!-- <div class="text-subtitle-1 mb-2"><v-icon small c class="mx-4">fas fa-clock</v-icon>Dernier connexion </div>
                <div class="text-subtitle-1 mb-2"><v-icon small c class="mx-4">fas fa-clock</v-icon><a class="black--text" >Historiques de connexion</a></div> -->
             
             </div>
         </v-card>
         <v-card class="ml-4 my-5" height="27%" v-if="me">
             <div class="text-h5 font-weight-black mb-4 grey py-2"><v-icon color="black"  small c class="mx-4">fas fa-wrench</v-icon>Paramètres</div>
             <div>
                <div class="text-subtitle-1 mb-2"><v-icon small c class="mx-4">fas fa-key</v-icon> <a @click="$router.push({name: 'ChangePW',params:{nav: true}})" class="blue--text">Changer le mot de passe</a> </div>
               
             </div>
         </v-card>
        </v-col>
           
    </v-layout> 
</template>
<script>
import moment from 'moment'
import AuthentificationService from '@/services/AuthentificationServices'
import server from  '../../services/server.config'

export default {
    data () {
        return {
          server:server.URL,
            userInfos : '',
            user:[],
            defaultImg :`logo.png` ,
            totalDec:0,
            RAS:0,
            Fraude:0, 
            Wait: 0,
            id:this.$store.state.user.id_user,
            document :0,
            pvs :0,
            lastDec : "Auccune déclaration enrgistrée",
            lastRp : "Auccun rapport sur les déclarations",
            me : false
        }
    },
    methods :{
        setDate(date){
       return moment(date).format('DD/MM/YYYY')
        },
        async profilUser(){ 
          this.user =[]
          if(this.$route.params.idUser ===  this.$store.state.user.id_user){
           this.user = this.$store.state.user
           this.me = true
         }
          else 
          {
            const user = await AuthentificationService.infos(this.$route.params.idUser)
           this.user = user.data.infos
           }

        const response = await AuthentificationService.profil(this.$route.params.idUser)
        //  console.log(response.data)
        this.Wait = Number(response.data.enAttente.nbrEnAttente )
        this.Fraude =  Number(response.data.fraude.nbrFraude)  
        this.RAS =   Number(response.data.Ras.nbrRAS)
        this.totalDec = this.Wait + this.Fraude + this.RAS
        this.document =Number(response.data.Doc.nbrDoc) 
        this.lastDec =response.data.story.maxDec === null ? "Auccune déclaration enregistrée" : moment(response.data.story.maxDec).locale('fr').format("LLLL")
        this.pvs = response.data.Pvs === null ? 0 : Number(response.data.Pvs.nbrPvs) 
        this.lastRp = response.data.story.rapportsectoriel.maxRp ===null ? "Auccun rapport sur les déclarations" : moment(response.data.story.maxRp).locale('fr').format("LLLL")
       
     }
    },
     watch : {
       options: {
        handler () {
        this.profilUser()
        this.user = this.$refs.comboUser.user
        },
        deep: true,
      },
     
     },
    mounted () { 
      this.profilUser()
     } ,
    computed:{
    idUser(){
        return this.$store.state.user.id_user 
        },
      rating (){
         var rt = this.Fraude <= 0 ? 0 : this.totalDec < 5 ? 1 : parseFloat((Number(this.Fraude) *5/Number(this.totalDec)).toFixed(2))
        return rt = isNaN(rt) ?0 : rt
      },
       Waiting(){
         var wait = Number(this.Wait * 100/this.totalDec)
         return wait = isNaN(parseFloat(wait.toFixed(2))) ? 0 : parseFloat(wait.toFixed(2))
       },
       RienASignaler(){
         var ras = Number(this.RAS * 100/this.totalDec)
         return ras = isNaN(parseFloat(ras.toFixed(2))) ? 0 : parseFloat(ras.toFixed(2))
       },
       Frauduleux(){
         var fraude = Number(this.Fraude * 100/this.totalDec)
        return fraude = isNaN(parseFloat(fraude.toFixed(2))) ? 0 : parseFloat(fraude.toFixed(2))
       },
       havePvs(){
         var pvs = Number(this.pvs * 100/this.Fraude)
        return pvs = isNaN(parseFloat(pvs.toFixed(2))) ? 0 : parseFloat(pvs.toFixed(2))
       }
    }
}
</script>

