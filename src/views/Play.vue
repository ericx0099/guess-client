<template>
  <div style="height: 100%" padless>
    <join v-if="joining"></join>
    <create-game v-if="creating"></create-game>
    <div v-if="waiting_lobby" class="mt-15">
      <v-row class="d-flex justify-center">
        <v-col cols="9">
          <v-row class="d-flex justify-center">
            <v-col
                cols="6"
            >
              <p class="text-center display-2">Game Code: <span class="font-weight-black">{{game_token}}</span></p>
              <div class="d-flex justify-center">
                <v-btn
                    rounded
                    color="primary"
                    dark
                    v-if="creator_id == $store.state.auth.user._id "
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
  </div>
</template>

<script>
import io from "socket.io-client";
import Join from "../components/join";
import createGame from "../components/createGame";
import gamePlayers from "../components/gamePlayers";
import questionRound from "../components/questionRound";
var socket = io.connect("http://localhost:3333");
export default {
  name: "Play",
  components: {
    Join,
    createGame,
    gamePlayers,
    questionRound
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
      rounds : false,
      question: null
    };
  },
  created() {
    if (!this.$store.state.auth.user) {
      this.$vToastify.warning("Must be Logged in!");
      this.$router.push("/login");
    }
    this.socket();
  },
  methods: {
    socket() {
      socket.on('new_player', (data) => {
        this.creator_id = data.creator._id
        this.waiting_lobby = true;
        this.creating = false;
        this.joining = false;
        this.players = data.users
      });
      socket.on('new_question', (data) => {
        this.waiting_lobby = false;
        this.creating = false
        this.joining = false;
        this.rounds = true;
        this.question = data
        console.log(data);
      })
      socket.on('error', (data) => {
        this.$vToastify.error(data);
      });

    },
    join_game(){
      socket.emit("join-game", {user_id: this.$store.state.auth.user._id, game_token: this.game_token})
    },
    startGame(){
      socket.emit("start-game", {user_id: this.$store.state.auth.user._id, game_token: this.game_token})
    }
  },
};
</script>

<style scoped></style>
