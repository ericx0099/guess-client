<template>
  <div class="py-20 h-screen bg-gray-300 px-2">
    <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-md">
      <div class="md:flex">
        <div class="w-full p-3 px-6 py-10">
          <div class="text-center"> <span class="text-xl text-gray-700">Create a new Account!</span> </div>
          <div class="mt-4 relative"> <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Username</span> <input v-model="username" type="text" class="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-green-600"> </div>
          <div class="mt-4 relative"> <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Email</span> <input v-model="email" type="email" class="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-green-600"> </div>
          <div class="mt-4 relative"> <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Password</span> <input v-model="password" type="password" class="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-green-600"> </div>
          <div class="mt-4"> <button class="h-12 w-full bg-green-600 text-white rounded hover:bg-white-700">Register<i class="fa fa-long-arrow-right"></i></button> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data(){
    return{
      username: '',
      email: '',
      password: '',
    }
  }
}
</script>

<style scoped>

</style>
