<template>
  <div>
    <div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Username"
              :rules="rules"
              hide-details="auto"
              v-model="username"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              title="Change Username"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Ok!
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "editUsername",
  data() {
    return {
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      username: this.$store.state.auth.user.username,
      valid: true,
      snackbar: false,
      text: "Username Changed Successfully",
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.update();
      }
    },
    update() {
      const mutation = {
        query: `
        mutation{
          changeUsername(username:"${this.username}"){
            username
          }
        }
        `,
      };
      let axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.auth.token,
        },
      };

      axios
        .post("http://localhost:3000/api", mutation, axiosConfig)
        .then((res) => {
          if (res.data.data.changeUsername.username) {
            this.snackbar = true;
            this.username = res.data.data.changeUsername.username;
            this.$store.state.auth.user.username =
              res.data.data.changeUsername.username;
          }
        })
        .catch((err) => {
          this.$vToastify.error(err);
        });
    },
  },
};
</script>

<style scoped></style>
