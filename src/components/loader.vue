<template>
      <v-dialog
      v-model="dialog"
      :hide-overlay="overlay"
      persistent
      width="500"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{text}} en cours...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:[
        'text',
        "overlay",
        "timeOut"
    ],
 data(){
     return {
      dialog: false
     }
 },
 methods:{
 loading(){
     this.dialog = true
     setTimeout(() => (this.dialog = false),this.timeOut || 3000  )
 }
     }
}
</script>

<style>

</style>