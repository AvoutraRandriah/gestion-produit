<template>
   <div align='left' v-if="pageCount>=1" class="row ma-8 ">
                 <v-select
                    v-model="$parent.perPage"
                   class="col-3 col-xl-1 col-lg-1 col-md-1 col-sm-1 "
                   outlined
                   dense
                 :items="['5','10','15','30','All']"
                 ></v-select>
                  <v-pagination
                      v-model="$parent.page"
                      :length="pageCount"
                      :total-visible="5"
                      circle
                  ></v-pagination>
             </div>
</template>
<script>
export default {
    props:{
        pageCount:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            page:1
        }
    }
}
</script>