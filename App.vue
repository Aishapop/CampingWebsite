<template>
  <div id="app" >
    
    <div v-if="user">
      
      <p>
        Welcome {{ user.username}}
      </p>
      
    </div>
    
    <NavBar></NavBar>
    <router-view />
    
    
    

  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    user() {
      return this.$store.getters.user;  // Access user from Vuex store
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
