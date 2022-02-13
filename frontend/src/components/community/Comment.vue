<template>
  <div>
    <div class="container">
        <div class="table-wrap">
            <table class="table table-responsive table-borderless">
                <tbody id="comment-list">
                    <tr 
                      class="align-center alert border-bottom row" 
                      role="alert"
                    >
                        <td class="col d-flex">
                          <div class="fw-600">
                            <div 
                              v-show = "edit == false"
                              id="text-div"
                            >
                              <label id="update-text" 
                                @dblclick = "edit = true"
                              > 
                                <p>{{comment.text}}</p>
                                
                              </label>
                            </div>
                            <input 
                              v-show = "edit == true" 
                              v-model = "comment.text"
                              @keyup.enter="updateComment(comment)"
                            >
                          </div>
                        </td>
                        <!-- <td class="text-center"> </td> -->
                        <td class="col-1">
                            <div>
                                <p class="m-0 fw-bold"></p>
                                <p class="m-0 text-muted">{{loadUsers[0].username}}</p>
                            </div>
                        </td>
                        <td class="col-2"> 
                          <b-button class="mx-2" @click="updateComment(comment)">수정</b-button>
                          <b-button class="mx-2" @click="deleteComment(comment)">삭제</b-button>
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
  name: 'Comment',
  props: {
    comment: {
      type: Object,
    },
  },
  data: function () {
    return {
      edit :false,
      editedComment: null,
    }
  },
  methods: {
    deleteComment: function (comment) {
      // console.log(comment)
      this.$store.dispatch('deleteComment', comment)
      .then(() => {
        this.$store.dispatch('loadComments')
      })
    },
    updateComment: function (comment) {
      // console.log(comment)
      this.edit = false
      this.$store.dispatch('updateComment', comment)
        .then(() => {
          this.$store.dispatch('loadComments')
        })
    }
  },
  computed:{
    loadUsers () {
      return this.$store.state.loadUsers.filter(user => user.id === this.comment.user)
    }
  }
}
</script>

<style>
#comment-list {
  color: white;
  display: flex;
  flex-direction: column;
}
.table > tbody > tr > td {
  height:50px;
}
#update-text:hover { 
  cursor: pointer;
}
#text-div {
  text-align:left;
}

</style>