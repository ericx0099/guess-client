<template>
  <div>XD</div>
</template>

<script>
import io from "socket.io-client";
var socket = io.connect("http://localhost:3333");
export default {
  name: "Play",
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
