import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from "js-cookie"

Vue.use(Vuex)

export default  new Vuex.Store({
    strict:true,
   plugins :[
       createPersistedState({
           storage: {
               getItem: (key) => Cookies.get(key),
               setItem : (key,value) => Cookies.set(key,value,{expires : 3, secure: true}),
               removeItem : (key)=> Cookies.remove(key),
           },
       }),
    ],
    state:{
        token: null,
        user: null,
        isUserLoggedIn : true,
        routeHistory: [],
        lastEvent:[],
        isAdmin:false,
        isUser:false,
        isConsultant:false
    },
    getters : {
       
        isLoggedIn : state =>{
            return state.isUserLoggedIn
        },
        isAdmin : state =>{
            return state.isAdmin
        },
        isConsultant : state =>{
            return state.isConsultant
        },
        isUser : state =>{
            return state.isUser
        },
        lastEvent: state =>{
            return state.lastEvent
        },
        getEmail: state=>{
            return state.user.email
        },
        getRouteHistory: state =>{
            return state.routeHistory
        }
        
    },
    mutations :{
        setToken (state, token)  {
            state.token = token
            if(token){
                state.isUserLoggedIn = true
            }
            else{
                state.isUserLoggedIn = false
            }
        },
        setUser (state,user) {
            state.user = user
            state.isAdmin = user.role_permission.toLowerCase().indexOf('admin')>-1
            state.isUser =  user.role_permission.toLowerCase().indexOf('user')>-1
            state.isConsultant = user.role_permission.toLowerCase().indexOf('consult')>-1
        },
        setRouteHistory (state,route) {
            state.routeHistory.push(route)
            
        },
        setLastEvent(state,event){
            state.lastEvent =event
        }
    },
    actions:{
        setToken({commit},token){
            commit('setToken',token)
        },
         setUser({commit},user){
            commit('setUser',user)
        },
        setRouteHistory({commit},routeHistory){
            commit('setRouteHistory',routeHistory)
        },
        setLastEvent({commit},event){
            commit('setLastEvent',event)
        }
    }

})
