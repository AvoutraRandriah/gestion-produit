<template>
<v-dialog max-width="800px" persistent v-model='open'>
  <v-layout >   
    <v-flex >
      <v-card>
        <v-layout >
              <v-flex>
                  <div class="white elevation-2 rounded-lg ">
                      <v-toolbar flat dense class="cyan " dark>
                          <v-toolbar-title>{{title}}</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-card-actions>
                              <v-icon  @click='closeModal' size='2x' color='white float-xl-right' class="c-pointer" >fas fa-times-circle</v-icon>
                          </v-card-actions>
                      </v-toolbar>
                      <div>
                          <div class="px-8  pt-2  mr-4">
                              <v-text-field align='left' :readonly='true' 
                                label="N° produit"  placeholder='Numéro produit'
                                v-model='numProduit' prepend-icon='fas fa-folder-open'
                                 :error-messages="numProduitErrors"
                                @input="$v.numProduit.$touch()"
                                @blur="$v.numProduit.$touch()"/>
                              <v-text-field align='right' label="Nom produit"
                                v-model='nomProduit' prepend-icon='fas fa-shopping-cart'
                                class="mb-2" 
                                 :error-messages="nomProduitErrors"
                                @input="$v.nomProduit.$touch()"
                                @blur="$v.nomProduit.$touch()"/>
                                <v-text-field align='left' 
                                class="mb-2"
                                :readonly='true' 
                                label="Prix"  placeholder='Prix du produit'
                                v-model='numProduit' prepend-icon='fas fa-money-bill'
                                :error-messages="prixProduitErrors"
                                @input="$v.prixProduit.$touch()"
                                @blur="$v.prixProduit.$touch()"/>
                          </div>
                          <div class="px-8  pb-8  ml-4"> 
                            <v-btn color='cyan' :loading='loading' outlined  class="mr-4  rounded-pill col-6 white--text " center @click="AddorUpdate" >
                                <v-icon small class="mr-1">fas fa-download</v-icon>
                                <span class="text-capitalize" align='center'>{{Textbtn}}</span>
                              </v-btn>
                              <v-btn outlined color='red' class="rounded-pill col-5 white--text "  @click="clearForm" >
                                <span class="text-capitalize"> Annuler</span>
                              </v-btn>
                            </div>  
                      </div>
                  </div>
               </v-flex>
        </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>

</template>
<script>
 import autoIncrement from '@/js/AutoIncrementation'
 import produitService from '../services/produitService'
 import { validationMixin } from 'vuelidate'
 import { required } from 'vuelidate/lib/validators'
   
export default {
   mixins: [validationMixin],
   validations: {
     numProduit : {required},
     nomProduit :{required},
     prix:{required},
 },
   computed:{
    numProduitErrors () {
        const errors = []
        if (!this.$v.numProduit.$dirty) return errors
        !this.$v.numProduit.required && errors.push("Le produit doit avoir un numéro")
        return errors
      },
      nomProduitErrors () {
        const errors = []
        if (!this.$v.nomProduit.$dirty) return errors
        !this.$v.nomProduit.required && errors.push("Le produit doit avoir un nom")
        return errors
      },
      prixProduitErrors () {
        const errors = []
        if (!this.$v.prix.$dirty) return errors
        !this.$v.prix.required && errors.push("Le prix ne doit pas être vide")
        return errors
      }
    },
    name: 'produit',
    data () {
      return {
         alertType :'success',
        message:'',
        loading:false,
         title :'Enregistrer un produit',
         Textbtn:'Enregistrer',
         search : '',
         numProduit : '',
         nomProduit : '',
         prix : '',
         open: false
      }
    },
    methods :{
      openModal(){
        this.open = true
      },
      closeModal(){
        this.clearForm ()
        this.open= false
      },
     async getMax(){
       if(this.Textbtn=='Enregistrer'){
       const response = await produitService.getMax()
       this.numProduit = response.data[0].max=== null ? 'M0001' :autoIncrement.setValue(response.data[0].max)
      }},
      async register () {
        await produitService.register({
            id_produit: this.numProduit,
            nom_produit: this.nomProduit,
            }).then(response => {
              if (response.data.success) {
                  this.$parent.alert()
                  this.alertType= 'success'
                  this.message =  response.data.success
              this.$parent.alertType= 'success'
              this.$parent.message =  response.data.success
              } })
              .catch(error =>{
               this.alert()
             this.alertType= 'error'
             this.message =  error.response.data.error
               })
           this.$parent.getDataFromApi()
          // this.getMax()
          
      },
       displayData(data){
         this.open = true
         this.Textbtn= 'Modifier'
         this.title = `Modification du produit n° ${data.id_produit}`   
         this.numProduit = data.id_produit   
         this.nomProduit = data.nom_produit 
         },
     async update ( ){
       await produitService.update({
           data: {
              nom_produit: this.nomProduit,
              
           },
            where: {
               id_produit: this.numProduit
            }
          }).then(response => {
              if (response.data.success) {
              this.$parent.alert()
              this.$parent.alertType= 'success'
              this.$parent.message =  response.data.success
              }else{
                this.$parent.alert()
                this.$parent.alertType= 'success'
                this.$parent.message =  response.data.success
              } 
              })
              .catch(error =>{
               this.$parent.alert()
             this.$parent.alertType= 'error'
             this.$parent.message =  error.response.data.error
               })
           this.$parent.getDataFromApi()
          // this.getMax()
           
     },
     AddorUpdate (){
      this.$v.$touch()
      if(!this.$v.$invalid){
       this.loading =true
       if(this.Textbtn=='Enregistrer'){
         this.register()
          }
          else{
            this.update()
            
              }
          setTimeout(() => {
            this.loading =false
            this.clearForm()
         }, 2500);
        }
     },
      clearForm () {
        this.title ='Enregistrer un produit',
         this.Textbtn='Enregistrer',
        //  this.getMax()
         this.nomProduit = '',
         this.$v.$reset()
      },
      navigateTo (route) {
            this.$router.push(route)
     }
    },
    async mounted (){
      //  setInterval(() => {
      //     this.getMax()
      //   }, 500);
      
    },
    components: {
        }
  }
</script>