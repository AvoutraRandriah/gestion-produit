<template>
      <v-dialog max-width="750px" persistent v-model="modal">
           <v-card >
                <v-layout>
                    <v-flex >
                        <div class="white  rounded-lg">
                            <v-toolbar flat dense class="red lighten-2 " dark>
                                <v-toolbar-title>
                                    {{title}}
                                </v-toolbar-title>
                                
                            </v-toolbar>
                            <div class="col-12">
                                <v-row class=' py-6 my-auto'>
                                 <v-col cols="1" class="my-auto">
                                     <v-icon large color='orange' >fas fa-exclamation-triangle</v-icon>
                                  </v-col>
                                  <v-col cols="11">
                                      <div v-html="message"></div>
                                  </v-col>
                                  
                            </v-row>
                            </div>
                            <div class='grey lighten-2 pa-4' slot='button'>
                                <v-btn small class='text-capitalize mx-4' @click='$emit("confirm")'>Oui</v-btn>                          
                                <v-btn small class='text-capitalize' @click='closeDialog'>Non</v-btn>
                            </div>
                            <!-- <slot name='button' >
                                     
                            </slot> -->
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
</template>
<script>
export default {
    props :[
        'message',
        'title'
        ],
    name: 'Delete',
    data (){
        return{
            modal: false,
        }
    },
    methods: {
        openDialog(){
            this.modal = true
        },
        closeDialog(){
            this.modal = false
        }
    },
}
</script>