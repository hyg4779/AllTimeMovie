<template>
<div>
  <div class="card mt-3 mx-4">
    <div class="layer"></div>
    <div class="content">
      <div class="card-body text-center pb-3 ">
          <div class="row justify-content-center">
              <div class="col text-center justify-content-center ">
                <img 
                  class="my-4"
                  :src="`https://image.tmdb.org/t/p/w500/${posterPath}`"
                  alt="poster-image"
                  height="500rem"
                >
              </div>
          </div>
      </div>
    </div>
    <hr class="mt-auto mb-4">
    <div class="card-footer text-center border-0 mt-0 pt-0 mb-3">
      <div class="row text-center name mt-auto ">
        <div class="col">
          <h4 class="mb-0 Elizabeth">{{movieTitle}}</h4> <small class="mt-0 text-white">⭐ {{voteAverage}}</small>
          <p><span class="fa fa-star text-warning mr-1"></span><span class="fa fa-star text-warning mr-1"></span><span class="fa fa-star text-warning mr-1"></span><span class="fa fa-star-half-o text-warning mr-1"></span><span class="fa fa-star-o text-warning mr-1"></span></p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProfilePoster',
  props: {
    star: {
      type: Object,
    },
  },
  data: function () {
    return {
      posterPath: '',
      voteAverage: '',
      movieTitle: ''
    }
  },
  computed: {
    originTitle () {
      const starMovieId = String(this.star.movie)
      return this.$store.state.loadMovies.filter(movie => movie.rank === starMovieId)
    }
  },
  methods: {
    getMovieDetail: function () {
      const BASE_URL = 'https://api.themoviedb.org/3/search/movie'
      const TMDB_API = process.env.VUE_APP_TMDB_API_KEY
      const movieTitle = this.originTitle[0].title
      axios({
        method: 'get',
        url: `${BASE_URL}?api_key=${TMDB_API}&language=ko-KR&page=1&include_adult=false&query=${movieTitle}`
      })
      .then(response => {
        // console.log(response)
        this.posterPath = response.data.results[0].poster_path
        this.voteAverage = response.data.results[0].vote_average
        this.movieTitle = response.data.results[0].title
      })
    }
  },
  created: function () {
    this.getMovieDetail()
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