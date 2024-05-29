<template>
  
  <div>
    
    <div class="flex flex-wrap justify-center">
      <div class="mt-[5%]  h-[100px] w-full"><div class="flex flex-wrap items-start justify-center p-5 py-10">
        <div v-if="!ratedSpots" @click="ratedSpotsToggle" class="  relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-gray-900 text-gray-900 bg-gray-200 dark:bg-gray-400 dark:text-gray-200 ">
            <span class="text-sm">Rated Spots</span>
        </div>
        <div v-if="ratedSpots" @click="ratedSpotsToggle" class=" relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base  group md:px-4 hover:ring  hover:ring hover:ring-blue-900 text-white-900 bg-blue-900 dark:bg-blue-900 dark:text-white border-2 shadow-lg" >
          <span class="text-sm font-bold">Rated Spots</span>
      </div>
        <div v-if="!sortedByprice" @click="priceSortedToggle" class=" relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-gray-900 text-gray-900 bg-gray-200 dark:bg-gray-400 dark:text-white " >
            <span class="text-sm">Best Price</span>
        </div>
        <div v-if="sortedByprice" @click="priceSortedToggle" class=" relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-blue-900 text-white-900 bg-blue-900 dark:bg-blue-900 dark:text-white border-2 shadow-lg " >
          <span class="text-sm font-bold">Best Price</span>
      </div>
        <!-- <a class=" relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-violet-600 text-gray-900 bg-gray-200 dark:bg-gray-400 dark:text-gray-200 ">
            <span class="text-sm">Best rated</span>
        </a> -->
        
        
        
    </div></div>
      <transition-group name="fade" tag="div" class="flex flex-wrap justify-center w-full">
        
        <div 
         
          v-for="(campingSpot, index) in filteredSpots"
          :key="index"
          
          class="bg-gray-100 rounded-lg shadow-lg overflow-hidden max-w-lg w-full mx-4 my-4 mt-10p hover:bg-gray-300 p-6 shadow-lg rounded-lg bg-white shadow-blue-900/50"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
        
          <div class="p-8 mt-10p">
            <img src="../assets/camping-kampcilik-nedir.jpg" alt="Nature Image" class="rounded-l pb-8" />
            <h2 class="text-2xl font-bold text-gray-800 mb-2 ">{{ campingSpot.name }}</h2>
            <p class="text-gray-700 leading-tight mb-4">{{ campingSpot.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-gray-800 font-semibold">Location: {{ campingSpot.location }}</span>
              <span class="text-gray-800 font-semibold">Price: ${{ campingSpot.price }}</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span v-if="campingSpot.availability === 1" class="text-gray-800">Available</span>
              <span v-else-if="campingSpot.availability === 0" class="text-red">Not Available</span>
            </div>
            <button
              v-if="campingSpot.availability === 1"
              @click="scrollToDiv(campingSpot.spotID,user)"
              class="bg-gray-600 rounded-full w-10 h-10 text-white font-semibold hover:bg-gray-700"
            >
              <div class="flex gap-3 justify-center items-center">
                <img src="../assets/add.png" alt="Add Icon" class="w-1/2 rounded-l mr-[9%]" />
              </div>
            </button>
            
            
          </div>
          
          
        </div>
      </transition-group>
      
      <!-- Booking -->
      <div class="w-full bg-green-800" ref="scrollTarget">
        <div class="flex items-start">
        <div v-if="UserWantsBooking" class="h-[500px] p-20p w-[50%] ">
          <h1
              class=" pr-5 text-5xl text-white font-bold pt-10">
              Booking
            </h1>
          
          <div class="date-picker-container w-[60%] mt-10p ml-[5%] ">
            <div class="inputs-container">
              <div class="input-group">
                <label for="datepicker">Select Date:</label>
                <datepicker id="datepicker" v-model="pickedDate"></datepicker>
              </div>
              
              <div class="input-group">
                <label for="duration">Duration (Days):</label>
                <input id="duration" type="number" v-model="duration" min="1" max="30" placeholder="Enter duration">
                <p v-if="duration > 30">Duration cannot exceed 30.</p>
              </div>
              
              <button class="submit-button" @click="submitDate(formattedDate,duration,user)">Submit Date</button>
            </div>
          </div>
        </div>
        
        <div v-if="UserWantsBooking" class=" bg-green-900 p-10 h-[500px] p-20p w-[50%]">
          <h1
              class=" text-2xl text-white font-bold break-words mt-10 ml-[20%] w-[55%] text-white-800 bg-green-800 px-1 relative mb-10">
              Thank you for booking your camping spot with us!
            </h1>
          <ul  class="flex flex-col gap-3">
            <li class="text-white">
                <span class="inline-block mt-0 rounded-lg font-medium text-white-800 bg-green-800 px-1 relative">We're thrilled to have you join our community of outdoor enthusiasts.</span>
                Your adventure is just around the corner,and we can't wait to see what memorable stories you'll come back with
                
            </li>
            <li class="text-white">you are an Remember, as the great outdoors philosopher once said,
                <span class="inline-block mt-0 rounded-lg font-medium text-white-800 bg-green-800 px-1 relative">"Camping is nature's way of promoting the motel industry." </span>
                 See you under the stars!
                
            </li>
            <li class="text-white">you have
                <span class="inline-block mt-0 rounded-lg font-medium text-white-800 bg-green-800 px-1 relative">Happy camping!</span>
                like
                
            </li>
        </ul>
          
            
            
          
        </div>
      
        
      </div>
        
      </div>
      <!-- Comments Section -->
      <div class="bg-blue-900 w-full pb-10" >
        <div class="w-[70%] bg-white rounded-lg border p-5 mr-[15%] ml-[15%] mt-[5%] overflow-y-auto h-[specific height] h-[70%]">
          <h3 class="font-bold">Discussion</h3>
          <form>
            <div class="flex flex-col">
              <div class="w-full px-3 my-2">
                
              </div>
              
             
              <div v-for="(review, index) in reviews" :key="index" class="border rounded-md p-3 ml-3 my-3 p-4">
                <h3 class="font-bold">{{ findSpot(review.spotID).name }}</h3>
                <div class="flex gap-3 items-center">
                  <img src="../assets/user.png" class="object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400">
                  <h3 class="font-bold">{{ findUser(review.userID).username }}</h3>
                </div>

                <p class="text-gray-600 mt-2">
                  {{ review.comment }}
                </p>
                <div class="flex items-center">
                <img v-for="n in review.rating" :key="n" src="../assets/star.png" class="w-[5%] m-2 ">
              </div>

            </div>

        </div>

        
    </form>


  </div>
  </div>
  </div>
  </div>
</template>


  
<script>
import Datepicker from 'vuejs-datepicker';
import { format } from 'date-fns';


export default {
  components: {
    Datepicker,
    
  },
  computed: {
    campingSpots() {
      // Get camping spots from store and append showDatePicker dynamically
      return this.$store.getters.campingSpots.map(spot => ({
        ...spot,
        showDatePicker: false
      }));
    },
    reviews(){
      return this.$store.getters.reviews;
    },
    users() {
      if(this.$store.getters.users.role === 'user'){
        this.isOwner === false
      }
      return this.$store.getters.users;
    },
    user() {
    return this.$store.getters.user;  
    },
    formattedDate() {
      return format(this.pickedDate, 'yyyy-MM-dd');
    },
    bestRatedCampingSpots() {
      const ratings = this.reviews.reduce((acc, review) => {
        acc[review.SpotID] = acc[review.SpotID] || { total: 0, count: 0 };
        acc[review.SpotID].total += review.Rating;
        acc[review.SpotID].count++;
        return acc;
      }, {});
      const averages = Object.keys(ratings).map(spotID => ({
        spotID,
        averageRating: ratings[spotID].total / ratings[spotID].count
      }));
      const maxRating = Math.max(...averages.map(r => r.averageRating));
      return this.campingSpots.filter(spot => 
        averages.some(r => r.spotID === spot.spotID && r.averageRating === maxRating)
      );
    },
    mostRecentlyReviewedSpots() {
    const sortedReviews = [...this.reviews].sort((a, b) => new Date(b.DatePosted) - new Date(a.DatePosted));
    console.log("sortedReviews",sortedReviews)
    const uniqueSpotIDs = Array.from(new Set(sortedReviews.map(r => r.spotID)));   
    
    return uniqueSpotIDs.map(id => this.campingSpots.find(spot => spot.spotID === id));
    },
    mostReviewedSpots() {
      const reviewCounts = this.reviews.reduce((acc, review) => {
        acc[review.SpotID] = (acc[review.SpotID] || 0) + 1;
        return acc;
      }, {});
      return [...this.campingSpots].sort((a, b) => (reviewCounts[b.spotID] || 0) - (reviewCounts[a.spotID] || 0));
    },
    filteredSpots() {
      if(this.ratedSpots){
        return this.mostRecentlyReviewedSpots
      }
      else if(this.sortedByprice){
        return this.sortCampingSpotsByPrice(this.campingSpots)
      }
      else{
        return this.campingSpots
      }
    },
    

    
    

    
  },
  data() {
    return {
      pickedDate: null,
      duration: null,
      campingSpot: null,
      isOwner: true,
      reviewSpot: '',
      review: '',
      
      UserWantsBooking: false,
      bookingData: {
        spotID: 0,
        userID: 0,
        bookingDate: '',
        duration: 1
      },
      ratedSpots: false,
      sortedByprice: false,
      Bestrated: false

    };
  },
  methods: {
    toggleDatePicker(spot) {
      // Toggle visibility of the date picker for a specific camping spot
      spot.showDatePicker = !spot.showDatePicker;
    },
    scrollToDiv(spotId,user) {
      if(user != null){
        this.$refs.scrollTarget.scrollIntoView({ behavior: 'smooth' });
        this.UserWantsBooking = true,
        this.spotID = spotId
        this.userID = user.userId
      }
      
      else{
        alert("Please log in before making a booking")
        this.$router.push('/Login');
      }

 
    },
    ratedSpotsToggle(){
      this.ratedSpots = !this.ratedSpots;


    },
    chosenreview(spot){
      this.reviewSpot = spot
    },
    priceSortedToggle(){
      this.sortedByprice = !this.sortedByprice
    },
    
    sortCampingSpotsByPrice(campingSpots) {
    return campingSpots.sort((a, b) => a.price - b.price);
  },

    
    findUser(userID) {
      return this.users.find(user => user.userId === userID) || { username: 'Unknown User' };
    },
    findSpot(spotID) {
    return this.campingSpots.find(spot => spot.spotID === spotID);
  },
    submitDate(bookingdate,Duration) {
      
      if(this.user.role != 'owner'){
        this.bookingData.spotID = this.spotID
        this.bookingData.userID = this.userID
        this.bookingData.bookingDate = bookingdate
        this.bookingData.duration = Duration
        
        
        this.$store.dispatch('addBooking', this.bookingData);
        this.UserWantsBooking = true
        this.$router.push('/Profile');
        alert("Booking succesfull")

        console.log(this.bookingData)
      }
      else{
        alert("As the owner, you are not permitted to make a booking")
      }
      
      
    }
  },
  created() {
    this.$store.dispatch('fetchCampingSpots');
    this.$store.dispatch('fetchReviews');
    this.$store.dispatch('fetchUsers');
  }
};
</script>
  <style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  .date-picker-container {
    padding: 20px;
    background-color: #f4f4f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .inputs-container {
    margin-top: 20px;
  }
  
  .input-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input, .submit-button, .toggle-button {
    width: 100%;
    padding: 10px;
    margin-top: 2px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-button, .toggle-button {
    background-color: #005c1f;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  
  .submit-button:hover, .toggle-button:hover {
    background-color: #4a4b4b;
  }

  .review-container {
    padding: 20px;
    background-color: #f4f4f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px; /* Adjust width as necessary */
  }
  
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #0056b3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #004494;
  }
  
  .reviews-display {
    margin-top: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
 
  
  
  </style>