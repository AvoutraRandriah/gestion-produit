<template>
<v-card class="blue"> 
<v-dialog v-model="show" persistent fullscreen class="overflow-hidden">
  <v-layout class="fill-height">   
    <v-flex class="white ">
      <v-toolbar flat dense class="cyan rounded-t-lg" dark>
             <v-toolbar-title>{{title}}</v-toolbar-title>
             <v-spacer></v-spacer>
              <v-card-actions>
                  <v-icon   color='white lighten-2 float-xl-right`'  @click="closeDialog" >fas fa-times-circle</v-icon>
              </v-card-actions>
           </v-toolbar>
          <v-row class="" >
              <div class="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 fill-height">
                <v-stepper v-model="etape">
                      <v-stepper-header>
                        <v-stepper-step
                          :complete="etape > 1"
                          step="1"
                        >
                          Infos personnelle
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                          v-if="etape >= 2"
                          :complete="etape > 2"
                          step="2"
                        >
                        Infos personnelle (suite)
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step  
                          v-if="etape >= 3"
                          :complete="etape > 3"
                            step="3">
                          Infos du compte
                        </v-stepper-step>
                      </v-stepper-header>

                      <v-stepper-items>
                        <v-stepper-content step="1">
                            <div class="px-4 py-2 fill-height" >
                              <v-form  ref="Infos">      
                                    <v-text-field label="Nom" placeholder='Votre nom'
                                      v-model='infos.name' 
                                      required
                                      :error-messages="nameErrors"
                                      @input="$v.infos.name.$touch()"
                                      @blur="$v.infos.name.$touch()" />
                                    <v-text-field label="Prénom" placeholder='Votre prénom'
                                      v-model='infos.firstName' 
                                      required
                                      :error-messages="firstNameErrors"
                                      @input="$v.infos.firstName.$touch()"
                                      @blur="$v.infos.firstName.$touch()" />
                                  
                                      <v-menu left :close-on-content-click="false" v-model="menu" height="500px">
                                        <template v-slot:activator="{ on }">
                                          <v-text-field readonly v-model="computedDateFormated" v-on='on'  align='center' 
                                          label="Date de naissance" 
                                          required
                                          :hint='hint'
                                          :error-messages="dateNaissErrors"
                                          @change="$v.infos.dateNaiss.$touch()"
                                          @blur="$v.infos.dateNaiss.$touch()"  /> 
                                                              
                                        </template>
                                      <div height="100%">
                                          <v-date-picker class="col-12" 
                                          locale="fr" 
                                          landscape row v-model="infos.dateNaiss" scrollable ></v-date-picker>
                                          <div align="right" class="white fill-width row pa-4 ">
                                            <v-btn row @click="gethint();menu=false;$v.infos.dateNaiss.$touch()">Ok</v-btn>  
                                        </div>
                                      </div>
                                    </v-menu>
                                    <v-text-field label="Lieu de naisance" placeholder='Lieu de naissance'
                                      v-model='infos.lieuNaiss' 
                                      required
                                      :error-messages="lieuErrors"
                                      @input="$v.infos.lieuNaiss.$touch()"
                                      @blur="$v.infos.lieuNaiss.$touch()" />
                                      <v-text-field label="Adresse" placeholder='Votre adresse actuel'
                                      v-model='infos.adresse' 
                                      required
                                      :error-messages="adresseErrors"
                                      @input="$v.infos.adresse.$touch()"
                                      @blur="$v.infos.adresse.$touch()" /><br>
                                      <v-btn class="cyan white--text mx-2 " align-right @click="$v.infos.$touch();next()">
                                          <span class="text-capitalize" >Suivant</span>
                                      </v-btn>
                                      <v-btn class="mx-2" align-right >
                                          <span class="text-capitalize" @click="$v.infos.$reset;">Annuler</span>
                                      </v-btn>
                                  </v-form>
                              </div>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <!-- Information suite-->
                          <div class="px-4 py-2 fill-height" >
                              <v-form  ref="infos">  
                                <v-text-field label="N° matricule" 
                                placeholder="N° matricule de l'utilsateur"
                                :error-messages="matriculeErrors"
                                  v-model='infos2.matricule' 
                                  required
                                  @input="$v.infos2.matricule.$touch()"
                                  @blur="$v.infos2.matricule.$touch()"
                                    />
                             <v-select
                                      v-model="infos2.role"
                                      :items="Roles"
                                      label="Rôle de l'utilisateur"
                                      required
                                      :error-messages="roleErrors"
                                      @input="$v.infos2.role.$touch()"
                                      @blur="$v.infos2.role.$touch()"  ></v-select>
                                    
                                      <v-text-field label="N° téléphone" placeholder='Votre numéro de téléphone'
                                      v-model='infos2.numTel'
                                      required
                                      :error-messages=" numTelErrors"
                                      @input="$v.infos2.numTel.$touch()"
                                      @blur="$v.infos2.numTel.$touch()" />
                                <v-btn class="mx-4 text-capitalize" align-left  @click="$v.infos.$touch();prev()">
                                    Précedant
                                </v-btn>
                                <v-btn class="mx-2" align-right >
                                  <span class="text-capitalize" @click="$v.infos2.$reset">Annuler</span>
                               </v-btn>
                                <v-btn class="cyan white--text mx-4 text-capitalize"  @click="$v.infos2.$touch();next()" align='right' >
                                    Suivant
                                </v-btn>
                              </v-form>  
                              </div>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <!-- Information sur le compte-->
                              <div class="px-4 py-2 fill-height " >
                                <v-form  ref="account"> 
                                  <div class="row ">
                                    <div class="col-3">
                                  <v-avatar size="130"  class="grey elevation-1 lighten-2 elevation-1">
                                         <v-img v-if="url_image" :src='url_image.src' >
                                          </v-img>
                                    </v-avatar>
                                    </div>
                                  <v-file-input
                                  class="col-6 mt-12"
                                   v-model="account.img"
                                  placeholder="Selectionnez le photo de l'utilisateur"
                                  label="Photo de profil"
                                  prepend-icon="fas fa-camera"
                                      required
                                      accept="image/*"
                                      :error-messages="imgErrors"
                                      @change="$v.account.img.$touch();selectProfilImg()"
                                      @blur="$v.account.img.$touch()"
                                      @click.close="url_image.src='admin.jpg'" />
                                  </div>
                                    <v-text-field label="Email"  placeholder="Email de l'utilisateur"
                                      type='email' v-model='account.email'
                                      required
                                      :error-messages="emailErrors"
                                      @input="$v.account.email.$touch()"
                                      @blur="$v.account.email.$touch()" />
                                    <v-select
                                      v-model="account.permission"
                                      :items="Permissions"
                                      label="Rôle permission"
                                      required
                                      :error-messages="rolePermErrors"
                                      @input="$v.account.permission.$touch()"
                                      @blur="$v.account.permission.$touch()"
                                    ></v-select>
                                    <v-text-field label="Mot de passe"  placeholder='Mot de passe'
                                        :disabled="disable"
                                        :append-icon='`${see ? "fas fa-eye" :"fas fa-eye-slash"} `'
                                        :type='`${see ? "text" :"password"}`'
                                        v-model='account.password'
                                        @mousedown="see=!see"
                                        @mouseup="see=!see" 
                                      required
                                      :error-messages="passWordErrors"
                                      @input="$v.account.password.$touch()"
                                      @blur="$v.account.password.$touch()" />
                                    <v-text-field label="Mot de passe de confirmation" 
                                      :disabled="disable"
                                      :type='`${see ? "text" :"password"}`'
                                      placeholder='Retapez le mot de passe'
                                      v-model='account.verifPassword'
                                      required
                                      :error-messages="verifPWErrors"
                                      @input="$v.account.verifPassword.$touch()"
                                      @blur="$v.account.verifPassword.$touch()" /><br>
                                <v-btn class=" mx-4 text-capitalize" align-left  @click="prev">
                                    Précedant
                                </v-btn>
                                <v-btn class="mx-2" align-right >
                                  <span class="text-capitalize" @click="clearForm" >Annuler</span>
                              </v-btn>
                                <v-btn class="cyan white--text text-capitalize mx-4" @click="register" align='right' >
                                    {{btnTitle}}
                                </v-btn>
                                </v-form>
                              </div>
                        </v-stepper-content >  
                        <v-stepper-content step='4'>
                            <v-card elevation='4' class="fill-height">
                                <v-card-title>Information complète</v-card-title>
                                <v-card-text>
                                    Felicitation, Le compte de {{infos.name.toUpperCase()}} {{userfirstName}} a éte crée avec succèe !     
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn  @click="closeDialog">OK</v-btn>
                                </v-card-actions> 
                            </v-card>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
              </div> 
              <div class="col-6 py-4 hidden-xs-only"  >
                <v-img src="logo.png" contain  max-height="500px"></v-img>
              </div>
          </v-row>
      </v-flex>
    </v-layout>
    </v-dialog>
   </v-card>
 </template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength,minLength, email,sameAs } from 'vuelidate/lib/validators'
 import AuthentificationService from '@/services/AuthentificationServices'
import moment from 'moment'
  import js from '../../js/AutoIncrementation'
  var retraite= moment().subtract(60, 'year').format('YYYY-MM-DD')
  var mineur = moment().subtract(18, 'year').format('YYYY-MM-DD')
 // const number = helpers.regex('serial,/^[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}') -->
  
export default {
    name: 'register',
     mixins: [validationMixin],
    validations: {
    infos:{
        name :{required},
        firstName :{required,minLength: minLength(2)},
        adresse:{required,minLength : minLength(8)},
        dateNaiss :{required},
        lieuNaiss:{required}
    },
    account:{
      email: { required, email },
      password :{ required,maxLenght : maxLength(32),minLength : minLength(8)},
      verifPassword:{ required,maxLenght : maxLength(32),minLength : minLength(8),sameAsPassword: sameAs('password')},
      permission :{required},
       img:{required},
     },
   infos2: {
      matricule:{required, },
      numTel:{required},
      role:{required},
    }
    
    },
    computed:{
      userfirstName(){
         var firstName = ""
         const prenom = this.infos.firstName.split(" ")
         prenom.forEach(value=>{ 
          firstName+= " " +js.toMaj(value)
          })
          return firstName
      },
      computedDateFormated () {
            return moment(this.infos.dateNaiss).format('DD-MM-YYYY')
        },
        nameErrors () {
        const errors = []
        if (!this.$v.infos.name.$dirty) return errors
        !this.$v.infos.name.required && errors.push("L'utilisateur doit avoir un nom")
        return errors
      },
      rolePermErrors () {
        const errors = []
        if (!this.$v.account.permission.$dirty) return errors
        !this.$v.account.permission.required && errors.push("L'utilisateur doit avoir un rôle d'accèe sur son compte")
        return errors
      },
      firstNameErrors () {
        const errors = []
        if (!this.$v.infos.firstName.$dirty) return errors
       !this.$v.infos.firstName.required && errors.push("L'utilisateur doit avoir un prenom")
        return errors
      },
        verifPWErrors () {
        const errors = []
        if (!this.$v.account.verifPassword.$dirty) return errors
        !this.$v.account.verifPassword.minLength && errors.push("Le mot de passe de verification doit être superieur à 8 caractères")
        !this.$v.account.verifPassword.required && errors.push("Le mot de passe de verification est obligatoire")
        !this.$v.account.verifPassword.sameAsPassword && errors.push("Le mot de passe de verification doit être égal avec le mot de passe")
        return errors
      },
       adresseErrors () {
        const errors = []
        if (!this.$v.infos.adresse.$dirty) return errors
        !this.$v.infos.adresse.minLength && errors.push("L'adresse doit être superieur à 5 caractères")
        !this.$v.infos.adresse.required && errors.push("L'adresse est obligatoire")
        return errors
      },
         dateNaissErrors () {
        const errors = []
        if(this.infos.dateNaiss > mineur) errors.push("L'utilisateur que vous avez entré ne doit pas être mineur ")
         if(this.infos.dateNaiss<= retraite) errors.push("L'utilisateur que vous avez entré ne doit être en retraite")
        if (!this.$v.infos.dateNaiss.$dirty) return errors
         !this.$v.infos.dateNaiss.required && errors.push("La date de naissance est obligatoire")
         return errors
      },
         lieuErrors () {
        const errors = []
        if (!this.$v.infos.lieuNaiss.$dirty) return errors
        !this.$v.infos.lieuNaiss.required && errors.push("Le lieu de naissance est obligatoire")
        return errors
      },
         matriculeErrors () {
        const errors = []
        if (!this.$v.infos2.matricule.$dirty) return errors
      !this.$v.infos2.matricule.required && errors.push("L'utilisateur doit avoir une IM")
        return errors
      },
         numTelErrors () {
        const errors = []
        if (!this.$v.infos2.numTel.$dirty) return errors
        !this.$v.infos2.numTel.required && errors.push("Le numéro de téléphone est obligatoire")
        return errors
      },
         roleErrors () {
        const errors = []
        if (!this.$v.infos2.role.$dirty) return errors
        !this.$v.infos2.role.required && errors.push("L'utilisateur doit avoir un rôle au sein de la DGD")
        return errors
      },
         imgErrors () {
        const errors = []
        if (!this.$v.account.img.$dirty) return errors
        !this.$v.account.img.required && errors.push("Le photo de profil de l'utilisateur est obligatoire")
        return errors
      },
       emailErrors () {
        const errors = []
        if (!this.$v.account.email.$dirty) return errors
        !this.$v.account.email.email && errors.push("L'email doit être valide")
        !this.$v.account.email.required && errors.push("L'e-mail est obligatoire")
        return errors
      },
       passWordErrors () {
        const errors = []
        if (!this.$v.account.password.$dirty) return errors
        !this.$v.account.password.minLength && errors.push('Mot de passe doit être superieur à 8 caractères')
      //  !this.$v.password.maxLength && errors.push('Mot de passe doit être inferieur à 32 caractères')
        !this.$v.account.password.required && errors.push('Le mot de passe est obligatoire')
        return errors
      },
    },
    props:[
         
     ],
    data ()
    {
        return {
           pwRules: [
        v => (v && v !== this.password) || 'Le mot de passe de confirmation doit être égal au mot de passe',
      ],
            menu:false,
            disable:false,
            btnTitle : 'Enregistrer',
            show :false,
            hint : '',
            infos:{
                  name :"",
                  firstName :"",
                  adresse:"",
                  dateNaiss :mineur,
                  lieuNaiss:""
              },
              account:{
                email: "",
                password :"",
                verifPassword:"",
                permission :"",
                img:[],
              },
            infos2: {
                matricule:"",
                numTel:"",
                role:"",
              },
            Roles:['Chef Service','Inspecteur','Côntrolleur','Auditeur','Agent'],
            title : 'Création du compte',
            etape: 1,
            error:'',
            Permissions:["Administrateur","User","Consulteur"],
            see:false,
            update :'',
            model: [],
            search : '',
            url_image:{src:'admin.jpg'},
            progress:null
        }
    },
    methods : {
     selectProfilImg () {
       if(this.account.img){ 
           const reader = new FileReader()
         reader.onload = e =>{
            const imgObj = new Image()
            imgObj.src = e.target.result
            this.url_image = imgObj
            
        }
        if(this.account.img){
            reader.readAsDataURL(this.account.img)
        }
        }
        else{
            console.log('error')
        }
        },
      openDialog(){
        this.show = true
        this.etape = 1
      },
      closeDialog(){
        this.clearForm()

        this.show = false
        
      },
      dispalayData(data){
              this.openDialog()
              this.title = `Modification de l'utilisateur`
              this.btnTitle = `Modifier`
              this.account.email = data.email,
              this.disable=true
              this.infos.name=data.nom
              this.infos.firstName= data.prenom
              this.infos.adresse=data.adresse
              this.infos.dateNaiss=moment(data.dateNaiss).format('YYYY-MM-DD')
              this.infos.lieuNaiss=data.lieuNaiss
              this.infos2.matricule=data.num_matricule
              this.infos2.numTel='0'+data.num__tel
              this.infos2.role=data.role
              this.account.permission = data.role_permission
             this.account.img = data.profil_image
            },
       verifBirthDay(){
         
         var now = new Date()
         var birthD = moment(this.infos.dateNaiss).add(18,'year')
        if(birthD === now || now - birthD< 18)
         {
           alert(`L'utilisateur que vous avez entré doit être majeur`)
           this.infos.dateNaiss = new Date()
         }
         else if(now - birthD>60){
           alert(`L'utilisateur que vous avez entré doit être en retraite`)
           this.infos.dateNaiss = new Date()
         }
       },
        next () { 
         /* this.etape += 1*/
          if(this.etape ===1 && !this.$v.infos.$invalid){
                this.etape = 2          
             }
          else if(this.etape ===2 && !this.$v.infos2.$invalid){
              this.etape =3
           }
          else if(this.etape ===3 &&!this.$v.account.$invalid){
              this.etape =4

            }
         },
         prev () {
            this.etape -= 1
        },
       async register () {
        this.$v.$touch()
     if(!this.$v.$invalid){
        try {
         var firstName = ""
         const prenom = this.infos.firstName.split(" ")
         prenom.forEach(value=>{ 
          firstName+= " " +js.toMaj(value)
          })
        const response = await AuthentificationService.register({
          account:{
                email: this.account.email,
                password: this.account.password,
                profil_image :'uploads/'+this.account.img.name,
                created_at:  moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                updated_at : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                user_matricule: this.infos2.matricule,
                role_permission:this.account.permission
          },
          userInfos :{
            num_matricule : this.infos2.matricule,
            nom: this.infos.name.toUpperCase(),
            prenom : firstName,
            adresse : this.infos.adresse,
            dateNaiss : this.infos.dateNaiss,
            lieuNaiss : this.infos.lieuNaiss,
            num_Tel : this.infos2.numTel,
            role : this.infos2.role,

            
          }
          })
         //console.log(response.data)
         if(response.data.error){
         this.$parent.message= response.data.error
           this.$parent.hasUpdated = true
            this.$parent.types= 'error'
           this.$parent.getAllUsers()
           }
         else{ 
            if(this.account.img!==""){ 
              let formData = new FormData()
              formData.append('file',this.account.img)
              formData.append('name','picture') 
              AuthentificationService.upload(formData,(event)=>{
                      this.progress = Math.round((100 * event.loaded)/event.total)
                  })
                  
           }
          this.next()
          this.$parent.getAllUsers()  
          
         }
        } catch(error){
        console.log(error)
          this.$parent.message= error.response.data.error
           this.$parent.types= 'error'
           this.$parent.hasUpdated = true
          this.$parent.getAllUsers()
          }
     }
    },
    async updateInfos () {
        const response = await AuthentificationService.updateInfos({
         infos :{
            nom: this.infos.name,
            prenom : this.infos.firstName,
            adresse : this.infos.adresse,
            date_naiss : this.infos.dateNaiss,
            lieu_naiss : this.infos.lieuNaiss,
            num_Tel : this.infos2.numTel,
            role : this.infos2.role
          },
          where :{ num_matricule : this.infos.matricule}
          })
          this.$parent.message= response.data.success
           this.$parent.hasUpdated = true
          this.$parent.getAllUsers()
        },
    clearForm () {
        this.$v.$reset()
        this.account.email = '',
        this.account.password = '',
        this.account.verifPassword=''
        this.infos.name='',
        this.infos.firstName= '',
        this.infos.adresse='',
        this.infos.dateNaiss=moment().format('YYYY-MM-DD'),
        this.infos.lieuNaiss='',
        this.infos2.matricule='',
        this.infos2.numTel='',
        this.infos2.role='',
        this.account.permission = ''
        this.disable=false
        this.title = 'Création du compte'
         this.btnTitle = `Enregistrer`
        this.account.img =[]
        this.url_image.src ='admin.jpg'
        }
    },
    components: {
        },
    mounted (){
       
      },
      watch: {
    },
  }
</script>