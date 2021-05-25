<template>
  <div class="mt-15">
    <div v-for="player in players" :key="player.username" class="d-flex justify-center my-1">
      <v-btn
          rounded
          color="primary"
          dark
      >
        <span class="font-weight-black">{{player.points}} - {{player.username}}</span>
      </v-btn>

    </div>
  </div>
</template>

<script>
export default {
  name: "playerPoints",
  props: {
    players: Array
  }
}
</script>

<style scoped>

</style>
