<template>
  <nav>
      <v-app-bar dark app>
        <v-app-bar-nav-icon  class="grey--text"  @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title   class=" grey--text mr-16 font-weight-black text-xlg-h3 text-lg-h4 text-md-h4 text-sm-h4 text-xs-h4" >
            <span class=" blue--text"  @click="navigateTo({name: 'Home'})">G.<span class="white--text">Prod</span> </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
          
        <div class="text-center mx-4" >
             <v-menu
                class="mt-4 full-screen elevation-2"
                bottom left
                v-model="menu"
                :close-on-content-click="false"
                rounded='lg'
                offset-y
                transition="slide-y-transition"
                v-for="(badge, i ) in badges " :key='i' >
             <template v-slot:activator="{on,attrs}">
                   <v-badge 
                        v-show="unseenNotif >0"
                        :content='unseenNotif'
                        color='error'
                        border='left'
                        colored-border
                        type='grey'
                        overlap
                        x-small
                        class='mx-2 pointer'
                        >
                    <v-icon v-on="on" v-bind="attrs">{{badge.icon}}</v-icon>
                </v-badge>
                <v-icon v-show="unseenNotif ===0" v-on="on" v-bind="attrs" >{{badge.icon}}</v-icon>
             </template>
             </v-menu>
            <v-menu
                class="ml-8"
                bottom left
                :close-on-content-click="false"
                v-model="clickContent"
                rounded='lg'
                offset-y
                transition="slide-y-transition">
             <template v-slot:activator="{ on, attrs }">
                    <v-avatar v-bind="attrs"   v-on="on" size="30" class="mx-4 grey lighten-2">
                        <img :src='`${server}`' />
                    </v-avatar>
                </template>  
                <v-list nav dense  width="250px">
                    <v-list-item-group>
                        <template  v-for="(item, index) in items">
                            <v-list-group
                                v-if="item.subGroup"
                                :key="item.title"
                                append-icon="fas fa-caret-down"
                                multiple 
                               >
                                <template v-slot:activator>
                                    <v-list-item-action>
                                        <v-icon small>{{item.icon}}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content >
                                        <v-list-item-title >{{item.title}}</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                               
                                  <v-list-item
                                    class="pl-6"
                                    v-for="(child) in item.subGroup"
                                    :key="child.text"
                                    router :to="child.route"  >
                                    <v-list-item-icon>
                                        <v-icon small>{{child.icon}}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content >
                                        <v-list-item-title class="ml-0"
                                       >{{child.title}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                            <v-list-item
                               v-else
                                :key="item.title"
                                link >
                                <v-list-item-icon >
                                    <v-icon small>{{item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>
                                    <span  @click="navigateTo({name: item.route, params : {idUser : $store.state.user.id_user}})">{{ item.title }}</span>
                                </v-list-item-title>
                            </v-list-item>
                            <v-divider :key="index"></v-divider>
                        </template>
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon small >fas fa-power-off</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                <span  @click="logout" class=' text-capitalize' >Déconnexion</span>
                            </v-list-item-title>
                       </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-menu>           
          </div>
      </v-app-bar>
     <v-navigation-drawer dark  app v-model="drawer" >
          <v-layout column align-center>
              <v-flex class="mt-5" >
                <v-avatar size="100" class="grey lighten-2">
                   <img src='/logo.png' />
                </v-avatar> 
                <p  class="white--text subheading mt-1">
                     
                </p>
              </v-flex>            
          </v-layout>  
        <v-list>
        <v-list-item v-for="item in drawers"
         router 
         :to="item.route" 
         :key="item.text" >
         <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
         </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >{{item.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
       
      </v-list> 
       
    </v-navigation-drawer>
    <Loader ref="loader" text="Déconnexion" :overlay="false" />
  </nav>
</template>

<script>
import Loader from '../components/loader'
import AuthentificationService from '../services/AuthentificationServices'
import historiqueService from '../services/historiqueService'
import moment from 'moment'
import server from  '../services/server.config'

export default {
    name: 'navBar',
    components: {
        Loader
       },
    data () {
        return {
            server:server.URL,
            clickContent:false,
            notifications:[],
            unseenNotif:0,
            menu:false,
            drawer : false,
            badges:[
                 {
                    icon: 'far fa-bell',route:'Marchandise',
                    title:'Notifications'
                    }
            ],
            drawers:[
            { text: 'Accueil',icon:'fas fa-home',route:'/accueil' },
            { text: 'Produits',icon:'fas fa-cart-shopping',route:'/produit' },
            { text: 'Historiques prix',icon:'fas fa-money-bill-trend-up',route:'/historique-prix' },
            { text: 'Ressources humaines',icon:'fas fa-users',route:'/utilisateur' },
            ],
       items: [
        { title: 'Profil',icon:'fas fa-user',route:'myProfil' },
         { title: 'Historiques',icon:'fas fa-history',subGroup:[ 
           {title: 'Historiques personnelles',icon:'fas fa-users',route:'historique' },
           {title: 'Historiques de connexion',icon:'fas fa-laptop',route:'historique-connexion' } 
         ],
        }
      ],
        }
    },
    computed:{
       
    },
    watch:{
        options: {
        handler () {
        },
        deep: true,
      },
    },
    methods :{
    navigateTo (route) {
          if(!this.$store.state.isUserLoggedIn)
           {
            alert('Veuillez vous connecter d\'abord !')
                this.$router.push({name: 'Login'})
            }
         else{
            this.$router.push(route)
            }
        },
        logout () {
            AuthentificationService.updateAccount({account:{
                    status_connexion : false,
                   },
                where:{
                    id_user : this.$store.state.user.id_user
                }})
                historiqueService.updateHistoriqueCnx({ 
                data:{
                     deconnected_at:moment().format('YYYY-MM-DD HH:mm:ss')
                     },
                where:{
                      id_user: this.$store.state.user.id_user,
                       connected_at: this.$store.state.user.connected_at
                    }
                })
            this.$refs.loader.loading()
              
             setTimeout(() => {   
             
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.drawer = false
           
             this.$store.dispatch('setRouteHistory',null)
            this.$router.push({name: 'Login'})
         },4000);
           
        }
    },
    mounted(){
 }
  }
</script>
<style>
.pointer {
    cursor:pointer
}
.titre{
  text-shadow: 2px;
  font-weight: 900;
}
</style>

