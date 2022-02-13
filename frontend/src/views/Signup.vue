<template>
  <div id="signup" class="pt-5">
    <p class="fs-1">Signup</p>
    <b-form
      @submit="signup"
      @reset="onReset"
      class="formEdge"
      v-if="show">
      <b-form-group id="username" label="username" label-for="username" class="signupForm">
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

      <b-form-group id="password" label="Password" label-for="Password" class="signupForm">
        <b-form-input
          class="fs-4"
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter Password"
          required
          description="We'll never share your id with anyone else."
        ></b-form-input>
      </b-form-group>

      <b-form-group id="passwordConfirmation" label="Password Confirmation" label-for="passwordConfirmation" class="signupForm">
        <b-form-input
          class="fs-4"
          id="passwordConfirmation"
          v-model="form.password_confirmation"
          type="password"
          placeholder="Check the password"
          required
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
import axios from 'axios'

export default {
  name: 'Singup',
  data () {
    return {
      form:{
        username: '',
        password: '',
        password_confirmation: '',
      },
      show: true,
    }
  },
  methods: {
    onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.username = ''
        this.form.password = ''
        this.form.password_confirmation = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
    },    
    signup: function (event) {
      event.preventDefault()
      axios({
        method: 'post',
        url: 'http://localhost:8000/accounts/signup/',
        data: {
          username: this.form.username,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
        }
      })
      .then(() => {
        alert('회원가입에 성공했습니다. 로그인해 주십시오')
        this.$router.push({name:'Login'})
      })
      .catch((err) => {
        alert('입력하신 정보를 다시 확인해 주세요.')
        console.log(err)
      })
      .finally(() => {
        this.onReset()
      })
      
    },
    
  }
}
</script>
<style scoped>
  #signup{
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
  .signupForm{
    padding:2%;
    max-width: 80%;
  }
</style>
