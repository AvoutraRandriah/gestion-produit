<template>
<v-img src='conteneuur.jpg' height="auto">
 <v-container class=" " >
   <v-card transition='fade-transition' class="mx-auto mt-16 mb-n16 elevation-24 rounded-lg" max-width='800px'>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top></v-progress-linear>
      <div class="ma-4 pt-4 rounded-l-xxlarge text-lg-h3 text-md-h3 text-sm-h3 text-xs-h1 font-weight-black text-center grey--text" >
         Changer<span class="blue--text"> le m<span class="fas fa-lock text-grey ma-1"></span>t  de passe</span> ? 
      </div>
      <v-layout >   
        <v-flex  xs12 sm6  md6 lg6 class="rounded-lg">
          <v-form v-model="valid">
           <div  class="pl-4 pr-2 py-4 mx-4">
                    <v-text-field
                      readonly
                      prepend-icon='fas fa-envelope'
                      label="Email"
                      placeholder='Votre email'
                      v-model='email'
                       required
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                     ></v-text-field>
                    <v-text-field label="Ancien mot de passe"  placeholder='Ancien mot de passe'
                      prepend-icon='fas fa-key'
                      :append-icon='`${see ? "fas fa-eye" :"fas fa-eye-slash"} `'
                     :type='`${see ? "text" :"password"}`'
                      v-model='password'
                       required
                    :error-messages="passWordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                      @mousedown:append="see=!see"
                      @mouseup="see=!see" />
                     <v-text-field label="Nouveau mot de passe"  placeholder='Nouveau mot de passe'
                       prepend-icon='fas fa-lock'
                      :append-icon='`${see ? "fas fa-eye" :"fas fa-eye-slash"} `'
                     :type='`${see ? "text" :"password"}`'
                      v-model='newpassword'
                       required
                    :error-messages="newpassWordErrors"
                    @input="$v.newpassword.$touch()"
                    @blur="$v.newpassword.$touch()"
                      @mousedown="see=!see"
                      @mouseup="see=!see" />
                  <v-text-field label="Mot de passe de confirmation" 
                     :append-icon='`${see ? "fas fa-eye" :"fas fa-eye-slash"} `'
                     prepend-icon='fas fa-lock'
                      :type='`${see ? "text" :"password"}`'
                    placeholder='Retapez le mot de passe'
                    v-model='verifPassword' 
                     required
                    :error-messages="verifPWErrors"
                    @input="$v.verifPassword.$touch()"
                    @blur="$v.verifPassword.$touch()"/>
                  <br>
                  <v-btn outlined color='blue' class=" col-11 mx-auto mb-4  rounded-pill white--text " :loading='loading' center @click="verifLogin" >
                      <span class="text-capitalize">Confirmer</span>
                  </v-btn>
                   <v-btn outlined color='red' class=" col-11 mx-auto mb-4  rounded-pill white--text "  center @click="clearForm;$router.push({name : 'myProfil',params : {idUser : $store.state.user.id_user}})" >
                      <span class="text-capitalize">Annuler</span>
                  </v-btn><br>
            </div>
          </v-form>
        </v-flex>
        <v-col  xs12 sm6  md6 lg6 class=" my-auto rounded-r-xxlarge hidden-xs-only">
          <div style="height:auto;" class="rounded-l-xxlarge">
              <v-img src='logo.png'></v-img>
          </div>
        </v-col>
      </v-layout>
      <alertMessage ref='alert' :types='alertType' :message='message'></alertMessage>
       
 </v-card>
 </v-container>
 </v-img>
</template>
<script>
import AuthentificationService from '@/services/AuthentificationServices'
import { validationMixin } from 'vuelidate'
import { required, maxLength,minLength, email,sameAs } from 'vuelidate/lib/validators'
import alertMessage from '../../components/alertMessage' 
import moment from 'moment'

export default { 
  name: 'login',
   mixins: [validationMixin],
    validations: {
     email: { required, email },
    password :{ required,maxLenght : maxLength(32),minLength : minLength(8)},
    newpassword :{ required,maxLenght : maxLength(32),minLength : minLength(8),sameAsPassword: sameAs('password')},
    verifPassword:{ required,sameAsPassword: sameAs('newpassword')},
    },
    computed:{
     
      verifPWErrors () {
        const errors = []
        if (!this.$v.verifPassword.$dirty) return errors
        !this.$v.verifPassword.required && errors.push("Le mot de passe de verification est obligatoire")
        !this.$v.verifPassword.sameAsPassword && errors.push("Le mot de passe de verification doit être égal avec le mot de passe")
        return errors
      },
       emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push("L'email doit être valide")
        !this.$v.email.required && errors.push("L'e-mail est obligatoire")
        return errors
      },
       passWordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
         !this.$v.password.minLength && errors.push('Mot de passe doit être superieur à 8 caractères')
      //  !this.$v.password.maxLength && errors.push('Mot de passe doit être inferieur à 32 caractères')
        !this.$v.password.required && errors.push('Le mot de passe est obligatoire')
        return errors
      },
       newpassWordErrors () {
        const errors = []
        if (!this.$v.newpassword.$dirty) return errors
         !this.$v.password.minLength && errors.push('Le nouveau mot de passe doit être superieur à 8 caractères')
      //  !this.$v.password.maxLength && errors.push('Mot de passe doit être inferieur à 32 caractères')
        //  this.$v.newpassword.sameAsPassword && errors.push("Le nouveau mot de passe ne doit être égal avec l'ancien mot de passe")
         !this.$v.newpassword.required && errors.push('Le nouveau mot de passe est obligatoire')
        return errors
      },
    },
  data ()
  {
      return {
          password : '',
          verifPassword:'',
          email :  this.$store.state.user.email,
          newpassword : '',
          error : '',
          loading: false,
          see:false,
          alertType : 'success',
          message:'',
          valid : false
          }
  },
  methods :{
    
    async verifLogin () {

    //  this.$v.$touch()
    //  if (!this.$v.$invalid){
      //  this.loading = true
      //   await AuthentificationService.login({
      //     where:{
      //       email : this.email,
      //       password : this.password
      //     }
      //   }).then(response=>{
      //         if(response.data.error){
      //            this.alert()
      //            this.alertType= 'error'
      //            this.message =  response.data.error  
      //         }else{
      //           this.$store.dispatch('setToken',response.data.token)
      //           this.$store.dispatch('setUser',response.data.user) 
                this.changePW() 
                
            //   }
            // }).catch(error =>{
            //   this.alert()
            //   this.alertType= 'error'
            //   this.message =  error.response.data.error
            //  })
            // setTimeout(() => {   
            //      this.loading = false
            //      this.alert() 
                  
            //   },3000)
          // }      
    },
    async changePW () {
        await AuthentificationService.updateAccount({account:{
                    password: this.newpassword,
                    updated_at : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                },
                where:{
                    email : this.email
                }
        }).then(response=>{
              if(response.data){
                  this.alert()
                  this.alertType= 'success'
                  this.message =  "Votre mot de passe a été modifié avec succè."
                  setTimeout(() => {   
                 this.loading = false
                 this.navigateTo({name : 'myProfil',params : {idUser : this.$store.state.user.id_user}})
                  
              },500) 
                     
                }
            }).catch(error =>{
              this.alert()
              this.alertType= 'error'
              this.message =  error.response.data.error
            })
             setTimeout(() => {   
             this.loading = false
              },3000)
             },
      navigateTo (route) {
         setTimeout(() => {   
          this.loading = false 
          this.clearForm()
           this.$router.push(route)
         },3000);
            
      },
      clearForm(){
        this.email = ''
        this.password = ''
        this.newpassword = ''
        this.verifPassword = ""
        this.loading = false
        
      },
      alert(){
        this.$refs.alert.openAlert()
      }
  }
  ,
  components: {
      alertMessage
      }
  }
</script>