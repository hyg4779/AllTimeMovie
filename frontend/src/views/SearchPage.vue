<template>
  <div id="search" class="container">
    <h2>Enter The Movie Title</h2>
    
    <input 
      id="input" 
      type="text" 
      v-model="searchKeyword" 
      placeholder="search Movie"
      @keyup.enter="resetKeyword"
    />
    <div id="movielist">
      <SearchedMovie
        id="movieitem"
        class="m-3"
        v-for="movie in searchmovies"
        :key="movie.id"
        :movie="movie" 
      />

    </div>
  </div>
</template>

<script>
import SearchedMovie from '@/components/SearchPage/SearchedMovie.vue'

export default {
  name: 'SearchPage',
  components: {
    SearchedMovie,
  },
  data: function () {
    return {
      searchKeyword: '',
    }
  },
  computed:{
    searchmovies() {
      if(this.searchKeyword) {
        return  this.$store.state.loadMovies.filter(movie => movie.title.includes(this.searchKeyword))
      } else {
        return null
      }
    },
  },
}
</script>

<style scoped>
#search{
  display: flex;
  flex-direction: column;

}
h2{
  /* color: rgb(187, 168, 60, 1); */
  color: white;
  font-size: 3rem;
  margin:5rem 0 3rem 0;
}
#input{
  border: none;
  margin: auto;
  border-radius: 5rem;
  padding: 0 3rem 0.3rem 3rem;
  height: 5rem;
  width: 40rem;
  font-size: 3rem;
}
#movielist {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>