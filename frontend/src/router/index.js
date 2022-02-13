import Vue from 'vue'
import VueRouter from 'vue-router'


import Detail from '../views/Detail.vue'
import Main from '../views/Main.vue'
import Profile from '../views/Profile.vue'
import ReviewPage from '../views/ReviewPage.vue'
import Review from '@/components/community/Review'
import SearchPage from '../views/SearchPage.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/ReviewPage',
    name: 'ReviewPage',
    component: ReviewPage
  },
  {
    path: '/Review/:reviewNum',
    name: 'Review',
    component: Review,
  },
  {
    path: '/SearchPage',
    name: 'SearchPage',
    component: SearchPage,
  },
  {
    path: '/Detail/:movieTitle/:movieId',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
