<template>
  <div class="">
    <div class="mt-15">
      <div
        v-for="(player, index) in players"
        :key="player.username"
        class="d-flex justify-center my-1"
      >
        <v-btn rounded color="primary" dark>
          <span class="font-weight-black"
            >{{ player.points }} - {{ player.username }} -
            <v-icon>{{ getIcon(index + 1) }}</v-icon></span
          >
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "playerPoints",
  props: {
    players: Array,
  },
  data() {
    return {
      icon: "mdi-crown",
    };
  },
  methods: {
    getIcon(i) {
      console.log(i);
      if (i === 1) return this.icon;
    },
  },
};
</script>

<style scoped></style>
