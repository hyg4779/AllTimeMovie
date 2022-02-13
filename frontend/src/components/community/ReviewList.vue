<template>
  <div class="mx-5">
    <div class="m-5">
        <div class="table-wrap" >
            <table class="table table-responsive table-borderless">
              <!-- <thead class="text-white fs-3">
                <th></th>
                <th>제목</th>
                <th>영화</th>
                <th>작성자</th>
                <th></th>
              </thead> -->
              <tbody id="review-list">
                  <tr 
                    class="align-middle alert border-bottom fs-5" 
                    role="alert"
                    @click="movieReviewDetail(review)"
                    v-for="review in reviews" 
                    :key="review.id"
                    :review="review"
                  >
                      <td class="text-center"> </td>
                      <td>
                          <div>
                              <p class="m-0 fw-bold">{{review.title}}</p>
                              
                          </div>
                      </td>
                      <td>
                          <div class="m-0 fw-bold">{{movies[review.alltimemovie-1].title}}</div>
                          
                      </td>
                      <td> 
                        <div>{{loadUsers[review.user-1].username}}</div>
                        <!-- <div class="text-muted">{{review.created_at}} </div> -->
                      </td>
                      <td>
                          <div class="btn" data-bs-dismiss="alert"> <span class="fas fa-times"></span> </div>
                      </td>
                  </tr>
              </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReviewList',
  components: {
  },
  computed: {
    reviews () {
      return this.$store.state.loadReviews
    },
    movies () {
      return this.$store.state.loadMovies
    },
    loadUsers () {
      return this.$store.state.loadUsers
    }
  },
  methods: { 
    movieReviewDetail: function (review) {
      // console.log(review)      
      this.$router.push({name:'Review', params: {reviewNum: `${review.id}`}})
    },  
  },
  created: function () {
    this.$store.dispatch('loadReviews')
    this.$store.dispatch('loadComments')
  },
}
</script>

<style scoped>
#review-list {
  color: white;
}
.table > tbody > tr > td {
  height:150px;
}
.table > tbody > tr:hover { 
  background-color: rgb(248, 244, 244, 0.05);
  cursor: pointer;
}

</style>