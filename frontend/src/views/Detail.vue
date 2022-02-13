<template>
  <div id="detail" class="d-flex flex-row">
    <div class="my-card-class p-4">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${this.posterPath}`"
        alt="Card image"
        class="col-4">

      <div class="d-flex flex-column align-items-start m-5">
        <!-- <Teaser
        :teaser-video="teaserVideo"
        /> -->
        <div class="my-5 text-start">
          <p id="title">{{this.movieTitle}} </p>
          <p class="fs-2">⭐{{ this.voteAverage }}</p>
        </div>
        <div class="container text-start lh-lg">
          <p class="fs-3">
            {{ this.overview }}
          </p>
        </div>
        <form
          v-if="formShow"
          class="bg-red d-footer col-12" 
          @submit="createStar"
        >
          <b-form-rating
            id="rating-lg-no-border" 
            class= "m-4 bg-transparent"
            variant="warning" 
            no-border size="lg"
          >
          </b-form-rating>
          <button class="my-btn m-3 col-3 fs-4">Register</button>
        </form>
      </div>
    </div>
    <div class="align-self-start">
      <StarList
        v-for="star in loadStars"
        :key="star.id"
        :star="star"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import Teaser from '@/components/Detail/Teaser'
import StarList from '@/components/Detail/StarList'
import {mapGetters} from 'vuex'

export default {
  name: 'Detail',
  components: {
    StarList,
    // Teaser
  },
  data(){
    return{
      show: true,
      teaserVideo: null,

      movieTitle: '',
      posterPath: '',
      overview: '',
      voteAverage: '',
    }
  },
  computed: {
    loadMovies () {
      return this.$store.state.loadMovies.filter(movie => movie.title === this.$route.params.movieTitle)
    },
    loadStars () { // 모든 영화 평점 id / Rated / movieId / userId
      const star_movieId = Number(this.loadMovies[0].rank)
      return this.$store.state.loadStars.filter(star_list => star_list.movie === star_movieId)
    },
    formShow(){
      // console.log(!!this.$store.state.loadStars.filter(el => el.user === this.getUserId))
      return !!this.$store.state.loadStars.filter(el => el.user === this.getUserId)
    },
    ...mapGetters([
      'getUserId',
    ])

  },
  methods: {
    loadMovieDetail: function () {
      const BASE_URL = 'https://api.themoviedb.org/3/movie'
      const TMDB_API = process.env.VUE_APP_TMDB_API_KEY
      const movieId = this.$route.params.movieId
      axios({
        method: 'get',
        url: `${BASE_URL}/${movieId}?api_key=${TMDB_API}&language=ko-KR`
      })
      .then(response => {
        // console.log(response.data)
        this.posterPath = response.data.poster_path
        this.movieTitle = response.data.original_title
        this.overview = response.data.overview
        this.voteAverage = response.data.vote_average
      })
      .catch((err) => {
        console.log(err)
      })
    },
    createStar: function (event) {
      event.preventDefault()
      this.show = false
      // console.log(event.target[0].ariaValueNow)
      let rateValue = event.target[0].ariaValueNow
      // console.log(this.starValue)
      if (rateValue) {
        const createItem = {
          star_rated: rateValue,
          movie: this.loadMovies[0].rank
        }
          // console.log(createItem)
        this.$store.dispatch('createStar', createItem)
        this.$store.dispatch('loadStars')
      }
    },
  },
  created() {
    this.loadMovieDetail()

    // const content = `${this.$route.params.movieTitle} main teaser`
    // const YOUTUBE_URL = process.env.VUE_APP_YOUTUBE_API_URL
    // const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
    // const params = {
    //   key: API_KEY,
    //   part: 'snippet',
    //   type: 'video',
    //   q: content
    // }
    // axios.get(YOUTUBE_URL, {params})
    // .then(res => {
    //   console.log(res.data.items[0])
    //   this.teaserVideo = res.data.items[0]
    //   this.show=true
    // })
  }
}
</script>

<style scoped>
#detail{
  display: flex;
  padding: 3% 7% 7% 7%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#AllTimeMovie{
  color: rgba(0, 136,169, 1);
}

.my-card-class{
  box-sizing: border-box;
  color: whitesmoke;
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items: center;
  border: 2px solid rgb(255,255,255,0.5);;
  border-radius: 3rem;
  background-color: rgb(255,255,255,0.1);
}
#title{
  font-size:3em;
}
.detailInfo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  border: 2px solid rgb(255,255,255,0.5);
  border-radius: 3rem;
  width: 30%;
  height: 55%;
  margin: 0.5rem
}

.d-footer{
  display: flex;
  flex-direction: row;
  justify-content: center;
  
}
.my-btn {
  margin: 1rem;
  padding: 10px;
  border: none;
  color: white;
  text-decoration: none;
  border-radius: 50px !important;
  background-color: rgba(0, 136,169, 1);
  font-size: 16px;
  transition: all 0.3s ease 0s;
}

.my-btn:hover{
  color: white;
  background-color: rgba(0, 136,169, 0.5);
}
</style>