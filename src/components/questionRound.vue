<template>
  <div>
    <v-progress-linear
      :value="$parent.timebar_value"
      height="25"
      :color="$parent.progressbar_color"
      striped
    >
      <strong>{{ 10 - $parent.timebar_value / 10 }}</strong>
    </v-progress-linear>
    <div class="mt-15 text-center d-flex justify-center">
      <v-row class="d-flex justify-center">
        <v-col cols="6" sm="12" xs="12">
          <span class="display-1 font-weight-black">{{
            question.question_text
          }}</span>
        </v-col>
      </v-row>
    </div>

    <v-container>
      <v-row no-gutters>
        <v-col sm="12" xs="12" md="4">
          <div class="text-center" style="width: 100%">
            <span class="font-weight-black display-2"
              >{{ question.game_round }}/{{ question.game_rounds }}</span
            >
          </div>
        </v-col>
        <v-col sm="12" xs="12" md="4" class="d-flex justify-center">
          <div class="d-flex justify-center mt-15">
            <v-card class="pa-8 mt-10 d-flex justify-center">
              <v-row>
                <v-col
                  md="6"
                  v-for="(country, index) in question.countries"
                  :key="country._id"
                  class="d-flex justify-center"
                >
                  <v-btn
                    :color="colors[index]"
                    outlined
                    @click="answer(country._id)"
                    class="buttonz"
                  >
                    {{ country.name }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <div v-if="waiting_players" class="text-center mt-5 pa-5">
            <h1 class="display-1 font-weight-black demo" :id="id">{{ txt }}</h1>
            <v-progress-linear
              indeterminate
              color="cyan darken-2"
              class="mt-5"
            ></v-progress-linear>
          </div>
        </v-col>
        <v-col sm="12" md="4" xs="12">
          <player-points :players="question.players"></player-points>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import playerPoints from "./playerPoints";
export default {
  name: "questionRound",
  components: {
    playerPoints,
  },
  props: {
    question: Object,
  },
  data() {
    return {
      colors: ["red", "orange", "green", "blue"],
      waiting_players: false,
      id: "demo",
      txt: "Waiting for players..",
      hasAnswered: false,
    };
  },
  created() {
    this.$parent.progressbar_color = "light-blue";
  },
  mounted() {
    this.timebar();
  },
  watch: {
    question: function () {
      this.timebar();
      this.hasAnswered = false;
      this.enableButtons();
    },
  },
  methods: {
    answer(id) {
      this.disableButtons();
      this.$parent.submitAnswer(id, this.$parent.timebar_value);
      this.hasAnswered = true;
    },
    enableButtons() {
      let buttons = document.getElementsByClassName("buttonz");
      buttons.forEach(function (b) {
        b.setAttribute("disabled", false);
      });
    },
    disableButtons() {
      let buttons = document.getElementsByClassName("buttonz");
      buttons.forEach(function (b) {
        b.setAttribute("disabled", true);
      });
    },
    stateChange() {
      setTimeout(() => {
        this.$parent.next();
      }, 3500);
    },
    timebar() {
      const limitedInterval = setInterval(() => {
        if (this.$parent.timebar_value == 100) {
          clearInterval(limitedInterval);
          if (!this.hasAnswered) {
            this.$parent.submitAnswer("60aeb08e4ebd2a1b9bf7d779", 110);
            this.$parent.progressbar_color = "red";
            this.stateChange();
            setTimeout(() => {
              if (this.$parent.game_ended_prev) {
                console.log("lo2l");
                this.$parent.rounds = false;
                this.$parent.game_ended = true;
              } else {
                console.log("lul43");
              }
            }, 2000);
          } else {
            this.$parent.progressbar_color =
              this.$parent.progressbar_color_response;
            this.stateChange();
            setTimeout(() => {
              if (this.$parent.game_ended_prev) {
                this.$parent.rounds = false;
                this.$parent.game_ended = true;
              }
            }, 900);
          }
          /*   if (this.$parent.game_ended_prev) {
               setTimeout(() => {
                 this.$parent.rounds = false;
                 this.$parent.game_ended = true;
               }, 2000);
             } else {
               if (!this.hasAnswered) {
                 this.$parent.submitAnswer("60aeb08e4ebd2a1b9bf7d779", 110);
                 this.$parent.progressbar_color = "red";
                 this.stateChange();
               } else {
                 this.$parent.progressbar_color =
                   this.$parent.progressbar_color_response;
                 this.stateChange();
               }
             }*/
        } else {
          this.$parent.timebar_value = this.$parent.timebar_value + 10;
        }
      }, 1000);
    },
    typeWriter() {
      let txt = "Waiting for players..";
      var i = 0;
      var speed = 50;
      if (i < txt.length) {
        let demo = document.getElementsByClassName("demo")[0];
        demo.innerHTML += txt.charAt(i);
        i++;
        setTimeout(this.typeWriter(), speed);
      }
    },
  },
};
</script>

<style scoped>
/*.v-card {
  background-color: #ffffff !important;

  border-left: 5px solid red !important;
}*/
</style>
