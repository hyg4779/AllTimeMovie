<template>
  <div 
    id="Main"
    class="d-flex flex-column py-4"
  >
    <div>
      <p class="fs-1 text-white my-4">좋아하는 영화를 검색해보세요</p>
    </div>
    <div class="wrapper my-2">
        <router-link :to="{ name: 'SearchPage' }">SearchPage</router-link>
      <!-- <div class="link_wrapper">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
            <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
          </svg>
        </div>
      </div> -->
    </div>
    <div
      id="movielist"
      class="d-flex justify-content-center my-1 py-4"
    >
      <AllTimeMovieList
        id="movieinfo"
        class="m-4"
        v-for="movie in movies"
        :key="movie.rank"
        :movie="movie" 
      />
    </div>
  </div>
</template>

<script>
import AllTimeMovieList from '@/components/Main/AllTimeMovieList'
import axios from 'axios'
import _ from 'lodash'

export default {
    name: 'Main',
    components: {
      AllTimeMovieList,
    },
    computed: {
      movies () {
        return _.sampleSize(this.$store.state.loadMovies, 5)
        // return this.$store.state.loadMovies
      }
    },
    methods: {
      getMovies: function () {
        axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/community/get_movies/',
        })
      }
    },
    mounted: function () {
      this.getMovies()
      this.$store.dispatch('loadUsers')
    },
    created: function () {
      this.$store.dispatch('loadMovies')
    }
}
</script>
<style scoped>
.wrapper{
  display: inline-block;
  margin: auto;
  /* transform: translate(-50%, -50%); */
}

.link_wrapper{
  position: relative;
}

a{
  display: block;
  width: 30rem;
  line-height: 4rem;
  font-size: 1.3rem;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 3px solid #333;
  transition: all .35s;
}

  a:hover{
    width: 200px;
    border: 3px solid rgb(187, 168, 60, 1);
    background: transparent;
    color: rgb(187, 168, 60, 1);
  }
  
  a:hover + .icon{
    border: 3px solid rgb(187, 168, 60, 1);
    right: -25%;
  }
  #movieinfo:hover {
    cursor: pointer;
  }
</style>