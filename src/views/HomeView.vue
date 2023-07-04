<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios';

const email = ref('')
const password = ref('')
const router = useRouter()

const LoginCheck = async () => {
  const loginInfo = {
    username:email.value,
    password:password.value
  }
  const tryLogin = await axios.post('http://localhost:8000/api/login_check',loginInfo)
  // .then( function(response) {console.log( response.data)})
  // if (tryLogin.status == 200) {
  //   router.push({ name: 'home' })
  //   console.log("ok")
  // } else {
  //   console.warn(tryLogin.statusText)
  // }
  console.log(tryLogin.data.token)
}


</script>

<template>
  <div class="login">
    <input type="text" placeholder="email" v-model="email">
    <input type="text" placeholder="password" v-model="password">
    <input type="button" value="login" @click="LoginCheck()">
  </div>
</template>
<style scoped></style>