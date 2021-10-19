<template>
  <div>
    <v-toolbar>
      <v-tabs dark background-color="primary" grow>
        <v-tab
          @click="
            profile = true;
            games = false;
          "
        >
          <v-badge icon="mdi-account-edit"> Edit Profile </v-badge>
        </v-tab>

        <v-tab
          @click="
            profile = false;
            games = true;
          "
        >
          <v-badge icon="mdi-gamepad-square-outline"> My Games </v-badge>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <edit-profile v-if="profile"></edit-profile>
    <my-games v-if="games"></my-games>
  </div>
</template>

<script>
import editProfile from "../components/editProfile";
import myGames from "../components/myGames";

export default {
  name: "Profile",
  components: {
    editProfile,
    myGames,
  },
  data() {
    return {
      profile: true,
      games: false,
    };
  },
  created() {
    if (!this.$store.state.auth.user) {
      this.$vToastify.warning("Must be Logged in!");
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped></style>
