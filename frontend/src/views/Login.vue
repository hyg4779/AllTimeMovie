<template>
  <div id="login" class="pt-5">
    <p class="fs-1">Login</p>
    <b-form
      @submit="login"
      @reset="onReset"
      class="formEdge"
      v-if="show">
      <b-form-group id="username" label="username" label-for="username" class="loginForm">
        <b-form-input
          class="fs-4"
          id="username"
          v-model="form.username"
          type="text"
          autofocus="autofocus" 
          placeholder="Enter ID"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password" label="Password" label-for="Password" class="loginForm">
        <b-form-input
          id="password"
          class="fs-4"
          v-model="form.password"
          type="password"
          placeholder="Enter Password"
          required
          description="We'll never share your id with anyone else."
        ></b-form-input>
      </b-form-group>

      <div style="display: flex">
        <b-button type="submit" variant="info" class="m-1 p-2 fs-4 mx-4">Submit</b-button>
        <b-button type="reset" variant="danger" class="m-1 p-2 fs-4 mx-4">Reset</b-button>
      </div>
    </b-form>
  </div>

</template>

<script>
// import axios from 'axios'

export default {
  name: 'Singup',
  data () {
    return {
      form:{
        username: '',
        password: '',
      },
      show: true,
    }
  },
  methods: {
    login: function (event) {
      event.preventDefault()
      const payload = {
        username: this.form.username,
        password: this.form.password,
      }
      this.$store.dispatch('login', payload)
      
    },
    onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.username = ''
        this.form.password = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
    }
  }
}
</script>
<style scoped>
  #login{
    color: silver;
  }
  h2{
    margin-top:5rem
  }
  .formEdge{
    display: flex;
    flex-direction: column;
    align-items: center;
  
  }
  .loginForm{
    padding:2%;
    max-width: 80%;
  }
</style>
