<template>
  <div class="d-flex justify-center">
    <v-card class="text-center" elevation="3">
      <h1 v-for="player in players" :key="player.username">{{player.username}} - {{player.points}}</h1>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "gameEnded",
  props: {
    players: Array
  }
}
</script>

<style scoped>

</style>
