<template>
  <div>
    <b-form 
      @submit="UpdateReview" 
      @reset="onReset" 
      v-if="show"
      class="m-3"
    >
     <div class="d-flex">
        <label>영화명</label>
        <p style="margin-left: 30px;"
        >
          {{originmovies[0].title}}
        </p>
      </div>

      <div class="my-3">
        <label class="my-2">제목</label>
        <b-form-input 
          placeholder="리뷰 제목"
          type="text"
          v-model.trim="propsReviewDetail.title"
        >
        </b-form-input>
      </div>
      <div class="my-3">
        <label class="my-2" for="textarea-auto-height">내용</label>
        <b-form-textarea
          placeholder="리뷰 내용"
          v-model.trim="propsReviewDetail.content"
        ></b-form-textarea>
      </div>
      <div class="text-end">
        <b-button 
          @click="$bvModal.hide('bv-modal-example')" 
          class="my-btn"
          type="submit"
          >
          Submit
        </b-button>
        <b-button class="my-btn" type="reset">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'UpdateReview',
  props: {
    reviewDetail: {
      type: Object,
    },
  },
  data() {
      return {
        propsReviewDetail: {},
        show: true,
        result: '',
      }
    },
    methods: {
      UpdateReview(event) {
        event.preventDefault()
        const newReview = {
          ...this.propsReviewDetail,
          title: this.propsReviewDetail.title,
          content: this.propsReviewDetail.content,
          alltimemovie: this.propsReviewDetail.alltimemovie,
        }
        if (newReview.title) {
          this.$store.dispatch('updateReview', newReview)
          .then(() => {
            // console.log(res)
            this.onReset(event)
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
    },
  computed:{
    originmovies () {
      return this.$store.state.loadMovies.filter(origindata => origindata.rank == this.propsReviewDetail.alltimemovie)
    },
  },
  created: function () {
    // console.log(this.$props.reviewDetail)
    this.propsReviewDetail = this.$props.reviewDetail
    // console.log(this.propsReviewDetail)
  }
}
</script>

<style>
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
  /* background-color: rgba(0, 136,169, 1); */
  border: none;
  border-radius: 50px !important;
  transition: all 0.3s ease 0s;
}

.my-btn {
  margin: 1rem;
  padding: 9px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  background-color: rgba(0, 136,169, 1) !important;
  border: none !important;
  border-radius: 2rem !important;
  transition: all 0.3s ease 0s;
}

.my-btn:hover{
  background-color: #444 !important;
}
</style>