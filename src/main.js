import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {sync} from 'vuex-router-sync'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
import store from './store/store'
import Axios from 'axios'

Vue.config.productionTip = false

Axios.defaults.headers.common['Authorization'] =`Bearer ${store.state.token}`
sync(store, router)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
