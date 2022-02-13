<template>
  <div id="app">    
    <div class="m-5">
      <header class="mx-5">
        <router-link class="logo fs-1" :to="{name: 'Main'}">AllTimeMovie</router-link>
            <router-link class="link fs-3 mx-4" :to="{ name: 'ReviewPage', params: {reviewNum: ''}}">Community</router-link>
            <span v-if="isLogin">
              <router-link class="link fs-3 mx-4" :to="{name: 'Profile'}">Profile</router-link>
              <a class="link fs-3 mx-4" @click="logout">Logout</a>
            </span>
            <span v-else>
              <router-link class="link fs-3 mx-4" :to="{name: 'Signup'}">Signup</router-link>
              <router-link class="link fs-3 mx-4" :to="{name: 'Login'}">Login</router-link>
            </span>   
      
      </header>
    </div>
    <transition
      name="fade"
      mode="out-in"
      >
      <router-view />
    </transition>  
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
    return{
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('accessToken')
      this.$store.commit('LOGOUT')
      alert('로그아웃 하였습니다.')
    },
    goSearchPage(event){
      event.preventDefault()
      // console.log(event.target[0].value)
    }
  },
  computed:{
    ...mapGetters([
      'isLogin',
    ])
  },
  created () {
      this.$nextTick(() => {this.show = true})
      this.$store.dispatch('loadMovies')
    }
}

</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body, html{
  font-family: 'Outfit', sans-serif;
  background-color: #24252A;
  background-image: url("./stars.jpg");
  height: 100%;
  background-attachment: fixed;
}
header{
  /* background-color: #24252A; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* padding: 10px 10%; */
}
li, a, button{
  font-weight: 500;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}
.logo{
  font-size: 2rem;
  text-decoration: none;
  cursor: pointer;
  /* margin: 1rem; */
  margin-right: auto;
  color: rgb(187, 168, 60, 1);
}

.logo:hover{
  transition: all 0.3s;
  color: rgb(187, 168, 60, 0.5);
}

.link{
  color: rgb(187, 168, 60, 1);
  text-decoration: none;
  font-weight: 500;
  margin: 0 5px 0 5px;
  font-size: 20px;
  cursor: pointer;
}

.link:hover{
  color: rgb(187, 168, 60, 0.5);
}

.my-btn {
  margin: 20px;
  padding: 9px 25px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  background-color: rgba(0, 136,169, 1);
  border: none;
  border-radius: 50px !important;
  transition: all 0.3s ease 0s;
}
/* button {
  margin: 1rem;
  padding: 10px;
  border: none;
  color: white;
  text-decoration: none;
  border-radius: 50px !important;
  background-color: rgba(0, 136,169, 1);
  font-size: 16px;
  transition: all 0.3s ease 0s;
} */
.my-btn:hover{
  color: white;
  background-color: rgba(0, 136,169, 0.5);
}

/* transition: all 0.5s; */


#app {
  
  position: sticky !important;
  font-family: 'Outfit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.dropdown-button {
  margin: 1rem;
  padding: 10px 10px;
  border: none;
  border-radius: 50px !important;
  background-color: rgba(0, 136,169, 1);
  font-size: 16px;
  transition: all 0.3s ease 0s;
  border: none;
}
.dropdown {
  position: relative;
  padding: auto;
  display: flex;
  justify-content: center;
}
.dropdown-content {
  display: none;
  /* background-color: rgba(0, 156,169, 1); */
  position: absolute;
  margin-left: 0.5rem;
  margin-top: 4rem !important;
  
}
.dropdown-content a {
  color: rgba(27, 214, 231, 1);
  padding: 2px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: rgba(0, 156,169, 1);
  box-sizing: border-box;
  border-radius: 40%;
  }
.dropdown:hover .dropdown-content { display: block; }
.dropdown:hover .dropdown-button { background-color: rgba(0, 156,169, 0.5); }

</style>
