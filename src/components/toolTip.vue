<template>
<v-tooltip :disabled="disabled"  top :color="color">
       <template v-slot:activator='{on,attrs}' >
         <v-btn icon v-on="on" v-bind="attrs" class="">
           <slot name="icon" >
            
         </slot> 
         </v-btn>
         
       </template>
         {{text}}
</v-tooltip>
</template>
<script>
export default {
    props: [
        'activate',
        'text',
        'color',
        'position',
        'disabled'
    ]
}
</script>