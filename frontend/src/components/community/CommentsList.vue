<template>
  <div id="reviewWcomment-list">
    <form 
      id="input-comment-form"
      action=""
      @submit="CreateComment"
      class="row"
    >
      <p class="col-3"></p>
      <input 
        type="text"
        v-model.trim="newComment"
        class="col-5"
      >
      <b-button class="col-1" @click="CreateComment">댓글 작성</b-button>
      <p class="col-3"></p>
    </form>
    <Comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
import Comment from '@/components/community/Comment'

export default {

  name: 'CommentList',
  components: {
    Comment
  },
  props: {
    reviewDetail: {
      type: Object,
    },
  },
  data: function () {
    return {
      review: this.$props.reviewDetail,
      newComment: ''
    }
  },
  computed: {
    comments () {
      return this.$store.state.loadComments.filter(comment => comment.review === this.review.id)
    }
  },
  methods: {
    CreateComment: function (event) {
      event.preventDefault()
      const review = this.review
      const newComment = {
        text: this.newComment
      }
      if (newComment.text) {
        this.$store.dispatch('CreateComment', {
          review: review,
          newComment: newComment
        })
        .then(() => {
          alert('댓글이 등록되었습니다.')
          this.$store.dispatch('loadComments')
        })
      }
      this.newComment = ''
    }
  }
}
</script>

<style scoped>
#reviewWcomment-list {
  display: flex;
  flex-direction: column;
}
</style>