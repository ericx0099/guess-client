<template>
  <div class="mb-10 mt-10">
    <h1 class="display-2 font-weight-black text-center">Global Ranking</h1>
    <globalRankingSkeleton v-if="!ranking.length"></globalRankingSkeleton>
    <div v-if="ranking.length">
      <div class="d-flex justify-center mt-6">
        <v-row class="d-flex justify-center">
          <v-col md="5"
            sm="10"
                 xs="11"
            >
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
  </div>
</template>

<script>
import axios from "axios";
import globalRankingSkeleton from "./globalRankingSkeleton";
export default {
  name: "globalRanking",
  components:{
    globalRankingSkeleton
  },
  data(){
    return{
      ranking: [],
      icon: "mdi-crown",
    }
  },
  created() {
    const query = {
      query: `
        query{
          globalRanking{
            username
            points
          }
        }
      `,
    };
    axios.post("http://localhost:3000/api", query).then((res) => {
      if(res.data.data.globalRanking){
        this.ranking = res.data.data.globalRanking
      }
    });
  },
  methods:{
    getIcon(i) {
      console.log(i);
      if (i === 1) return this.icon;
    },
  }
};
</script>

<style scoped></style>
