<template>
  <div>
    <input type="text" v-model="searchKeyword" placeholder="   영화제목을 입력해주세요" class="input-movie my-4 border"/>
    <div id="movielist" class="d-flex flex-column text-start" v-if = searchKeyword>
      <div
        class="movie-body m-1 text-secondary"
        v-for="movie in searchmovies"
        :key="movie.id"
        @click="selectMovie(movie)"
      >
        {{movie.title}}
      </div>
    </div>

    <b-form  
      @submit="CreateReview" @reset="onReset" 
      v-if="show" class="m-3">

      <div class="d-flex">
        <label class="" style="margin-right: 30px;">영화명</label>
        <p>{{alltimemovieTitle}}</p>
      </div>

      <div class="my-3 d-flex flex-column">
        <label class="my-2 align-self-start">제목</label>
        <b-form-input placeholder="리뷰 제목" type="text" v-model.trim="title">
        </b-form-input>
      </div>
      <div class="my-3 d-flex flex-column">
        <label class="my-2 align-self-start" for="textarea-auto-height">내용</label>
        <b-form-textarea
          placeholder="리뷰 내용"
          v-model.trim="content"
        ></b-form-textarea>
      </div>
      <div class="text-end">
        <b-button class="m-2" type="submit" variant="primary">Submit</b-button>
        <b-button class="m-2" type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'CreateReview',
  data() {
      return {
        title: '',
        content: '',
        alltimemovieTitle: '',
        alltimemovie: '',
        show: true,
        searchKeyword: '',
        result: '',
        isSelected: false,
      }
    },
    methods: {
      CreateReview(event) {
        event.preventDefault()
        const review = {
          title: this.title,
          content: this.content,
          alltimemovie: this.alltimemovie,
        }
        if (review.title) {
          this.$store.dispatch('createReview', review)
          .then(res => {
            console.log(res)
            alert('리뷰가 등록되었습니다.')
            this.onReset(event)
            this.$bvModal.hide('bv-modal-example')
            this.$store.dispatch('loadReviews')
          })
          .catch(err => {
            console.log(err)
          })
        }
      },
      onReset(event) {
        event.preventDefault()
        this.title = ''
        this.content = ''
        this.alltimemovie = null
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      selectMovie(movie) {
        this.isSelected = true
        this.result = movie
        if (this.originmovies[0]) {
          this.alltimemovie = this.originmovies[0].rank
          this.alltimemovieTitle = this.originmovies[0].title
          this.searchKeyword = ''
        } else {
          alert('준비중인 영화입니다. 다른 영화를 선택해주세요.')
          this.alltimemovie = ''
          this.alltimemovieTitle = ''
        } 
      },
    },
  computed:{
    searchmovies() {
      return  this.$store.state.loadMovies.filter(movie => movie.title.includes(this.searchKeyword))
    },
    originmovies () {
      return this.$store.state.loadMovies.filter(origindata => origindata.title === this.result.title)
    },
  }
}
</script>

<style scoped>
.input-movie {
  width: 100%;
}
.movie-body:hover{
  cursor: pointer;
  background-color: whitesmoke;
}
button {
  padding: 9px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  background-color: rgba(0, 136,169, 1);
  border: none;
  border-radius: 50px !important;
  transition: all 0.3s ease 0s;
}
</style>