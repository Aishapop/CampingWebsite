import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import UserPage from '../pages/UserPage.vue';
import CampingPage from '../pages/CampingPage.vue';


Vue.use(Router);

export default new Router({
  mode: 'history', // This removes the hash from the URL
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/camping',
      name: 'Camping',
      component: CampingPage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    
    {
      path: '/profile',
      name: 'Profile',
      component: UserPage,
      // beforeEnter: (to, from, next) =>{ 
      //   // Check if the user is logged in
      //   if (localStorage.getItem('user')) {
      //     next();
      //   } else {
      //     next('/login');
      //   }
      // }
    }
  ]
});
