<template>
  <div>
    <div class="container text-white d-flex flex-column align-items-start my-5">
      <p class="fs-1 mt-5">{{reviews[0].title }}</p>
      <p class="fs-4">{{originmovies[reviews[0].alltimemovie-1].title}}</p>
      <p>{{loadUsers[0].username}}</p>
      <p class="fs-5 my-5 container text-start lh-lg">{{ reviews[0].content }}</p>
      <div id="review-button" class="align-self-end">
      <button class="btn btn-link mx-2 text-white text-decoration-none fs-6" @click="$bvModal.show('bv-modal-example')">수정</button>
      <button class="btn btn-link mx-4 text-white text-decoration-none fs-6" @click="deleteReview(reviews[0])">삭제</button>
      </div>
    </div>


    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title>
        리뷰 수정하기
      </template>
      <UpdateReview 
        :reviewDetail="reviews[0]"
      />
    </b-modal>
    
    <CommentsList
      :reviewDetail="reviews[0]" 
    />
  </div>


</template>

<script>
import UpdateReview from '@/components/community/UpdateReview'
import CommentsList from '@/components/community/CommentsList'

export default {
  name: 'Review',
  components: {
    CommentsList,
    UpdateReview
  },
  methods: {
    deleteReview: function (reviewDetail) {
      this.$store.dispatch('deleteReview', reviewDetail)
      this.$router.push({name:'ReviewPage'})
    }
  },
  computed: {
    reviews () {
      const reviewPk = this.$route.params.reviewNum
      return this.$store.state.loadReviews.filter(review => review.id === Number(reviewPk))
    },
    originmovies () {
      return this.$store.state.loadMovies
    },
    loadUsers () {
      return this.$store.state.loadUsers.filter(user => user.id === this.reviews[0].user)
    }
  }
}
</script>

<style scoped>
#review-button > button:hover {
 color: rgb(187, 168, 60, 1);
}
</style>