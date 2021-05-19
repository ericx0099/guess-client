<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Home
      </div>
      <v-spacer></v-spacer>
      <v-btn
        text
      >
        <span class="mr-2" @click="$vuetify.theme.dark = ! $vuetify.theme.dark">Dark Mode</span>
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-btn
          text
      >
        <span class="mr-2" >Play</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    username: ''
  }),
};
</script>
