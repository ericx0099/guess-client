<template>
  <div style="height: 100%">
    <join v-if="joining"></join>
    <create-game v-if="creating"></create-game>
  </div>
</template>

<script>
import io from "socket.io-client";
import Join from "../components/join";
import createGame from "../components/createGame";
var socket = io.connect("http://localhost:3333");
export default {
  name: "Play",
  components: {
    Join,
    createGame,
  },
  data() {
    return {
      data: "",
      joining: true,
      creating: false,
      game_token: null
    };
  },
  created() {
    if (!this.$store.state.auth.user) {
      this.$vToastify.warning("Must be Logged in!");
      this.$router.push("/login");
    }
    this.test();
  },
  methods: {
    test() {
      socket.on("test", (fetchedData) => {
        console.log(fetchedData);
      });
    },
  },
};
</script>

<style scoped></style>
