<template>
  <div class="star-container">

    <div class="my-3">
      <div
        v-show = "isUpdate == true"
      >
        <b-form-rating 
          class="bg-transparent text-white border-0"
          id="rating-lg" 
          show-value
          variant="danger" 
          v-model="value" 
          size="lg"
        >
        </b-form-rating>
      </div>
      <div
        v-show = "isUpdate == false"
      >
        <b-rating 
          readonly
          show-value
          v-model="value" 
          variant="warning" 
          class="mb-2 col bg-transparent text-white border-0"
          size="lg"
        >
        </b-rating>
      </div>
      <p id="username">{{ratedUser}}</p>
    </div>
    <div class="btn-cont">
      <button class="my-btn" @click="updateStar(star)"><span id="updelete">수정</span></button>
      <button class="my-btn" @click="deleteStar(star)"><span id="updelete">삭제</span></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarList',
  props: {
    star: {
      // id / star_rated / movie_id / user_id
      type: Object
    },
    // fixtitle: {
    //   // loadMovies에서 추출한 detail.vue 영화
    //   type: Object
    // }
  },
  data: function () {
    return {
      value: this.star.star_rated,
      isUpdate: false
    }
  },
  computed:{
    ratedUser(){
      console.log(this.$store.state.loadUsers)
      return this.$store.state.loadUsers.filter(user => user.id === this.star.user)[0].username
    }
  },
  methods: {
    deleteStar: function (star) {
      // console.log(star)
      this.$store.dispatch('deleteStar', star)
      .then(() => {
        this.$store.dispatch('loadStars')
      })
    },
    updateStar: function (star) {
      if (this.isUpdate == false) {
        this.isUpdate = true
      } else {
        const updateStar = {
          ...star,
          star_rated: this.value
        }
      console.log(updateStar)
      this.$store.dispatch('updateStar', updateStar)
      // alert('평점이 수정되었습니다.')
      this.isUpdate = false
      .then(() => {
        this.$store.dispatch('loadStars')
      })
      }
    }
  },
}
</script>

<style scoped>
#updelete{
  writing-mode: horizontal-tb;
}
#username{
  font-size: 1.5rem;
  color: white;
}
.btn-cont{
  display: flex;
  flex-direction: column;
}
.star-container{
  display: flex;
  justify-content: space-between;
  
}
.my-btn {
  margin: 10px;
  padding: 10px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  width: 3.5rem;
  background-color: rgba(0, 136,169, 1);
  border: none;
  border-radius: 50px !important;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}
.my-btn:hover{
  color: white;
  background-color: rgba(0, 136,169, 0.5);
}

</style>