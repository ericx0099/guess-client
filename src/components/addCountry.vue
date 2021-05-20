<template>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <h1 class="text-center">New Country</h1>
      <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
      ></v-text-field>
      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
      >
        Validate
      </v-btn>
    </v-form>
</template>

<script>
export default {
  name: "addCountry",
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
  }
}
</script>

<style scoped>

</style>
