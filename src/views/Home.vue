<template>
<div>
  <v-carousel 
   cycle
   v-resize="onResize"
   :height="height"
   hide-delimiter-background
   show-arrows-on-hover>
    <v-carousel-item
      v-for="(img, i) in images"
      :key="i"
       reverse-transition="fade-transition"
      transition="fade-transition"

    >
      <v-img contain :src='img.src' > </v-img>
    
    </v-carousel-item>
  </v-carousel>
  <div class="ma-4 pa-4 text-xs-h4 text-sm-h5 text-md-h4 text-lg-h3   text-xlg-h2  font-weight-black">
    <span class="cyan--text ">Gestion de</span><span class="blue--text titre "> Produit</span> 
  </div>
 </div>   
</template>
<script >

export default {
    data () {
        return {
            height:0,
            images:[
              {src: 'Caroussel/caroussel.jpg',float:'right',color:'cyan darken-2'},
              {src: 'Caroussel/caroussel (2).jpg',float:'left',color:'cyan'},
              {src: 'Caroussel/caroussel (4).jpg',float:'left',color:'indigo '},
              {src: 'Caroussel/caroussel (5).jpg',float:'left',color:'blue'}

          ],
          menus:[
            { 
              sections: 'Documents',
              autorisation :true,
              contents:[ 
                  {title:'Document SRAR',description:'Mise à jour des documents SRAR ',src:'document',img:''},
                  {title:'Déclaration',description:'Mise à jour des déclarations ',src:'declarations',img:''},
                  {title:'PVS',description:'Mise à jour des PVS',src:'Pvs',img:''}
                ]
            },
            { sections: 'Services',
              autorisation :true,
              contents:[ 
                  {title:'Bureau',description:'Mise à jour et listes des bureaux de dédouanement',src:'Bureau',img:''},
                  {title:'Divisions',description:'Mise à jour et listes des divisions au sein du SLF',src:'division',img:''},
                  {title:'Personnels',description:'Mise à jour et listes des personnels du SLF',src:'utilisateur',img:''},
                  ]
            },
            { sections: 'Informations DAU',
            autorisation :true,
              contents:[ 
                  {title:'Société',description:'Mise à jour et listes des sociétés',src:'Societe',img:''},
                  {title:'Marchandise',description:'Mise à jour et listes des marchandises ou produits ou marques',src:'Marchandise',img:''},
                  {title:'Secteur',description:'Mise à jour et listes des secteurs',src:'Secteur',img:''},
                  {title:'Pays',description:'Mise à jour et listes des pays exportateurs',src:'Pays',img:''},
                  ]
            },
            { sections: 'Risques douanière',
              autorisation :true,
              contents:[ 
                  {title:'Risques',description:'Mise à jour et listes des risques',src:'Risque',img:''},
                  ]
            },
           { sections: 'Rapport Sectoriel',
           autorisation :true,
              contents:[ 
                  {title:'Compte rendu',description:'Mise à jour et consultation des rapports par chaque déclarations',src:'rapport',img:''},
                  {title:'Bilan',description:'Consultation des bilans et statistiques des rapports ',src:'bilan',img:''},
                ]
            },
          ]
        }
    },
    methods:{
      color(i){
       var color = (i%2 === 0) ? 'grey lighten-2' : 'white darken-2'
       return color
      },
      navigateTo (route) {
        this.$router.push(route)
        },
      onResize(){
        this.height = window.innerHeight*60/100 
        }
    },
    mounted(){
     this.onResize()
    }
}
</script>
<style scoped>
.titre{
  text-shadow: 2px;
  font-weight: 900;
}
</style>
