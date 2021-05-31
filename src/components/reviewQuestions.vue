<template>
  <div></div>
</template>

<script>
export default {
  name: "reviewQuestions",
  created(){
    if(!this.$store.state.auth.user.isAdmin){
      this.$vToastify.warning("Must be Admin!");
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
