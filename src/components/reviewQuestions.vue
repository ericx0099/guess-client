<template>
  <div>
    <h1 class="text-center d-flex justify-center mt-10 font-weight-black">
      Questions to be Reviewed
    </h1>
    <div v-if="questions.length && !loading" class="justify-center d-flex m-15">
      <v-row class="justify-center d-flex">
        <v-col md="5" sm="10" xs="11">
          <v-data-table
            :headers="headers"
            :items="questions"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.accept="{ item }">
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="green"
                title="accept"
                @click="accept(item.id)"
              >
                <v-icon dark> mdi-sticker-check-outline </v-icon>
              </v-btn>
            </template>
            <template v-slot:item.deny="{ item }">
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="red"
                title="Deny"
                @click="deny(item.id)"
              >
                <v-icon dark> mdi-sticker-remove-outline </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
    <div v-if="loading">
      <v-row class="justify-center d-flex">
        <v-col md="5" sm="10" xs="11">
          <v-skeleton-loader
            v-for="item in 10"
            :key="item"
            type="list-item"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-if="!loading && !questions.length" class="text-center mt-15">
      <h1>No Questions Pending :(</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "reviewQuestions",
  data() {
    return {
      loading: false,
      questions: [],
      headers: [
        {
          text: "Question",
          value: "question",
        },
        { text: "Answer", value: "answer" },
        { text: "Accept", value: "accept" },
        { text: "Deny", value: "deny" },
      ],
    };
  },
  methods: {
    accept(id) {
      const query = {
        query: `

            query{
              acceptQuestion(question_id: "${id}"){
                _id
              }
            }

        `,
      };
      axios.post(this.$apiPath, query, this.getHeaders()).then((res) => {
        if (res.data.data.acceptQuestion) {
          this.getData();
          this.$vToastify.success("Question Accepted");
        } else {
          this.$vToastify.error("There was an error performing that operation");
        }
      });
    },
    deny(id) {
      const query = {
        query: `

            query{
              denyQuestion(question_id: "${id}")
            }

        `,
      };
      axios.post(this.$apiPath, query, this.getHeaders()).then((res) => {
        console.log(res.data.data.denyQuestion);
        if (res.data.data.denyQuestion) {
          this.getData();
          this.$vToastify.success("Question Denied");
        } else {
          this.$vToastify.error("There was an error performing that operation");
        }
      });
    },
    getHeaders() {
      return {
        headers: {
          Authorization: "Bearer " + this.$store.state.auth.token,
        },
      };
    },
    getData() {
      this.loading = true;
      const query = {
        query: `
          query{
             nonAcceptedQ{
                text
                _id
                answer{
                  name
                }
              }
          }
        `,
      };

      axios.post(this.$apiPath, query, this.getHeaders()).then((res) => {
        if (res.data.data.nonAcceptedQ) {
          this.questions = res.data.data.nonAcceptedQ.map(function (q) {
            return {
              question: q.text,
              answer: q.answer.name,
              id: q._id,
            };
          });
          this.loading = false;
        }
      });
    },
  },
  created() {
    if (!this.$store.state.auth.user.isAdmin) {
      this.$vToastify.warning("Must be Admin!");
      this.$router.push("/");
    } else {
      this.getData();
    }
  },
};
</script>

<style scoped></style>
