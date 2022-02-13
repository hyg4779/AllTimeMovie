<template>
  <div>

    <div><h1 id="title">Community</h1></div>
    <button class="btn-5" @click="$bvModal.show('bv-modal-example')">방금보신 영화를 공유해 주세요</button>
    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title>
        리뷰 작성하기
      </template>
      <CreateReview /> 
    </b-modal>
    <ReviewList
    />
  </div>
</template>

<script>
import ReviewList from '../components/community/ReviewList.vue'
import CreateReview from '../components/community/CreateReview.vue'

export default {
  name: 'ReviewPage',
  components:{
    ReviewList,
    CreateReview
  },
  created: function () {
    this.$store.dispatch('loadMovies')
    this.$store.dispatch('loadUsers')
  },
}
</script>

<style scoped>
#title {
  /* color: rgb(187, 168, 60, 1); */
  color: white;
  font-size: 3rem;
  margin:5rem 0 3rem 0;

}

.my-btn {
  margin: auto;
  padding: 9px 25px;
  width: 50rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  background-color: rgba(0, 136,169, 1);
  border: none;
  border-radius: 50px !important;
  transition: all 0.3s ease 0s;
}


.box {
  width: 40%;
  margin: 0 auto;
  background: rgba(255,255,255,0.2);
  padding: 35px;
  border: 2px solid #fff;
  border-radius: 20px/50px;
  background-clip: padding-box;
  text-align: center;
}

.button {
  font-size: 1em;
  padding: 10px;
  color: #fff;
  border: 2px solid #06D85F;
  border-radius: 20px/50px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.button:hover {
  background: #06D85F;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: 250ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 5rem auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.popup .content {
  max-height: 30%;
  overflow: auto;
}

@media screen and (max-width: 700px){
  .box{
    width: 70%;
  }
  .popup{
    width: 70%;
  }
}

body {
  background: #2ecc71;
  font-size: 62.5%;
}

.container {
  padding: 2em;
}

/* GENERAL BUTTON STYLING */
button,
button::after {
  -webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
  -o-transition: all 0.3s;
	transition: all 0.3s;
}

button {
  background: none;
  border: 3px solid #fff;
  border-radius: 5px;
  color: #fff;
  display: block;
  font-size: 1.6em;
  font-weight: bold;
  margin: 1em auto;
  padding: 1em 4em;
  position: relative;
  text-transform: uppercase;
}

button::before,
button::after {
  background: #fff;
  content: '';
  position: absolute;
  z-index: -1;
}

button:hover {
  color: rgb(187, 168, 60, 1);
}

/* BUTTON 5 */
.btn-5 {
  overflow: hidden;
}

.btn-5::after {
  /*background-color: #f00;*/
  height: 100%;
  left: -35%;
  top: 0;
  transform: skew(50deg);
  transition-duration: 0.6s;
  transform-origin: top left;
  width: 0;
}

.btn-5:hover:after {
  height: 100%;
  width: 135%;
}
</style>