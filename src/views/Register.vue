<template>
  <div style="width: 100%; display: flex; justify-content: center">
    <div style="width: 40%">
      <h1 class="text-center">Create new Account</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
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
          type="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-select
            v-if="countries"
            v-model="country"
            :items="countries"
            item-text="country"
            item-value="id"
            persistent-hint
            return-object
            single-line
            label="Select your country"
        ></v-select>
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
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    /*select: { country: "Spain", id: "60a6b6ddf7adf9126b96f5d9" },*/
    country: null,
    valid: true,
    username: "",
    nameRules: [
      (v) => !!v || "Username is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
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
    checkbox: false,
    countries: null
  }),
  created(){
    const query = {
      query: `
        query{
          countries{
            _id
            name
          }
        }
      `,
    };
    axios.post("http://localhost:3000/api", query).then((res) => {
      this.countries = res.data.data.countries.map(function (country) {
        return { country: country.name, id: country._id };
      });
    });
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
    register() {
      const reqBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${this.email}", password: "${this.password}", username: "${this.username}", isAdmin: false, country: "${this.country.id}"}){
              _id
              email
              username
            }
          }
        `,
      };
      axios
        .post("http://localhost:3000/api", reqBody)
        .then((res) => {
         if(res.data.data.createUser){
           this.$vToastify.success("Registered Successfully! Now Login!");
           this.$router.push('/login');
         }
        })
        .catch((err) => {
          const error = {
            status: `
              title: "Error",
              body: "${err.response.data.errors[0].message}",
              type: "error",
              defaultTitle: true,
              canPause: false
            `,
          };
          this.$vToastify.error(error);
        });
    },
  },
};
</script>
<style scoped></style>
