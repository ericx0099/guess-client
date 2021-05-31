<template>
  <div>
    <v-toolbar>
      <v-tabs
          dark
          background-color="primary"
          grow
      >
        <v-tab @click="questions = true; countries = false">
          <v-badge
              icon="mdi-comment-question-outline"
          >
            Review Quesitons
          </v-badge>
        </v-tab>

        <v-tab @click="questions = false; countries = true">
          <v-badge
              icon="mdi-flag-plus"
          >
            Add New Country
          </v-badge>
        </v-tab>

      </v-tabs>
    </v-toolbar>
    <review-questions v-if="questions"></review-questions>
    <add-country v-if="countries"></add-country>
  </div>
</template>

<script>
import addCountry from "../components/addCountry";
import reviewQuestions from "../components/reviewQuestions";

export default {
  name: "Administrate",
  components: {
    addCountry,
    reviewQuestions
  },
  data(){
    return{
      questions: true,
      countries: false
    }
  },
  created(){
    if(!this.$store.state.auth.user.isAdmin){
      this.$vToastify.warning("Must be Admin!");
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
