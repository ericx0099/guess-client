<template>
  <div class="justify-md-center">
    <div class="d-flex justify-center">
      <v-form ref="form" v-model="valid" lazy-validation style="width: 100%">
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Email"
              :rules="rules"
              hide-details="auto"
              v-model="email"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              title="Change Email"
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
  name: "changeEmail",
  data() {
    return {
      rules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      email: this.$store.state.auth.user.email,
      valid: true,
      snackbar: false,
      text: "Email Changed Successfully",
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
          changeEmail(email:"${this.email}"){
            email
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
        .post(this.$apiPath, mutation, axiosConfig)
        .then((res) => {
          if (res.data.data.changeEmail) {
            this.snackbar = true;
            console.log("here");
            this.email = res.data.data.changeEmail.email;
            this.$store.state.auth.user.email = res.data.data.changeEmail.email;
          } else {
            if (res.data.errors) {
              this.$vToastify.error(res.data.errors[0].message);
            } else {
              console.log("lek");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          /*this.$vToastify.error(err.response.data.errors[0].message);*/
        });
    },
  },
};
</script>

<style scoped></style>
