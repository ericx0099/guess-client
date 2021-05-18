<template>
  <div class="w-50">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="username"
          :counter="10"
          :rules="nameRules"
          label="Username"
          required
      ></v-text-field>

      <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
      ></v-text-field>

      <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
      ></v-text-field>

      <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
      ></v-checkbox>

      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
      >
        Register
      </v-btn>

    </v-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    username: '',
    nameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: null,
    passwordRules: [
      v => !!v || 'Password is required',
/*      v => /.+@.+\..+/.test(v) || 'Password must be valid',*/
    ],
    checkbox: false,
  }),

  methods: {
    validate () {
      this.$refs.form.validate();
      this.register();
    },
    register() {
      const reqBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${this.email}", password: "${this.password}", username: "${this.username}", isAdmin: false}){
              _id
              email
              username
            }
          }
        `,
      };
      console.log(reqBody);
      axios
          .post("http://localhost:3000/api", reqBody)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
}
</script>
<style scoped></style>
