<template>
  <div id="profile">
    <p class="fs-1 pb-5">Profile Page</p>
    <p class="mx-3 my-4 text-white fs-1">{{getUsername}}님만의 영화공간 <b-icon icon="camera-reels-fill"></b-icon></p>
    <div class="d-flex align-items-start flex-column my-5 border-bottom">
      <h2 class="mx-3 my-4 text-white fs-3">{{getUsername}}님을 위한 추천영화</h2>
      <div 
        v-if="TMDBrecommendation.length === 0"
        id="star-list-none"
        class="d-flex align-items-start flex-column"
      >
        <div class="container my-5">
          <p>별점을 준 영화가 부족해요</p>
        </div>
      </div>
      <div class="d-flex mb-5">
        <RecommendMovies 
          v-for="TMDMrecommend in TMDBrecommendation"
          :key="TMDMrecommend.id"
          :TMDMrecommend="TMDMrecommend"
        />
      </div>
    </div>
    <h1 class="mx-3 my-5 text-white fs-1">{{getUsername}}님의 영화기록</h1>
    <div class="d-flex align-items-start flex-column my-5 border-bottom">    
      <h2 class="mx-3 text-white fs-3">{{getUsername}}님의 ⭐⭐⭐⭐⭐ 별 영화</h2>
      <div 
        v-if="ratedstars5.length === 0"
        id="star-list-none"
        class="d-flex align-items-start flex-column"
      >
        <div class="container my-5">
          <p>아직 별점을 준 영화가 없어요</p>
        </div>
      </div>
      <div 
        v-else
        class="d-flex align-items-start flex-colum mb-3"
      >
        <div class="d-flex">
          <ProfilePoster 
            v-for="star in ratedstars5"
            :key="star.id"
            :star="star"
          />
        </div>
      </div>
    </div>
    <div class="d-flex align-items-start flex-column my-5 border-bottom">    
      <h2 class="mx-3 text-white fs-3">{{getUsername}}님의 ⭐⭐⭐⭐ 별 영화</h2>
      <div 
        v-if="ratedstars4.length === 0"
        id="star-list-none"
        class="d-flex align-items-start flex-column"
      >
        <div class="container my-5">
          <p>아직 별점을 준 영화가 없어요</p>
        </div>
      </div>
      <div 
        v-else
        class="d-flex align-items-start flex-column mb-3"
      >
        <div class="d-flex">
          <ProfilePoster 
            v-for="star in ratedstars4"
            :key="star.id"
            :star="star"
          />
        </div>
      </div>
    </div>
    <div class="d-flex align-items-start flex-column my-5 border-bottom">    
      <h2 class="mx-3 text-white fs-3">{{getUsername}}님의 ⭐⭐⭐ 별 영화</h2>
      <div 
        v-if="ratedstars3.length === 0"
        id="star-list-none"
        class="d-flex align-items-start flex-column"
      >
        <div class="container my-5">
          <p>아직 별점을 준 영화가 없어요</p>
        </div>
      </div>
      <div 
        v-else
        class="d-flex align-items-start flex-column mb-3"
      >
        <div class="d-flex">
          <ProfilePoster 
            v-for="star in ratedstars3"
            :key="star.id"
            :star="star"
          />
        </div>
      </div>
    </div>
    <div class="d-flex align-items-start flex-column my-5 border-bottom">    
      <h2 class="mx-3 text-white fs-2">{{getUsername}}님의 ⭐⭐ 별 영화</h2>
      <div 
        v-if="ratedstars2.length === 0"
        id="star-list-none"
        class="d-flex align-items-start flex-column"
      >
        <div class="container my-5">
          <p>아직 별점을 준 영화가 없어요</p>
        </div>
      </div>
      <div 
        v-else
        class="d-flex align-items-start flex-column mb-3"
      >
        <div class="d-flex">
          <ProfilePoster 
            v-for="star in ratedstars2"
            :key="star.id"
            :star="star"
          />
        </div>
      </div>
    </div>
    <div class="d-flex align-items-start flex-column my-5 border-bottom">    
      <h2 class="mx-3 text-white fs-3">{{getUsername}}님의 ⭐ 별 영화</h2>
      <div 
        v-if="ratedstars1.length === 0"
        id="star-list-none"
        class="d-flex align-items-start flex-column"
      >
        <div class="container my-5">
          <p>아직 별점을 준 영화가 없어요</p>
        </div>
      </div>
      <div 
        v-else
        class="d-flex align-items-start flex-column mb-3"
      >
        <div class="d-flex">
          <ProfilePoster 
            v-for="star in ratedstars1"
            :key="star.id"
            :star="star"
          />
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
import _ from 'lodash'
RecommendMovies
import ProfilePoster from '@/components/Profile/ProfilePoster'
import RecommendMovies from '@/components/Profile/RecommendMovies'

export default {
  name: 'Profile', 
  components: {
    ProfilePoster,
    RecommendMovies
  },
  computed: {
    ratedstars5 () {
      const user_id = this.getUserId
      return this.$store.state.loadStars.filter(star => (star.user === user_id && star.star_rated == 5)
      )},
    ratedstars4 () {
      const user_id = this.getUserId
      return this.$store.state.loadStars.filter(star => (star.user === user_id && star.star_rated == 4)
      )},
    ratedstars3 () {
      const user_id = this.getUserId
      return this.$store.state.loadStars.filter(star => (star.user === user_id && star.star_rated == 3)
      )},
    ratedstars2 () {
      const user_id = this.getUserId
      return this.$store.state.loadStars.filter(star => (star.user === user_id && star.star_rated == 2)
      )},
    ratedstars1 () {
      const user_id = this.getUserId
      return this.$store.state.loadStars.filter(star => (star.user === user_id && star.star_rated == 1)
      )},
    ratedstars () {
      const user_id = this.getUserId
      return this.$store.state.loadStars.filter(star => (star.user === user_id)
      )},
    movies () {
      return this.$store.state.loadMovies
    },
    ...mapGetters([
      'getUsername',
      'getUserId',
    ])
  },
  data: function () {
    return {
      TMDBmovieId:'',
      // star5List: [],
      // choicedmovieId: '',
      TMDBrecommendation: [],
    }
  },
  methods: {
    getrecommendmovieId: function () {
      const choicedmovie =  _.sample(this.ratedstars5)
      const movieTitle = this.movies[choicedmovie.movie].title
      // console.log(movieTitle)
      const BASE_URL = 'https://api.themoviedb.org/3/search/movie'
      const TMDB_API = process.env.VUE_APP_TMDB_API_KEY
      axios({
        method: 'get',
        url: `${BASE_URL}?api_key=${TMDB_API}&language=ko-KR&page=1&include_adult=false&query=${movieTitle}`
      })
      .then(res => {
        // console.log(res.data.results[0].id)
        this.TMDBmovieId = res.data.results[0].id
        // console.log(this.TMDBmovieId)
      })
      .then(() => {
        if (this.TMDBmovieId) {
          // console.log(this.TMDBmovieId)
          const movieId = this.TMDBmovieId
          const BASE_URL = 'https://api.themoviedb.org/3/movie'
          const TMDB_API = process.env.VUE_APP_TMDB_API_KEY
          axios({
            method: 'get',
            url: `${BASE_URL}/${movieId}/recommendations?api_key=${TMDB_API}&language=ko-KR&page=1`
          })
          .then(res =>{
            this.TMDBrecommendation = _.sampleSize(res.data.results, 6)
          })
        }
      })
    },
    // choicemovieId: function () {
    //   this.choicedmovieId = _.sample(this.star5movieId)
      
    //   const movieId = this.choicedmovieId
    //   const BASE_URL = 'https://api.themoviedb.org/3/movie'
    //   const TMDB_API = process.env.VUE_APP_TMDB_API_KEY
    //   axios({
    //     method: 'get',
    //     url: `${BASE_URL}/${movieId}/recommendations?api_key=${TMDB_API}&language=ko-KR&page=1`
    //   })
    //   .then(response => {
    //     console.log(response.data.results)
    //     const originMovies = this.movies
    //     const TMDBrecommendationMovies = response.data.results
    //     const originMoviesTitle = []
    //     originMovies.forEach(getTitle => {
    //       originMoviesTitle.push(getTitle.title)
    //     })
    //     TMDBrecommendationMovies.forEach(isExist => {
    //       if (originMoviesTitle.includes(isExist.title)) {
    //         this.TMDBrecommendation.push(isExist)
    //       }
    //     })
    //     // console.log(this.TMDBrecommendation)        
    //   })
    // }
  },
  created: function () {
    this.$store.dispatch('loadMovies')
    this.$store.dispatch('loadStars')
    this.getrecommendmovieId()
    // this.create5list()
    // this.choicemovieId()
  }
}
</script>

<style scoped>


#img-size{
  display: block;
  max-height: 30rem;
  width: auto;
  height: auto;
}

#recom-cards{
display: flex;
flex-wrap: wrap;
justify-content: center;
}
#profile {
  margin: 5rem;
  display: flex;
  flex-direction: column;
}
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: 'Cormorant', serif;
    background: #262626
}
#container-fluid {
    margin-top: 200px !important
}

p {
    font-size: 20px;
    line-height: 33px !important;
    color: #fff
}

.small {
    letter-spacing: 0.5px !important
}

.card {
    box-shadow: 0px 5px 16px rgba(223, 241, 223, 0.5);
    transition: 0.8s;
    background: #333;
    ;
    margin: auto;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 7px !important
}

.card-header,
.card-footer {
    border-radius: 7px !important
}

.card:after {
    position: absolute;
    top: 0;
    left: -50%;
    width: 100%;
    z-index: 9999;
    height: 100%;
    pointer-events: none
}

.card-title img {
    z-index: 99999 !important
}

.card .layer {
    position: absolute;
    top: calc(100% - 5px);
    width: 100%;
    height: 100%;
    background: linear-gradient(#03a9f4, #e91ee3);
    left: 0;
    z-index: 1;
    transition: 0.5s
}

.card:hover {
    box-shadow: -5px 50px 100px rgba(223, 241, 223, 0.5)
}

.card:hover hr {
    background-color: #fff
}

.card:hover h4 {
    font-weight: 600
}

.card:hover p {
    font-weight: 600
}

.card:hover small {
    font-weight: 600
}

.card:hover .layer {
    top: 0
}

.card .content {
    position: relative;
    z-index: 2
}

.card .content .img-1 {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid white !important
}

.card h4 {
    color: #fff;
    font-weight: 500
}

hr {
    background-color: rgb(117, 117, 117);
    width: 80% !important;
    transition: 1s
}

.bold {
    font-weight: 500
}

#quotes {
    opacity: 0.1;
    filter: alpha(opacity=40)
}

@media (max-width: 479px) {
    p {
        padding: 0 !important
    }

    .img-1 {
        margin-right: 0 !important
    }
}
</style>