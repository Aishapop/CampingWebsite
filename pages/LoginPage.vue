<template>
  <div class="min-h-screen flex items-center justify-center w-[500px] ml-[35%]">
    <transition name="fade">
      <div v-if="showForm" class="bg-gray-100 py-8 px-4 shadow rounded-lg max-w-sm w-full mt-20 p-[50%]">
        <div class="text-center mb-16">
          <img
            class="mx-auto h-10 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Workflow"
          />
          <h2 class="mt-6 text-2xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email address</label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div class="mt-4">
            <label for="password" class="block text-sm font-medium leading-5 text-gray-700">Password</label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <div class="text-sm leading-5">
              <!-- <a href="#" class="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Forgot your password?
              </a> -->
            </div>
          </div>
          <p v-if="errorMessage1 != ''" class="text-red-500 text-xs italic mt-2">{{ errorMessage1 }}</p>
          <div class="mt-6">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showForm: false,
      errorMessage1: ""
    };
  },
  computed: {
    errorMessage() {
      return this.$store.getters.errorMessage;
    }
  },
  mounted() {
    setTimeout(() => {
      this.showForm = true;
    }, 100);
  },
  methods: {
    async login() {
      const success = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      });
      if (success) {
        this.$router.push('/Camping');
      }
      else{
          this.errorMessage1 = "Wrong Password or Email"
          this.password = ""
          this.email = ""
    
      }
      
    }
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>