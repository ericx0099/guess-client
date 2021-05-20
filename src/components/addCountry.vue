<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h1 class="text-center">New Country</h1>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Create
    </v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  name: "addCountry",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.create();
      }
    },
    create() {
      const mutation = {
        query: `
          mutation {
            createCountry(countryInput: {name: "${this.name}"}){
              name
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
          if (res.data.errors) {
            this.$vToastify.error(res.data.errors[0].message);
          } else {
            this.$vToastify.success("Country "+res.data.data.createCountry.name+ " created successfully");
          }
        })
        .catch((err) => {
          console.log(err);
            if(err.response.data.errors){
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
            }
        });
    },
  },
};
</script>

<style scoped></style>
