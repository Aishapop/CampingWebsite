<template>
  <div class="min-h-screen flex items-center justify-center p-6 ">
    
      <div class="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden border-2 border-gray-500 mt-[5%]">
        
        <div  class="md:flex">
          <div  class="w-full md:w-1/3">
            <div class="w-full h-full bg-white flex items-center justify-center">
              <div v-if="edit===false" class="text-center">
                
                <img class="h-32 w-32 rounded-full border-4 border-gray-300 mx-auto" src="../assets/user.png" alt="Profile photo">
                <h1 class="text-gray-700 text-xl md:text-2xl font-bold mt-2">{{ this.user.username }}</h1>
                <p class="hidden md:block text-gray-700 mt-1">{{ this.user.email }}</p>
                
                
              </div>
              <div v-if="edit===true" class="text-center">
                
                <img class="h-32 w-32 rounded-full border-4 border-gray-300 mx-auto" src="../assets/user.png" alt="Profile photo">
                
                <input class="text-gray-700 text-xl md:text font-bold mt-2 ml-20p w-20p h-[40px]" :placeholder=user.username v-model="username">
                
                <input class="text-gray-700 text-xl md:text font-bold mt-2 ml-20p w-20p h-[40px]" :placeholder=user.email v-model="email">
                
                
                  <div >
                  <button @click="cancelEdit" class="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-[3%]  h-[5%] mt-10p w-[130px] "> 
                    cancel edit 
                  </button>
                  </div>
                  <div>
                  <button @click="updateUserComfirmed" class="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-[2%]  h-[5%] mt-[5%] w-[100px]  "> 
                    comfirm               
                  </button>
                  </div>
                
              </div>
              
            </div>
           
          </div>
          <div class="w-full md:w-2/3 p-4 md:p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Profile 
              <button v-if="edit === false" @click="setEdit" class="bg-purple-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-[3%] w-[15%] h-[5%]  ">
                Edit 

              </button>
              
            </div>
            <div class="mt-4">
              <button @click="logout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[30%] h-[10%]">Log Out</button>
              <button v-if="user.role=== 'user'" @click="newBooking" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 w-[30%] h-[10%] ">New Booking</button>
              <button v-if="user.role === 'owner'" @click="newCampingSpots" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 w-[40%] h-[10%] ">New CampingSpots</button>
              
            </div>
            
          </div>
        </div>
        <div v-if="user.role === 'owner' && makeNewSpot === true">
          <div class="bg-white border border-4 rounded-lg shadow relative m-10">
  
            <div class="flex items-start justify-between p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold">
                    Add new CampingSpot
                </h3>
                <button type="button" @click="closenewCampingSpots" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        
            <div class="p-6 space-y-6">
                <form action="#">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="product-name" class="text-sm font-medium text-gray-900 block mb-2">Spot Name</label>
                            <input type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="View Campground" required v-model="spotName">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Location</label>
                            <input type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Forest Lake"  required v-model="location">
                        </div>
                        
                        <div class="col-span-6 sm:col-span-3">
                            <label for="price" class="text-sm font-medium text-gray-900 block mb-2">Price</label>
                            <input step="0.01" type="number" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$100" v-model.number="price" required>
                        </div>
                        <div class="col-span-full">
                            <label for="product-details" class="text-sm font-medium text-gray-900 block mb-2">Description</label>
                            <textarea id="product-details" rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" v-model="description" placeholder="Details"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        
            <div class="p-6 border-t border-gray-200 rounded-b">
                <button @click="addSpot" class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save all</button>
            </div>
        
        </div>
        </div>
        <div v-if="user.role ==='user'" class=""><h2 class="font-bold text-gray-800 ">Bookings</h2></div>
        <div v-if="user.role ==='owner'" class=""><h1 class="font-bold text-gray-800  ">CampingSpots</h1></div>
        <div 
          v-for="(bookinspot, index) in bookingsWithSpots"
          :key ="index"
          class=" bg-gray-200">
          
          <div class="text-align-left bg-gray-200 w- hover:bg-gray-400 h-[20%]">
            <p class=" bg-gray-200 hover:bg-gray-400">{{bookinspot.spotName}} {{formatDate(bookinspot.bookingDate)}} {{bookinspot.duration}} Days<button @click="cancelBooking(bookinspot.bookingID, bookinspot.bookingDate)" class="bg-gray-500 hover:bg-blue-700 text-white font-bold rounded ml-[40%] w-[20%] h-[10%] m-5">Cancel Booking</button></p>
            
            
          </div>
          
          
        </div>
        <div 
          v-for="(cspot, index) in spot"
          :key ="index"
          class=" bg-gray-200">
          
          <div v-if="cspot.ownerID === user.userId" class="text-align-left bg-gray-200 w- hover:bg-gray-400 h-[20%] border-2 border-gray-500">
            <span class=" m-2 font-bold">€{{cspot.price}}</span> 
            <span class="font-bold ">{{cspot.location}} </span>
            <p class=" bg-gray-200  ">
              
              {{cspot.name}} {{cspot.description}} 
              <!-- <button class="bg-gray-500 hover:bg-blue-700 text-white font-bold  rounded ml-[20%] w-[10%] h-[10%] m-5">edit</button> -->
            </p>
                        
          </div>
        
      </div>      
  </div>          
    </div>
    
    
</template>

<script>
export default {
name: "UserPage",
computed: {
  user() {
    
    
    return this.$store.getters.user;  // Use Vuex getter to access the user
  },
  bookings() {
      return this.$store.getters.bookings;
  },
  spot(){
    return this.$store.getters.campingSpots;
  },
  users() { 
      return this.$store.getters.users;
    },
  bookingsWithSpots() {
    return this.bookings.map(booking => {
      const spot = this.spot.find(s => s.spotId === booking.spotId);
      return {
        ...booking,
        spotName: spot ? spot.name : 'Loading...' // or some default text
      };
    });
  },

},

created(){
  
  this.$store.dispatch('fetchBookings', this.user.userId);
  this.$store.dispatch('fetchUsers');
},
methods: {
  logout() {
    this.$store.dispatch('clearUser');  // Use Vuex action to clear user
    this.$router.push('/login');  // Redirect to the login page
  },
  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  },
  newBooking(){
    this.$router.push('/Camping');
  },
  newCampingSpots(){
    this.makeNewSpot = true

  },
  closenewCampingSpots(){
    this.makeNewSpot = false
  },
  addSpot(){
      this.campingSpotsData.name = this.spotName 
      this.campingSpotsData.location = this.location 
      this.campingSpotsData.description = this.description 
      this.campingSpotsData.price = this.price
      this.campingSpotsData.ownerID = this.user.userId

    if (!this.campingSpotsData.name.trim() || 
        !this.campingSpotsData.location.trim() ||
        !this.campingSpotsData.description.trim() ||
        this.campingSpotsData.price === null || this.campingSpotsData.price === '') 
        {
      alert('Please fill in all required fields correctly.')

       // Stop the function execution if validation fails
    }
    else{
      
      console.log(this.campingSpotsData)
      this.$store.dispatch('addCampingspot', this.campingSpotsData);
      this.makeNewSpot = false
      alert("CampingSpot added!")
    }
  
  },
  setEdit(){
    this.edit = true
  },
  cancelEdit(){
    this.edit = false
  },
  updateUserComfirmed(){
    if(this.email != null && this.username != null && this.user != null){
      this.user2 =this.users.find(user => user.userId === this.user.userId)
      this.userData.email = this.email
      this.userData.username = this.username
      this.userData.password= this.user2.password
      this.userData.role = this.user.role
      this.userData.userId = this.user.userId
      console.log(this.userData)
      this.edit = false
      alert("Your information has been updated. Please log in again ")
      this.$store.dispatch('updateUser', this.userData);
      this.$store.dispatch('clearUser'); 
      this.$router.push('/login'); 

    }else{
      alert("Please enter username and email, or cancel")
    }
  },
  cancelBooking(bookingId, bookingDate) {
    const today = new Date(); // Today's date
    today.setHours(0, 0, 0, 0); // Reset time part to compare only the date part

    const bookingDateObj = new Date(bookingDate); // Convert string to date
    bookingDateObj.setHours(0, 0, 0, 0);
    console.log(bookingId)
    console.log(bookingDate)
    console.log(today)
    console.log(bookingDateObj) // Ensure time is reset to start of the day for fair comparison

    if (bookingDateObj > today) {
      // Booking date is in the future, proceed with cancellation
      this.$store.dispatch('deleteBooking', {
        userId: this.user.userId,
        bookingId: bookingId
      });
      alert("Booking cancelled successfully.");
    } else {
      // Booking date has passed, cannot cancel
      alert("Booking cannot be cancelled as the date has already passed.",today," ",bookingDate);
    }
  },

},
data(){
  return{
    makeNewSpot: false,
    location: null,
    spotName: null,
    price: null,
    description: null,
    availability: 1,
    edit: false,
    username: null,
    email: null,
    user2:null,
    

    campingSpotsData:{
      ownerID: 0,
      name: '',
      location: '',
      description:'',
      price: 0,
      availability: 1


    },
    userData:{
      userId: null,
      username: null,
      email: null,
      password: null,
      role: null
    }

  }
}
}
</script>

<style>
.shadow-top {
    box-shadow: 0px -4px 6px -1px rgba(0, 0, 0, 0.1),
                0px -2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
