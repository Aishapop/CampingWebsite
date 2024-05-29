<template>
  <nav id="nav" class="absolute border bg-white border-gray-200 border-opacity-10 shadow-lg shadow-gray-900/40 w-2/5 h-14 mx-auto rounded-lg opacity-100 transition-all duration-1000 pt-2 ml-30p mt-10">
    <ul class="flex justify-around h-full items-center">
      <li>
        <router-link to="/" class="text-gray-800 hover:text-gray-600">Home</router-link>
      </li>
      <li>
        <router-link to="/Camping" class="text-gray-800 hover:text-gray-600">Camping</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/Login" class="text-gray-800 hover:text-gray-600">Login</router-link>
      </li>
      <li v-if="isAuthenticated">
        <router-link to="/Profile" class="text-gray-800 hover:text-gray-600">Profile</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
