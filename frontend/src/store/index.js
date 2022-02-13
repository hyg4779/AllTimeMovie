import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userId: '',
    username: '',
    accessToken: null,
    // alltimemovies
    loadMovies: [],
    // all reviews
    loadReviews: [],
    // all comments
    loadComments: [],
    // TMDB에서 검색한 alltimemovie들
    loadTMDBinfolist:[],
    // load된 전체 별점 리스트 id / Rated / db movieId / userId
    loadStars: [],
    // db에 저장된 모든 user 정보
    loadUsers: [],
  },
  getters:{
    // userId
    getUserId: (state) => {
      const token = localStorage.getItem('accessToken')
      state.userId = JSON.parse(atob(token.split('.')[1])).user_id
      return state.userId
    },
    //username
    getUsername: (state) => {
      const token = localStorage.getItem('accessToken')
      state.username = JSON.parse(atob(token.split('.')[1])).username
      return state.username
    },
    // app.vue에서 login 유무 토글을 시키는 값
    isLogin(state){
      return !!state.accessToken || !! localStorage.getItem('accessToken')
    }
  },
  mutations: {
    login(state, token){
      state.accessToken = token
    },
    // logout 하면 state에서 토큰값 삭제 후 login으로 푸쉬
    LOGOUT(state){
      state.accessToken = ''
      router.push({name: 'Login' })
    },
    // db에 있는 alltimemovie를 state로 저장
    LOAD_MOVIES(state, loadMovies) {
      state.loadMovies=loadMovies
    },
    // 작성한 review를 state에 저장
    CREATE_REVIEWS (state, review) {
      state.loadReviews.push(review)
    },
    // db에 작성된 review를 front에 저장
    LOAD_REVIEWS(state, loadReviews) {
      state.loadReviews=loadReviews
    },
    // 해당 review를 삭제
    DELETE_REVIEW(state, reviewDetail) {
      state.loadReviews.splice(state.loadReviews.indexOf(reviewDetail.id), 1)
    },
    // 수정한 reivew 다시 저장
    UPDATE_REVIEW(state, newReview) {
      state.loadReviews = state.loadReviews.map(review => {
        if (review.id === newReview.id) {
          return newReview
        } else {
          return review
        }
      })
    },
    // db에 저장된 comment를 front에 저장
    LOAD_COMMENTS(state, loadComments) {
      state.loadComments=loadComments
    },
    // 새 comment 저장
    CREATE_COMMENT(state, {newComment}){
      state.loadComments.push(newComment)
    },
    // comment 삭제
    DELETE_COMMENT(state, review) {
      state.loadComments.splice(state.loadComments.indexOf(review.id), 1)
    },
    // 수정한 comment 다시 front에 저장 
    UPDATE_COMMENT(state, newComment) {
      state.loadComments = state.loadComments.map(comment => {
        if(comment.id === newComment.id) {
          return newComment
        } else {
          return state.loadComments.push(newComment)
        }
      })
    },
    // tmdb에서 불러온 영화를 state에 저장함(이미 있는 영화는 제외시키는 !some)
    LOAD_TMDBINFO(state, movieTMDBinfo) {
      if (!state.loadTMDBinfolist.some(movie => movie.id === movieTMDBinfo.id)) {
        state.loadTMDBinfolist.push(movieTMDBinfo)
      }
    },
    // db에 저장된 별점정보 불러옴 
    LOAD_STARS(state, loadStars){
      state.loadStars=loadStars
    },
    // 새 별점주기
    CREATE_STAR(state, createItem){
      state.loadStars.push(createItem)
    },
    // 별점 state에서 삭제
    DELETE_STAR(state, deleteStar) {
      state.loadStars.splice(state.loadStars.indexOf(deleteStar.id), 1)
    },
    // 수정된 별점 state에 저장
    UPDATE_STAR(state, updateStar){
      state.loadStars = state.loadStars.map(star => {
        if (star.id === updateStar.id) {
          return updateStar
        } else {
          return state.loadStars.push(updateStar)
        }
      })
    },
    // db에 불러온 모든 user정보를 state에 저장
    LOAD_USER(state, loadUsers){
      state.loadUsers = loadUsers
    },

  },
  actions: {
    // login 함수로 token을 받아옴
    login: function({commit}, {username, password}){
      axios({
        method: 'post',
        url: 'http://localhost:8000/accounts/api-token-auth/', 
        data: {username, password}
      })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.token)
        commit('login', res.data.token)
        alert(`${username}님 환영합니다.`)
        router.push({name: 'Main'})
        console.log(res)
      })
      .catch((err) =>{
        console.log(err)
        alert('입력하신 정보를 다시 확인해 주세요.');
      })
    },
    // db에 저장된 movie를 front로 호출
    loadMovies: function ({ commit }) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/community/load_movies/',
      })
        .then(response => {
          commit('LOAD_MOVIES', response.data)
        })
    },
    // db에 저장된 review 전제 받아옴
    loadReviews: function ({ commit }) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'get', 
        url: 'http://127.0.0.1:8000/community/',
        headers: config
      })
        .then(response => {
          commit('LOAD_REVIEWS', response.data)
        })
        .catch(() =>{
          alert('로그인 후 함께해주세요.')
          router.push({name: 'Login' })
        })
    },
    // Review 생성
    createReview: function ({ commit }, review) {
      console.log(review)
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/community/',
        data: review,
        headers: config
      })
        .then(() => {
          commit('CREATE_REVIEWS', review)
        })
        .catch(() =>{
          alert('로그인 후 작성해주세요.')
          router.push({name: 'Login' })
        })
    },
    // Review 삭제
    deleteReview: function ({commit}, reviewDetail) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${reviewDetail.id}/`,
        headers: config
      })
        .then(() => {
          commit('DELETE_REVIEW', reviewDetail)
        })
        .catch(() =>{
          alert('삭제 권한이 없습니다.')
        })
    },
    // Review 수정
    updateReview: function ({commit}, newReview) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/community/${newReview.id}/`,
        data: newReview,
        headers: config
      })
        .then(() => {
          alert('리뷰가 수정되었습니다.')
          commit('UPDATE_REVIEW', newReview)
        })
        .catch(() =>{
          alert('수정 권한이 없습니다.')
        })
    },
    // db에 저장된 모든 comment 호출
    loadComments: function ({ commit }) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'get', 
        url: 'http://127.0.0.1:8000/community/comments/',
        headers: config
      })
        .then(response => {
          // console.log(response.data)
          commit('LOAD_COMMENTS', response.data)
        })
        .catch(() =>{
          alert('로그인 후 함께해주세요.')
          router.push({name: 'Login' })
        })
    },
    // 코멘트 생성
    CreateComment: function ({commit}, {review, newComment}) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/community/${review.id}/comment/`,
        data: newComment,
        headers: config
      })
        .then(() => {
          // console.log(res)
          commit('CREATE_COMMENT', {newComment})
        })
        .catch(() =>{
          alert('로그인 후 함께 해주세요')
          router.push({name: 'Login' })
        })
    },
    // comment 삭제
    deleteComment: function ({commit}, comment) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${comment.review}/comment/${comment.id}/`,
        headers: config
      })
        .then(() => {
          // console.log(res)
          commit('DELETE_COMMENT', comment)
          alert('댓글이 삭제 되었습니다.')
        })
        .catch(() =>{
          alert('삭제 권한이 없습니다.')
        })
    },
    // comment 수정
    updateComment: function ({commit}, newComment) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/community/${newComment.review}/comment/${newComment.id}/`,
        data: newComment,
        headers: config
      })
        .then(() => {
          // console.log(res)
          commit('UPDATE_COMMENT', newComment)
          alert('댓글이 수정되었습니다.')
        })
        .catch(() =>{
          alert('수정 권한이 없습니다.')
        })
    },
    // db내용을 검색한 TMDB 영화를 db에 저장하는 mutation 호출
    loadTMDBinfo: function ({commit}, movieTMDBinfo) {
      // console.log(movieTMDBinfo)
      commit('LOAD_TMDBINFO', movieTMDBinfo)
    },
    // db의 별점정보를 모두 호출
    loadStars: function ({commit}) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios ({
        method: 'get',
        url: 'http://127.0.0.1:8000/community/movies/starmovies/',
        headers: config
      })
      .then(response => {
        // console.log(response.data)
        commit('LOAD_STARS', response.data)
      })
      .catch(() =>{
        alert('로그인 후 함께 해주세요.')
        router.push({name: 'Login' })
      })
    },
    // db에 별점정보 추가
    createStar: function ({commit, dispatch}, createItem) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'post', 
        url: 'http://127.0.0.1:8000/community/movies/starmovies/',
        data: createItem,
        headers: config
      })
        .then((res) => {
          console.log(res)
          commit('CREATE_STAR', createItem)
          alert('별점이 등록되었습니다.')
        })
        .then(()=>{
          dispatch('loadStars')
        })
        .catch(() =>{
          alert('이미 별점을 준 기록이 있습니다.')
        })
    },
    // db에 별점정보 삭제
    deleteStar: function ({commit}, deleteStar) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/movies/${deleteStar.movie}/starmovies/${deleteStar.id}/`,
        headers: config
      })
        .then(() => {
          commit('DELETE_STAR', deleteStar)
          alert('평점이 삭제되었습니다.')
        })
        .catch(() =>{
          alert('삭제 권한이 없습니다.')
        })
    },
    // db에 별점정보 수정
    updateStar: function ({commit}, updateStar) {
      const token = localStorage.getItem('accessToken')
      const config = {
        Authorization: `JWT ${token}`
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/community/movies/${updateStar.movie}/starmovies/${updateStar.id}/`,
        data: updateStar,
        headers: config
      })
        .then(() => {
          commit('UPDATE_STAR', updateStar)
          alert('평점이 수정되었습니다.')
        })
        .catch(() =>{
          alert('수정 권한이 없습니다.')
        })
    },
    // db의 모든 유저정보 호출
    loadUsers: function ({commit}) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/accounts/get_username/',
      })
        .then(response => {
          console.log(response.data)
          commit('LOAD_USER', response.data)
        })
    },
  },
  modules: {
  }
})
