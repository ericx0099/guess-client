<template>
  <div class="mt-10">
    <h1 class="text-center display-2 font-weight-black">Country Ranking</h1>
    <global-ranking-skeleton v-if="loading"></global-ranking-skeleton>
    <v-row class="justify-center d-flex">
      <v-col class="d-flex" md="4" sm="6" xs="4" v-if="countries">
        <v-select
            v-model="select"
            :hint="`${select.country}`"
            :items="countries"
            item-text="country"
            item-value="id"
            persistent-hint
            return-object
            single-line
            label="Select the Answer"
        ></v-select>
      </v-col>
    </v-row>
    <div v-if="!loading && ranking.length">
      <div class="d-flex justify-center mt-6">
        <v-row class="d-flex justify-center">
          <v-col md="5"
                 sm="10"
                 xs="11">
            <v-card tile>
              <v-list rounded>
                <v-subheader>TOP 10</v-subheader>
                <v-list-item-group
                    color="primary"
                >
                  <v-list-item
                      v-for="(item, i) in ranking"
                      :key="i"

                  >
                    <v-list-item-icon>
                      <v-icon v-text="i+1"></v-icon>
                    </v-list-item-icon>
                    <div class="d-flex justify-space-between" style=" width: 100%; height: 100%">
                      <span v-text="item.username"></span>
                      <span v-text="item.points"></span>
                    </div>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <h1 v-else class="text-center">No records found</h1>
  </div>
</template>

<script>
import axios from "axios";
import globalRankingSkeleton from "./globalRankingSkeleton";
export default {
  name: "countryRanking",
  components:{
    globalRankingSkeleton
  },
  created(){
    const query = {
      query: `
        query{
          countries{
            _id
            name
          }
        }
      `,
    };
    axios.post("http://localhost:3000/api", query).then((res) => {
      this.countries = res.data.data.countries.map(function (country) {
        return { country: country.name, id: country._id };
      });
    });
    this.find();
  },
  data(){
    return{
      ranking: [],
      icon: "mdi-crown",
      loading: false,
      countries: null,
      select: { country: "Spain", id: "60a6b6ddf7adf9126b96f5d9" },
    }
  },
  methods:{
    find(){
      this.loading = true;
      const query = {
        query: `
        query{
          countryRanking(country_id: "${this.select.id}"){
            username
            points
          }
        }
      `,
      };
      console.log(query);
      axios.post("http://localhost:3000/api", query).then((res) => {
        if(res.data.data.countryRanking){
          this.ranking = res.data.data.countryRanking;
        }
        this.loading = false;
      });
    }
  },
  watch:{
    select: function(){
      this.find()
    }
  }
}
</script>

<style scoped>

</style>
