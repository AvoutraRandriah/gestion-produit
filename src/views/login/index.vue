<template>
<v-card class="" >
    <v-img  :cover='true' src='conteneuur.jpg' class="">
      <v-container fluid class="">
          <v-card transition='fade-transition' class="mx-auto mt-16  elevation-24 rounded-lg" max-width='800px'>
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              top
              
            ></v-progress-linear>
            <v-layout >   
              <v-flex xs12 sm6  class="rounded-lg">
                <div class="ma-4 rounded-l-xxlarge text-lg-h3 text-md-h3 text-sm-h3 text-h3 text-center grey--text" style="font-weight:900">
                  L<span class="blue--text">ogin</span> <v-icon>fas fa-tablet</v-icon> 
               </div>
                <v-form v-model="valid" lazy-validation >
                <div  class="pl-4 pr-2 py-4 mx-4">
                          <v-text-field
                          prepend-icon='fas fa-user'
                            v-model="email"
                            :error-messages="emailErrors"
                            label="E-mail"
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                            @keyup.enter="login"
                          ></v-text-field>
                          <v-text-field
                            prepend-icon='fas fa-lock'
                            :append-icon='`${see ? "fas fa-eye" :"fas fa-eye-slash"} `'
                            label="Mot de passe"
                            placeholder='Mot de passe'
                            :type='`${see ? "text" :"password"}`'
                            v-model='password'
                            @mousedown="see=!see"
                            @mouseup="see=!see"
                            required
                            :error-messages="passWordErrors"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                            @keyup.enter="login"
                          ></v-text-field>
                        <br>
                        <v-btn outlined color='blue' class=" col-9 ml-8 mb-4  rounded-pill white--text " 
                          :loading='loading' center @click.prevent="$v.$touch()" @click.stop="login" >
                            <span class="text-capitalize">Connexion</span>
                        </v-btn><br>
                        <!-- <a href="http://" class='mt-4 text-decoration-none blue--text'>Mot de passe oublié?</a> -->
                  </div>
                </v-form> 
              </v-flex>
              <v-col  xs12 sm6  md6 lg6  class="hidden-xs-only rounded-r-xxlarge " >
                <div  class="rounded-l-xxlarge my-8">
                    <v-img src='logo.png'></v-img>
                </div>
              </v-col> 
            </v-layout>
             <div class='mx-4 text-caption font-weight-medium'>
                 &copy; <a class="text-decoration-none" href="https://www.facebook.com/djauck.randriah"> Avoutra Randriah 2023</a>
            </div>
          </v-card>
      </v-container>
    </v-img>
 </v-card>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength,minLength, email } from 'vuelidate/lib/validators'

  import AuthentificationService from '@/services/AuthentificationServices'
  import historiqueService from '@/services/historiqueService'
  import moment from 'moment'
  // import IP from 'ip'
  //  import axios from 'axios'

export default { 
  name: 'login',
   mixins: [validationMixin],
    validations: {
     email: { required, email },
     password :{ required,maxLenght : maxLength(32),minLength : minLength(8)}

    },
    computed:{
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
        // !this.$v.password.maxLength && errors.push('Mot de passe doit être inferieur à 32 caractères')
        !this.$v.password.required && errors.push('Le mot de passe est obligatoire')
        return errors
      },
    },
  data ()
  {
      return {
        valid : false,
          email : '',
          password : '',
          error : '',
          link:'/register',
          loading: false,
          see:false
      }
  },
  mounted() {
    this.email= this.$store.getters.getEmail
  },
  methods :{
     async getUserIP(){
      // const API_KEY = 'a9e48c70-8b22-11ed-8d13-bd165d1291e3'
      //  const response = await axios.get('https://geolocation-db.com/json/'+API_KEY)
      //  console.log(response) 
      // const API_KEY = '9d68f171f16d4ecd900e8d79b38286aa'
      //  const response = await axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key='+API_KEY)
      // return response.data
      // if(navigator.geolocation){
      //   navigator.geolocation.getCurrentPosition(position=>{
      //     console.log(position.coords.latitude,position.coords.longitude)
      //   })
      // }else{
      //     alert('Geolocation is not supported by the browser')
      //   }
     },
     alert(){     
        this.$refs.alert.openAlert()
   },
    async login () {
      // const API_KEY = '9d68f171f16d4ecd900e8d79b38286aa'
      if(this.$store.state.isUserLoggedIn){
           alert("Vous êtes déjà connectés")
           this.navigateTo({name:'Home'})
      }else{
        this.$v.$touch()
       if(!this.$v.$invalid){
      //  const response = await axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key='+API_KEY)
      const ipAddressInfos = "response.data.ip_address" 
      const position = "response.data.city+'-'+response.data.country+' '+response.data.longitude+' '+response.data.latitude"
        this.loading = true     
        await AuthentificationService.login({
          where:{
            email : this.email,
            password : this.password
          }
        }).then(response=>{
              if(response.data.error){
                  alert(response.data.error)
              }
              else{
             AuthentificationService.updateAccount({account:{
                    status_connexion: true,
                   },
                where:{
                    email : this.email
                }})
                var osName = 'unknown'
                var pattern = /Android/
                if(navigator.appVersion.indexOf('Win')>-1) osName = 'Windows'
                if(navigator.appVersion.indexOf('Mac')>-1) osName = 'MacOS'
                if(navigator.appVersion.indexOf('X11')>-1) osName = 'UNIX'
                if(pattern.test(navigator.appVersion)>-1 ) osName = 'Android'
                if(navigator.appVersion.indexOf('Linux')>-1) osName = 'Linux'
                if(navigator.appVersion.indexOf('like Mac')>-1) osName = 'iOS'
               historiqueService.addHistoriqueCnx({
                  id_user: response.data.user.id_user,
                  connected_at:moment().format('YYYY-MM-DD HH:mm:ss'),
                  browser_type: navigator.userAgent,
                  system_type : osName,
                  ip_adress: ipAddressInfos,
                  localisation:position,
                  deconnected_at:null
                }) 
                  var user = response.data.user
                   user.connected_at = moment().format('YYYY-MM-DD HH:mm:ss')

                   this.$store.dispatch('setToken',response.data.token)
                  this.$store.dispatch('setUser',user) 
                    if(response.data.user.role_permission=='Administrateur'){
                      this.navigateTo({name:'bilan'})
                    }
                    else{
                      this.navigateTo({name:'Home'})
                    }
                  }
                  
                // }
            }).catch(error =>{
              alert(error)
            
            })
             setTimeout(() => {   
                this.loading = false 
          
              },3000)
          }  
           }
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
      }
  }
  ,
  components: {
      }
  }
</script>