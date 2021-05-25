<template>
  <div>
    <v-progress-linear
        :value="value"
        height="25"
        color="light-green"
        striped
    >
      <strong>{{ 10-value/10 }}s</strong>
    </v-progress-linear>
    <div class="mt-15 text-center ">
      <span class="display-1 font-weight-black">{{question.question_text}}</span>
    </div>

    <div class="d-flex justify-center mt-15">
     <div>
       <v-row>
         <v-col
         cols="6"
         v-for="(country, index) in question.countries"
         :key="country._id"
         class="d-flex justify-center"
         >
           <v-btn
               :color="colors[index]"

           >
             {{country.name}}
           </v-btn>
         </v-col>
       </v-row>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "questionRound",
  props: {
    question: Object
  },
  data(){
    return{
      value: 0,
      colors: ["red","orange","green","blue"]
    }
  },
  created(){
   this.timebar()
  },
  methods:{
    timebar(){
      const limitedInterval = setInterval(() => {
        if (this.value==100) {
          clearInterval(limitedInterval);

        }else{
          this.value=this.value+10;
        }

      },  1000);
    }
  }

}
</script>

<style scoped>

</style>
