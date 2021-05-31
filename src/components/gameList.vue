<template>
 <div>
   <div >
     <p class="text-center">Your last games..</p>
     <v-card v-if="games.length" class="mx-auto" max-width="300" tile>
       <v-list dense>
         <v-subheader>Last {{this.games.length}} Games</v-subheader>
         <v-list-item-group
             v-model="selectedGame"
             color="primary"
             v-if="games.length > 0"
         >
           <v-list-item v-for="(game, i) in games" :key="i" @click="$parent.getGameInfo(game._id)">
             <v-list-item-icon>
               <v-icon>mdi-gamepad-variant</v-icon>
             </v-list-item-icon>
             <v-list-item-content>
               <v-list-item-title
                   v-text="i + 1 + ' - ' + game.createdAt"
               ></v-list-item-title>
             </v-list-item-content>
           </v-list-item>
         </v-list-item-group>
         <h1 v-else>No games found!</h1>
       </v-list>
     </v-card>
   </div>
    <div v-if="!games.length">

      <v-card class="mx-auto" max-width="300" tile  >
        <v-subheader>Last {{this.games.length}} Games</v-subheader>
        <v-skeleton-loader
            type="list-item"
            v-for="item in loader" :key="item"
        ></v-skeleton-loader>
      </v-card>
    </div>

 </div>
</template>

<script>
import axios from "axios";
export default {
  name: "gameList",
  data() {
    return {
      games: [],
      selectedGame: 1,
      loader: 7
    };
  },
  created() {
    const query = {
      query: `
      query{
        lastGames{
          _id
          createdAt
        }
      }
      `,
    };
    let axiosConfig = {
      headers: {
        Authorization: "Bearer " + this.$store.state.auth.token,
      },
    };
    axios.post(this.$apiPath, query, axiosConfig).then((res) => {
      if (res.data.data.lastGames.length > 0) {
        this.games = res.data.data.lastGames;
      }
    });
  },
};
</script>

<style scoped></style>
