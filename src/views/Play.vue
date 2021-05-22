<template>
  <div>
    <join-or-create></join-or-create>
  </div>
</template>

<script>
import io from "socket.io-client";
import joinOrCreate from "../components/joinOrCreate";
var socket = io.connect("http://localhost:3333");
export default {
  name: "Play",
  components: {
    joinOrCreate
  },
  data() {
    return {
      data: ''
    }
  },
  created(){
    this.test();
  },
  methods: {
    test(){
      socket.on("test", fetchedData => {
        console.log(fetchedData);
      })
    }
  }
}
</script>

<style scoped>

</style>
