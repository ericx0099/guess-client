<template>
  <div class="mt-15">
    <v-row class="d-flex justify-center">
      <v-col cols="9">
        <v-row>
          <v-col cols="6" class="d-flex justify-center">
            <v-btn x-large color="success" dark> Join a game </v-btn>
          </v-col>
          <v-col class="d-flex justify-center" cols="6">
            <v-btn x-large color="deep-purple" dark> Create a game </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "joinOrCreate",
};
</script>

<style scoped></style>
