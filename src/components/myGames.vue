<template>
  <div>
    <h1 class="display-2 text-center">Game History</h1>
    <v-row>
      <v-col md="6">
        <game-list></game-list>
      </v-col>
      <v-col md="6">
        <game-info :info="info"></game-info>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gameList from "./gameList";
import axios from "axios";
import gameInfo from "./gameInfo";
export default {
  name: "myGames",
  components: {
    gameList,
    gameInfo
  },
  data(){
    return{
      info: null,
      loading: false
    }
  },
  methods: {
    getGameInfo(id) {
      this.loading = true;
      this.info = null;
      const query = {
        query: `
          query{
            gameResults(game_id: "${id}"){
              username
              points
            }
          }
        `,
      };
      axios.post(this.$apiPath, query).then((res) => {
        console.log(res);
        if(res.data.data.gameResults){
          this.info = res.data.data.gameResults
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style scoped></style>
