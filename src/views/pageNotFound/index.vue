<template>
  <v-card align='center' height='800px'>  
    <div align='center' class="text-h2 pt-16 mb-16">
       Erreur 404  
    </div>  
     <v-container >
        <v-img src="../../assets/404.png" width='500px' />
        <v-card-subtitle class=" text-h5">
            La page que vous avez consulter est introuvable !<br>
            Revenir à la page d'<router-link to="/home">accueil</router-link>
        </v-card-subtitle>
    </v-container>
    </v-card>                 
</template>
