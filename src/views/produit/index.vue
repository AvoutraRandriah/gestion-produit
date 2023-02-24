<template>
    <div class="pt-6 pl-4 mx-4 my-5">
        <div class="text-h3 mb-2 blue--text font-weight-black">
           <span class="grey--text">P</span>roduits
        </div>  
        <div>
          <v-card class="my-4">
          <v-card-title>
              <div class="px-4 py-4">
                  <v-tooltip top>
                        <template  v-slot:activator="{ on, attrs }">
                            <v-btn fab color='cyan' size='55px' v-bind="attrs" v-on="on" @click='openModal '  >
                                <v-icon color='white'>fas fa-plus</v-icon>
                            </v-btn>
                        </template> 
                        <span>Ajouter une produit</span>  
                    </v-tooltip>       
              </div>
                <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    dense
                    outlined
                    append-icon="fas fa-search"
                    label="Search"
                    single-line
                    hide-details
                    class="col-6 col-lg-4 col-md-4 col-sm-5  rounded-pill"
                ></v-text-field>
          </v-card-title>
       </v-card>
          <div class=" py-4">
              <v-data-table 
                v-model="selected"
                :headers='header'
                show-select
                item-key='id_produit'
                :items="Produits"
                :loading='!loading'
                 :sort-by="['id_produit']"
                 :sort-desc="[false]"
                 show-group-by
                 multiple-group-by                
                :search="search"
                class="elevation-4 black--text mb-4" >
                <template v-slot:item="{ item }" >
                <div v-if="item.nom_produit"  >
                      <a @click="$router.push({name: 'declarations',params:{nom_produit : item.nom_produit}})">
                        {{item.nom_produit}}
                        </a> 
                </div> 
                <div v-if=" item.actionitem">
                  <v-icon color='blue' small @click='modifier(item)' >fas fa-edit</v-icon>
                  <v-icon color='red' class="mx-4" small @click='selectTodelete(item)' >fas fa-trash</v-icon>
                  
                  </div>
                </template>
            </v-data-table>
                <Formulaire  ref="form"  />
            </div>
            <div class="my-2 pa-2 white darken-4 elevation-4 " v-if="Produits.length >0">
                <!-- <v-btn text class="text-capitalize blue--text" @click='editAll()'>
                    <v-icon color='blue' class='ma-2'  >fas fa-edit</v-icon> 
                    Modifier                          
                </v-btn> -->
                <v-btn text class="text-capitalize red--text" @click='multiple=true;selectTodelete(selected)'>
                    <v-icon color='red lighten-2'  class='ma-2' >fas fa-trash</v-icon>
                    Supprimer
                </v-btn>
              </div> 
      </div>
      <deleteDialog  ref="deleteModal" @confirm='deleteMarchandise' title='Supprimer une marchandise' :message='deleteMessage'  ></deleteDialog>
      <alertMessage ref='alert' :types='alertType' :message='message'></alertMessage>
     
 </div>
</template>
<script >
  import  Formulaire from '../../components/FormulaireProduit'
  import deleteDialog from '../../components/Delete'
  import alertMessage from '../../components/alertMessage'
  import marchandiseService  from '../../services/produitService'

export default{
    data () {
        return{
          success:0,
          error:0,
          selected: [],
          multiple:false,
        delSelected :[],
          data:'',
          modif: false,
          alertType :'success',
         deleteMessage : '' ,
         message:'',
         open: false,
         search:'',
        loading: true,
        options: {},
        titre :`Formulaire `,
        Textbtn:`Enregistrer`,
        Produits :[],
        header :[
            {text:'N° produit',value:'id_produit',groupable:false},
            {text:'Nom produit',value:'nom_produit',groupable:false},
           {text:'Actions',value:'action',sortable:false,groupable:false}
                
        ],
                   
    }
 },
  watch: {
      options: {
        handler () {
        // this.getDataFromApi()
        },
        deep: true,
      },
    }
 ,mounted () {
  //  this.getDataFromApi()
  },
  methods: {
  alert(){
     this.$refs.alert.openAlert()
   },
    openModal(){
       this.$refs.form.openModal()
      //  this.$refs.form.getMax()
     },
    modifier(data){
     this.$refs.form.displayData(data)
     },
    async getDataFromApi () {
           const response = await marchandiseService.getAll()
          this.Produits = response.data
        },
    async deleteMarchandise(){
      if(this.selected.length > 1){
        this.selected.forEach(d => {
          const {id_march} = d
          marchandiseService.delete(id_march)
          .then(response => {
              if (response.data.success) {
                this.success+=1
              }else{
                  this.error+=1
                } })
          });
        setTimeout(() => {
          this.alertType= this.success > this.error ? 'success' : this.error > this.success && this.success > 0 ? 'warning' :'error'
           this.message = `${this.success === 0 ? '' :`${this.success} ${this.success>1 ? 'marchandises ont été supprimées ' : 'marchandise a été supprimée'} avec succèe`} ${this.error > 0 ? `${this.error>0&&this.success>0 ?' et ':''} la suppression des ${this.error} ${this.error>1 ? 'marchandises ont été echoués' : 'marchandise a été echouée'}` : ''} `
           this.alert()
           this.closeDeleteModal()
           this.getDataFromApi()
          }, 500);
       
     }else{
      await marchandiseService.delete(this.delSelected)
            .then(response => {
              if (response.data.success) {
              this.alert()
              this.alertType= 'success'
              this.message =  response.data.success
              }else{
                this.alert()
              this.alertType= 'error'
              this.message =  response.data.error
              
              } })
              .catch(error =>{
               this.alert()
              this.alertType= 'error'
              this.message =  error.response.data.error
               })
            this.closeDeleteModal()
            this.getDataFromApi()
            this.$refs.form.getMax()
       }   
    },
    closeDeleteModal(){
       this.$refs.deleteModal.closeDialog()
       this.delSelected = []
       this.multiple= false
       this.selected =  []
       this.error = 0
       this.success = 0
     },
    selectTodelete(data){
        if(this.selected.length <= 0 && this.multiple){
          this.alert()
          this.alertType= 'warning'
          this.message =  'Auccune marchandise sélectionnée !'
       }
       else{
       this.$refs.deleteModal.openDialog()
       this.deleteMessage = this.selected.length > 1 ? `Voulez vous supprimer les (${this.selected.length}) sociétées séléctionnées ?` : `Voulez vous supprimer la marchandise ${data.nom_produit} qui a une id ${data.id_produit}?`
       this.delSelected = data.id_produit
     } 
    },
     closeModal() {
          this.open = false
     }
     }
 , components:{
    Formulaire,
    deleteDialog,
    alertMessage
 }
}
</script>
