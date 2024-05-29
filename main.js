// src/main.js
import Vue from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import router from './router'; // Import Tailwind CSS
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router, // Use the router
  store,  // Add the store here. This is required to use Vuex.
  render: h => h(App),
}).$mount('#app');

