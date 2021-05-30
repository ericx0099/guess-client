<template>
  <div class="mt-5">
    <h1 class="display-3 text-center">Edit Your Profile!</h1>
    <v-row class="justify-center d-flex mt-10">
      <v-col sm="9" xs="11  " md="6">
        <v-row>
          <v-col cols="12">
            <edit-username></edit-username>
          </v-col>
          <v-col cols="12">
            <change-email></change-email>
          </v-col>
          <v-col cols="12">
            <edit-password></edit-password>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import editUsername from "./editUsername";
import changeEmail from "./changeEmail";
import editPassword from "./editPassword";

export default {
  name: "editProfile",
  components: {
    editUsername,
    changeEmail,
    editPassword,
  },
};
</script>

<style scoped></style>
