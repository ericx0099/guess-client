<template>
  <div>
    <div v-if="$store.state.auth.user">
      <div v-if="$store.state.auth.user.isAdmin">
        <div class="row" style="display: flex; justify-content: center" >
          <div class="col-md-3 bg-success mt-5">
            <add-country ></add-country>
          </div>
        </div>

      </div>
      <div v-else>
        <h1 class="text-center">Unauthenticated</h1>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center">First, do Login!</h1>
    </div>
  </div>

</template>

<script>
import addCountry from "../components/addCountry";
export default {
  name: "Country",
  components: {
    addCountry
  }
}
</script>

<style scoped>

</style>
