<template>
  <v-app id="inspire">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login!</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-text-field
                    prepend-icon="mdi-email-multiple-outline"
                    v-model="email"
                    label="Email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-lock"
                    v-model="password"
                    id="password"
                    type="password"
                    label="Password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" :disabled="!valid" @click="validate"
                    >Login</v-btn
                  >
                </v-card-text>
                <v-card-actions> </v-card-actions>
                <p class="pa-2 text-center">
                  Still dont have an account?
                  <router-link to="/register">Register!</router-link>
                </p>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-form>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: null,
    passwordRules: [
      (v) => !!v || "Password is required",
      /*      v => /.+@.+\..+/.test(v) || 'Password must be valid',*/
    ],
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.signIn();
      }
    },
    ...mapActions({
      login: "auth/login",
    }),
    signIn() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      this.login(credentials);
    },
  },
};
</script>

<style scoped></style>
