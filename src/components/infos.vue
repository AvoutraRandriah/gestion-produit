<template>
  <v-menu bottom>
    <template v-slot:activator="{on,attrs}">
        <v-icon color='cyan' v-on="on"  v-bind="attrs" class='ma-2'  small  @click="showInfos">fas fa-info-circle</v-icon>
    </template>
    <v-card >
        <div>
            <v-toolbar-title color='grey lighten-4' class="py-2 px-4 grey lighten-2">
                <span class="font-weight-black text-h6">{{title}}</span>   
            </v-toolbar-title>
        </div>
        <v-card-text>
            <div class="text-subtitle-1">
                <span class="font-weight-black">Réference :</span>  {{ reference}} <br>
            </div>
            <div class="text-subtitle-1" v-if="infos.etat || infos.status">
                <span class="font-weight-black">Etat d'avancement :</span>  {{ infos.etat || infos.status}} <br>
            </div>
            <div >
                <span class="font-weight-black">Date d'ajout :</span> {{ setDateInfos(infos.created_at||infos.createdAt)}} à {{ setTime(infos.created_at||infos.createdAt)}}
            </div>
            <div>
                <span class="font-weight-black">Dernier mise à jour :</span> {{ setDateInfos(infos.updated_at||infos.updatedAt)}} à {{ setTime(infos.updated_at||infos.updatedAt)}}
            </div>
             <div v-if="infos.etat==='Términé' || infos.etat==='En cours'">
                <span class="font-weight-black" >Commencé le :</span> {{ setDateInfos(infos.started_at)}} à {{ setTime(infos.started_at)}}
            </div>
             <div v-if="infos.etat==='Términé'|| infos.status==='Términé'">
                <span class="font-weight-black">Términé le :</span> {{ setDateInfos(infos.finished_at)}} à {{ setTime(infos.finished_at)}}
            </div>
            <div>
              
            <div v-if='stat' class="mt-2 ">
              <v-divider></v-divider>
              <div v-if="stat.ref_pvs">
                   <div class="pa-2 red lighten-4" v-if="nbrDec===0">
                        Auccune déclaration liée avec ce pvs  
                    </div>
                    <div class="font-weight-black my-4" v-else >
                        <div >
                            <span class="font-weight-black">Total Dtc :</span> {{Dtc}} Ariary
                        </div>
                        <div >
                            <span class="font-weight-black">Déclaration frauduleux : </span> {{nbrDec}}
                        </div> 
                    </div >
              </div>
              <div v-else>
                <div class="pa-2 red lighten-4" v-if="Declaration.fraude + Declaration.RAS + Declaration.enAttente===0">
                    Auccune déclaration liée avec ce document  
                </div>
                <div class="font-weight-black my-4" v-else >
                <div >
                    <span class="font-weight-black">Total Dtc :</span> {{Dtc}} Ariary
                    </div>
                    <div >
                    <span class="font-weight-black">Déclaration frauduleux : </span> {{Declaration.fraude}}
                    </div> 
                    <div >
                    <span class="font-weight-black">Déclaration en RAS :</span> {{Declaration.RAS}}
                    </div>
                    <div >
                    <span class="font-weight-black">Déclaration en attente :</span> {{Declaration.enAttente}}
                    </div>
                </div>
              </div>
              </div>
            </div>
            
        </v-card-text>

    </v-card>
  </v-menu>
</template>

<script>
 import documentService  from '../services/documentService'
 import PvsService  from '../services/PvsService' 
 import js from '../js/AutoIncrementation' 
import moment from 'moment'
export default {
  props :[
           'title',
           'reference',
           'data',
           'show',
           'stat'
          
        ],
    data () {
      
      return { 
          infos : '',
          Declaration:'',
          Dtc:0,
          nbrDec:0
       }
      },
    methods :{
         setDateInfos(date){
             return moment(date).format('DD/MM/YYYY')
         },
          setTime(date){
              return moment(date).format('HH:mm:ss')
          },
          showInfos(){
          this.infos = this.data
          
          },
    async getStatDoc (data) {
         const response = await documentService.getBilan({num_doc :data})
         var Dtc = response.data.Dtc.totalDtcDoc
         this.Dtc = Dtc!== null ?js.toMoney(Dtc.toString()) :'0 '
         this.Declaration= {
             fraude:  response.data.fraude.nbrFraude,
             RAS: response.data.RAS.nbrRAS,
             enAttente:response.data.enAttente.nbrEnAttente
         }
         
    },
    async getStatPvs(data) {
         const response = await PvsService.getBilan({ref_pvs :data}) 
        this.Dtc = response.data.infos.dtc !== null ? js.toMoney(response.data.infos.dtc.toString()) : 0    
         this.nbrDec = response.data.infos.total

    },
    },
    mounted(){
        if(this.stat){
           if(this.stat.num_doc){
                this.getStatDoc(this.stat.num_doc)
            }
            else if(this.stat.ref_pvs){
                this.getStatPvs(this.stat.ref_pvs)
            }
        }
    }
}
</script>
