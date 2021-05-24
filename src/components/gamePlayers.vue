<template>
  <div>
    <h1 class="text-center">{{players.length}} Players!</h1>
      <v-card loading v-if="players">
        <div v-if="players.length>0" style="width: auto" class="d-flex justify-space-around pa-2">
          <v-btn
              v-for="player in players"
              :key="player.username"
              class="ma-auto text-center"
              outlined
              color="indigo"
          >
            {{player.username}}
          </v-btn>
        </div>
      </v-card>

  </div>
</template>

<script>
export default {
  name: "gamePlayers",
  props: {
    players: Array
  }
}
</script>

<style scoped>

</style>
