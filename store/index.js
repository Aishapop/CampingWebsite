import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    bookings: [],
    campingSpots: [],
    reviews: [],
    users: [],

  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    setUsers(state, users) {
      state.users = users; // Corrected to handle array of users
    },
    clearUsers(state) {
      state.users = []; // Clear the array, not the individual user
    },
    setBookings(state, bookings) {
      state.bookings = bookings;
    },
    clearBookings(state) {
      state.bookings = [];
    },
    setCampingSpots(state, spots) {
      state.campingSpots = spots;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    setReviews(state, reviews) {
      state.reviews = reviews;
    },
    clearReviews(state) {
      state.reviews = [];
    },
    addBooking(state, booking) {
      state.bookings.push(booking);
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    clearUser({ commit }) {
      commit('clearUser');
    },
    fetchBookings({ commit }, userId) {
      fetch(`https://localhost:7157/api/Booking/getbookingbyUserid${userId}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch');
          return response.json();
        })
        .then(bookings => commit('setBookings', bookings))
        .catch(error => {
          console.error('Error fetching bookings:', error);
          commit('clearBookings');
        });
    },
    async fetchCampingSpots({ commit }) {
      try {
          const response = await fetch('https://localhost:7157/api/Campingspot');
          if (!response.ok) {
              throw new Error('Failed to fetch camping spots');
          }
          const spots = await response.json();
          commit('setCampingSpots', spots);
      } catch (error) {
          console.error('Error fetching camping spots:', error);
      }
  },
    async login({ commit }, { email, password }) {
    try {
        const response = await fetch('https://localhost:7157/api/User/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        if (result.success) {
            commit('setUser', result.user);
            commit('setErrorMessage', '');
            return true; // Indicate success
        } else {
            commit('clearUser');
            commit('setErrorMessage', result.message || 'Login failed');
            return false; // Indicate failure
        }
    } catch (error) {
        console.error('Error during login:', error);
        commit('clearUser');
        commit('setErrorMessage', 'Login failed due to network error');
        return false; // Indicate failure
    }
  },
  fetchUsers({ commit }) {
    fetch('https://localhost:7157/api/User')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load users');
        return response.json();
      })
      .then(users => {
        console.log('Fetched users:'); // Log fetched data
        commit('setUsers', users);
      })
      .catch(error => {
        console.error('Failed to fetch users', error);
        commit('clearUsers');
      });
  },
  async fetchReviews({ commit }) {
    try {
      const response = await fetch('https://localhost:7157/api/Review');
      if (!response.ok) {
          throw new Error('Failed to fetch reviews');
      }
      
      const reviews = await response.json();
      
      commit('setReviews', reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      commit('clearReviews');
    }
  },
  async addBooking({ commit }, bookingData) {
    try {
      const response = await fetch('https://localhost:7157/api/Booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const result = await response.json();
      if (response.ok) {
        commit('addBooking', result); // Assuming you have a mutation to add booking to state
      } else {
        throw new Error(result.message || 'Failed to add booking');
      }
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  },
  async updateUser({ commit }, userData) {
    try {
      const response = await fetch(`https://localhost:7157/api/User/${userData.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const updatedUser = await response.json();
      commit('setUser', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      commit('setErrorMessage', 'Failed to update user');
    }
  },

  async addCampingspot({ commit }, campingSpotsData) {
    try {
      const response = await fetch('https://localhost:7157/api/Campingspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campingSpotsData)
      });
      const result = await response.json();
      if (response.ok) {
        commit('addCampingspot', result); // Assuming you have a mutation to add booking to state
      } else {
        throw new Error(result.message || 'Failed to add campingspot');
      }
    } catch (error) {
      console.error('Error adding campingspot:', error);
    }
  },
  async deleteBooking({ commit }, { userId, bookingId }) {
    try {
      const response = await fetch(`https://localhost:7157/api/Booking/${userId}/${bookingId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
      commit('removeBooking', bookingId);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  },

  
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    user(state) {
      return state.user;
    },
    // 
    users(state) {
      return state.users;
    },
    bookings(state) {
      return state.bookings;
    },
    campingSpots(state){
      return state.campingSpots
    },
    reviews(state) {
      return state.reviews;
    },
    errorMessage(state) {
      return state.errorMessage;
  }
  }
});
