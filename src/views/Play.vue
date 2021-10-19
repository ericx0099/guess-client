<template>
  <div style="height: 100%" padless>
    <join v-if="joining"></join>
    <create-game v-if="creating"></create-game>
    <div v-if="waiting_lobby" class="mt-15">
      <v-row class="d-flex justify-center">
        <v-col cols="9">
          <v-row class="d-flex justify-center">
            <v-col cols="6">
              <p class="text-center display-2">
                Game Code:
                <span class="font-weight-black">{{ game_token }}</span>
              </p>
              <div class="d-flex justify-center">
                <v-btn
                  rounded
                  color="primary"
                  dark
                  v-if="creator_id == $store.state.auth.user._id"
                  @click="startGame"
                >
                  Start game!
                  <v-icon>mdi-play-circle</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="6">
              <game-players :players="players"></game-players>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <question-round v-if="rounds" :question="question"></question-round>
    <game-ended v-if="game_ended" :players="players"></game-ended>
  </div>
</template>

<script>
import io from "socket.io-client";
import Join from "../components/join";
import createGame from "../components/createGame";
import gamePlayers from "../components/gamePlayers";
import questionRound from "../components/questionRound";
import gameEnded from "../components/gameEnded";
var socket = io.connect("http://localhost:3333");
export default {
  name: "Play",
  components: {
    Join,
    createGame,
    gamePlayers,
    questionRound,
    gameEnded,
  },
  data() {
    return {
      data: "",
      joining: true,
      creating: false,
      game_token: null,
      waiting_lobby: false,
      players: [],
      creator_id: null,
      rounds: false,
      question: null,
      next_question: null,
      progressbar_color: "light-blue",
      progressbar_color_response: "",
      timebar_value: 0,
      game_ended: false,
      game_ended_prev: false,
    };
  },
  created() {
    if (!this.$store.state.auth.user) {
      this.$vToastify.warning("Must be Logged in!");
      this.$router.push("/login");
    }
    this.socket();
    this.gameToken();
  },
  methods: {
    gameToken() {
      if (this.$cookies.get("game-token")) {
        this.join_game_cookie(this.$cookies.get("game-token"));
        this.game_token = this.$cookies.get("game-token");
      }
    },
    checkGameToken() {
      if (!this.$cookies.get("game-token")) {
        this.$cookies.set("game-token", this.game_token, "1h");
      }
    },
    socket() {
      socket.on("new_player", (data) => {
        this.creator_id = data.creator._id;
        this.waiting_lobby = true;
        this.creating = false;
        this.joining = false;
        this.players = data.users;
        this.checkGameToken();
      });
      socket.on("new_question", (data) => {
        this.waiting_lobby = false;
        this.creating = false;
        this.joining = false;
        this.rounds = true;
        if (data.countries.length === 0) {
          this.$cookies.remove("game-token");
          this.game_ended_prev = true;
          this.players = data.players;
        } else {
          if (data.game_round == 1) {
            this.question = data;
          } else {
            this.next_question = data;
          }
        }
      });
      socket.on("answer-response", (data) => {
        if (data == "2") {
          this.progressbar_color_response = "light-green";
        } else {
          this.progressbar_color_response = "red";
        }
      });
      socket.on("user-kicked", (data) => {
        this.players = data;
      });
      socket.on("uniq_self_kick", () => {
        this.$cookies.remove("game-token");
        this.$vToastify.info("Host kicked you from the lobby");
        this.$router.push("/");
        socket.disconnect();
      });
      socket.on("error", (data) => {
        this.$vToastify.error(data);
      });
    },
    next() {
      this.question = this.next_question;
      this.progressbar_color = "light-blue";
      this.timebar_value = 0;
    },
    join_game() {
      socket.emit("join-game", {
        user_id: this.$store.state.auth.user._id,
        game_token: this.game_token,
      });
    },
    join_game_cookie(token) {
      console.log("join game cookie token=>" + token);
      setTimeout(() => {
        socket.emit("join-game", {
          user_id: this.$store.state.auth.user._id,
          game_token: token,
        });
      }, 200);
    },
    startGame() {
      socket.emit("start-game", {
        user_id: this.$store.state.auth.user._id,
        game_token: this.game_token,
      });
    },
    submitAnswer(id, time) {
      socket.emit("submit-answer", {
        answer: id,
        question: this.question.question_id,
        userId: this.$store.state.auth.user._id,
        game_token: this.game_token,
        time: time,
      });
      setTimeout(() => {
        socket.emit("get-question", {
          game_token: this.game_token,
          userId: this.$store.state.auth.user._id,
        });
      }, 999);
    },
    getQuestion() {
      socket.emit("get-question", {
        game_token: this.game_token,
        userId: this.$store.state.auth.user._id,
      });
    },
    kickUser(id) {
      socket.emit("kick-user", {
        game_token: this.game_token,
        userId: id,
      });
    },
  },
};
</script>

<style scoped></style>
