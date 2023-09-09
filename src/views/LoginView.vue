<script setup>
import { ref } from 'vue';
import { useRouter,RouterLink } from 'vue-router';
import axios from 'axios';


const email = ref('')
const password = ref('')
const router = useRouter()


const regexMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const regexPassword = /^.{6,}$/

const LoginCheck = async () => {
  const loginInfo = {
    username: email.value,
    password: password.value
  }
  const token =
    // await axios.post('http://localhost:8000/api/login_check', loginInfo)
   await axios.post('https://michel.cciformationlyon.fr/api/login_check',loginInfo)

  if (token.status == 200) {
    // router.push({ name: 'home' })
    window.location.replace('/')
    // window.location.assign("/")
    console.log("ok")
  } else {
    console.warn(token.statusText)
  }
  //   console.log(token.data.token)
  localStorage.setItem('token', token.data.token)
  console.log(localStorage.token)

          }

</script>

<template>
  <div class="login">
    <h2>Login</h2>
    <div class="loginZone">
      <label for="email">email</label>
      <input type="text" name="email" placeholder="email" v-model="email" />
      <p v-if="!regexMail.test(email) && email != ''">please enter a valid mail adress !!!</p>
      <label for="password">password</label>
      <input type="password" name="password" placeholder="password" v-model="password">
      <RouterLink class="linkLogin" to="/register">Sign in</RouterLink>
      <p v-if="!regexPassword.test(password) && password != ''"> At least 6 characters</p>
      <input v-if="regexMail.test(email) == true && regexPassword.test(password) == true" class="DwdButton"
        type="button" value="login" @click="LoginCheck()">
    </div>
  </div>
</template>
<style scoped>
.linkLogin {
  color: black;
  margin-left: 50%;
  text-decoration: underline;
}

.loginZone {
  color: black;
}

.loginZone p {
  color: red;
}
</style>