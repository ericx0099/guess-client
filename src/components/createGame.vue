<template>
  <div class="fill-height">
    <v-row class="d-flex justify-center">
      <v-col cols="7" class="mt-15">
        <div class="d-flex justify-center">
          <p
            class="
              display-3
              text--primary
              font-weight-black
              text-center
              mx-auto mx-3
              align-center
            "
          >
            Countryz!
          </p>
        </div>
        <div class="mt-15">
          <v-card class="mx-auto mt-15" max-width="344">
            <v-card-text>
              <v-btn
                :loading="loading"
                color="deep-purple"
                dark
                large
                width="100%"
                @click="createGame"
              >
                Create new Game!
              </v-btn>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <div class="mt-15 text-center subtitle-1 text--primary">
      <p>
        Join a Countryz game for FREE
        <span
          class="subtitle-1 text-decoration-underline"
          style="cursor: pointer"
          @click="
            $parent.creating = false;
            $parent.joining = true;
          "
          >here</span
        >
      </p>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#5000ca"
        fill-opacity="1"
        d="M0,64L20,58.7C40,53,80,43,120,48C160,53,200,75,240,117.3C280,160,320,224,360,256C400,288,440,288,480,272C520,256,560,224,600,186.7C640,149,680,107,720,112C760,117,800,171,840,208C880,245,920,267,960,272C1000,277,1040,267,1080,234.7C1120,203,1160,149,1200,122.7C1240,96,1280,96,1320,122.7C1360,149,1400,203,1420,229.3L1440,256L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "createGame",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    createGame() {
      const mutation = {
        query: `
          mutation{
            createGame{
              uniq_token
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
          if (res.data.data.createGame.uniq_token) {
            this.$parent.game_token = res.data.data.createGame.uniq_token;
            this.$cookies.set(
              "game-token",
              res.data.data.createGame.uniq_token,
              "1h"
            );
            this.$parent.waiting_lobby = true;
            this.$parent.creating = false;
            this.$parent.joining = false;
            this.$parent.join_game();
          } else {
            this.$vToastify.error("Something went wrong!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 1000);

      this.loader = null;
    },
  },
};
</script>

<style scoped></style>
