<template>
<transition
  name="fade"
  mode="out-in"
>
  <div v-if="posterPath">
    <div class="movie-body m-5" @click="gotoDetail">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${posterPath}`"
        alt="poster_image"
        >
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AllTimeMovieList',
  props: {
    movie: {
      type: Object
    }
  },
  data: function () {
    return {
      posterPath: '',
      movieId:'',
      movieTitle: '',
    }
  },
  methods: {
    loadMovieDetail: function (movie) {
      const BASE_URL = 'https://api.themoviedb.org/3/search/movie'
      const TMDB_API = process.env.VUE_APP_TMDB_API_KEY
      axios({
        method: 'get',
        url: `${BASE_URL}?api_key=${TMDB_API}&language=ko-KR&page=1&include_adult=false&query=${movie.title}`
      })
      .then(response => {
        // console.log(response)
        this.posterPath = response.data.results[0].poster_path
        this.movieId = response.data.results[0].id
        this.movieTitle = response.data.results[0].title
        // const movieTMDBinfo = {
        //   id: response.data.results[0].id,
        //   title: response.data.results[0].title,
        //   overview: response.data.results[0].overview,
        //   poster_path: response.data.results[0].poster_path,
        //   release_date: response.data.results[0].release_date,
        //   vote_average: response.data.results[0].vote_average,
        //   genre_ids: response.data.results[0].genre_ids,
        // }
        // this.$store.dispatch('loadTMDBinfo', movieTMDBinfo)
      })
    },
    gotoDetail(){
      this.$router.push({ name: 'Detail', params: {movieTitle: this.movieTitle, movieId: this.movieId}})
    },
  },
  created: function () {
    this.loadMovieDetail(this.movie)
    
  },
}
</script>

<style scoped>
.detail{
  color: #42b983; 
}

img{
  border-radius: 2rem;
  cursor: pointer;
}

img:hover{
  transform: scale(1.05);
  transition: all 0.3s ease 0s;
  background-color: rgba(0,0,0,1);
}

.movie-body{
  width: 280px;
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: rgba(255,255,255,0.5);
  margin-bottom: 2rem;
}

</style>