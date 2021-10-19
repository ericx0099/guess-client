<template>
  <div>
    <div class="d-flex justify-center" v-if="$parent.loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="blue"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-if="$parent.info" class="d-flex justify-center">
      <v-list disabled>
        <v-subheader>Results</v-subheader>

        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(result, i) in $parent.info"
            :key="result.username"
            class="d-flex justify-center"
          >
            <v-btn color="warning" dark>
              <v-icon>{{ icons[i] }}</v-icon>
              <span class="display-1 font-weight-black">{{
                result.username + " - " + result.points
              }}</span>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    <h1 v-if="!$parent.info && !$parent.loading" class="text-center">
      Select a game!
    </h1>
  </div>
</template>

<script>
export default {
  name: "gameInfo",
  props: {
    info: Array,
  },
  data() {
    return {
      icons: ["mdi-trophy", "mdi-crown", "mdi-crown-outline"],
      selectedItem: 1,
    };
  },
};
</script>

<style scoped></style>
