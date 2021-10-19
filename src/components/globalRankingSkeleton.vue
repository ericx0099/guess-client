<template>
  <div class="d-flex justify-center mt-6">
    <v-row class="d-flex justify-center">
      <v-col md="5" sm="10" xs="11">
        <v-skeleton-loader
          v-for="n in length"
          :key="n"
          type="list-item"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "globalRankingSkeleton",
  data() {
    return {
      length: 10,
    };
  },
};
</script>

<style scoped></style>
