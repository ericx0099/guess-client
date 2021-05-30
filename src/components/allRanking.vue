<template>
  <div>
    <v-toolbar>
      <v-tabs
          dark
          background-color="primary"
          grow
      >
        <v-tab @click="global = true; country = false">
          <v-badge
              icon="mdi-podium"
          >
            Global Ranking
          </v-badge>
        </v-tab>

        <v-tab @click="global = false; country = true">
          <v-badge
              icon="mdi-flag-minus-outline"
          >
            Country Ranking
          </v-badge>
        </v-tab>

      </v-tabs>
    </v-toolbar>
    <global-ranking v-if="global"></global-ranking>
    <country-ranking v-if="country"></country-ranking>
  </div>
</template>

<script>
import GlobalRanking from "./globalRanking";
import CountryRanking from "./countryRanking";
export default {
  name: "allRanking",
  components: {CountryRanking, GlobalRanking},
  data(){
    return{
      global: true,
      country: false
    }
  }
}
</script>

<style scoped>

</style>
