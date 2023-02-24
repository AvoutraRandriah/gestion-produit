import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/login'
import changePassword from './views/changePassword'
import User from './views/userList'
import NotFound from './views/pageNotFound'
import myProfil from './views/userProfil'
import Produit from './views/produit'
import HistoriquePrix from './views/historiquePrix'

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/accueil',
      name: 'Home',
      meta: {
        title: 'Accueil'
      },
      component: Home
    },
    {
      path: '/',
      name: 'Login',
      meta: {
        title: `S'authentifier`
      },
      component: Login
    },
    {
      path: '/changepassword',
      name: 'ChangePW',
      meta: {
        title: `Changer le mot de passe`
      },
      component: changePassword
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: 'Création du compte'
      },
      component: Register
    },
    {
      path: '/produit',
      name: 'produit',
      meta: {
        title: 'Liste des produits'
      },
      component: Produit
    },
    {
      path: '/historique-prix',
      name: 'historiquePrix',
      meta: {
        title: 'Historiques de prix'
      },
      component: HistoriquePrix
    },
    {
      path: '/utilisateur',
      name: 'utilisateur',
      meta: {
        title: 'Liste des utilisateurs'
      },
      component: User
    },
    {
      path:'/myProfil',
      name:'myProfil',
      meta: {
        title: 'Mon profil'
      },
      component : myProfil

    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      meta: {
        title: "Page introuvable 404"
      },
      component : NotFound
    }
  ]
})
export default router