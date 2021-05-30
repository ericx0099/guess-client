<template>
  <div>
    <h1 class="text-center">{{ players.length }} Players!</h1>
    <v-card loading v-if="players">
      <div v-if="players.length > 0" style="width: auto" class="pa-2">
        <div
          v-for="player in players"
          :key="player.username"
          class="my-1 d-flex"
        >
          <v-btn class="ma-auto text-center" outlined color="indigo">
            {{ player.username }}
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="red"
            @click="$parent.kickUser(player._id)"
            v-if="$parent.creator_id == $store.state.auth.user._id"
          >
            <v-icon dark>
              {{ icon_delete }}
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "gamePlayers",
  props: {
    players: Array,
  },
  data() {
    return {
      icon_delete: "mdi-delete-forever",
    };
  },
};
</script>

<style scoped></style>
