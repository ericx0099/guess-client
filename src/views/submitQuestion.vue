<template>
  <div style=" display: flex; justify-content: center;">
    <v-col cols="5" sm="3" >
      <v-form v-model="valid" lazy-validation ref="form" >
        <h1 class="text-center">Submit New Question!</h1>
        <v-text-field
            v-model="question"
            :rules="questionRules"
            label="Question"
            required
        ></v-text-field>
        <v-col class="d-flex" cols="12" sm="6" v-if="countries">
          <v-select v-model="select"
                    :hint="`${select.country}`"
                    :items="countries"
                    item-text="country"
                    item-value="id"
                    persistent-hint
                    return-object
                    single-line
                    label="Select the Answer"
                    ></v-select>
        </v-col>
        <v-btn
            :loading="loading"
            :disabled="!valid"
            color="blue-grey"
            class="ma-2 white--text"
            @click="loader = 'loading'; validate()"

        >
          Submit
          <v-icon
              right
              dark
          >
            mdi-comment-question
          </v-icon>
        </v-btn>
      </v-form>
    </v-col>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "submitQuestion",
  data() {
    return {
      select: { country: 'Spain', id: '60a6b6ddf7adf9126b96f5d9' },
      valid: false,
      question: "",
      questionRules: [(v) => !!v || "Question is required"],
      countries: null,
      answer: null,
      loading: false,
      loader: null,
      image_url: null
    };
  },
  created() {
    if (!this.$store.state.auth.user) {
      this.$vToastify.warning("Must be Logged in!");
      this.$router.push("/login");
    }
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
      this.countries = res.data.data.countries.map(function (country){
        return {country: country.name, id: country._id}
      })
      console.log(this.countries);
    });
  },
  methods: {
    validate(){
      if (this.$refs.form.validate()) {
        this.create();
      }
    },
    create(){
      const mutation = {
        query: `
          mutation{
            createQuestion(questionInput: {answer:"${this.select.id}", text: "${this.question}", image_url: "${this.image_url}"}){
              _id
            }
          }
        `
      }
      let axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.auth.token,
        },
      };
      axios.post("http://localhost:3000/api",mutation,axiosConfig).then(res=>{
        console.log(res);});
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 1000)

      this.loader = null
    },
  },
};
</script>

<style scoped></style>
