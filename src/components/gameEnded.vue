<template>
  <div>
    <h1 class="text-center">GAME ENDED!</h1>
    <div class="d-flex justify-center">
      <v-list disabled>
        <v-subheader>Results</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(player, i) in players"
            :key="player.username"
            class="d-flex justify-center"
          >
            <v-btn color="warning" dark>
              <v-icon>{{ icons[i] }}</v-icon>
              <span class="display-1 font-weight-black">{{
                player.username + " - " + player.points
              }}</span>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "gameEnded",
  props: {
    players: Array,
  },
  data() {
    return {
      icons: ["mdi-trophy", "mdi-crown", "mdi-crown-outline"],
    };
  },
  methods: {},
};
</script>

<style scoped></style>
