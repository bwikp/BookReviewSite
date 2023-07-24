<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';





const email = ref('')
const password = ref('')
const router = useRouter()

const LoginCheck = async () => {
  const loginInfo = {
    username:email.value,
    password:password.value
  }
  const token = await axios.post('http://localhost:8000/api/login_check',loginInfo)
  
  if (token.status == 200) {
    router.push({ name: 'home' })
    console.log("ok")
  } else {
    console.warn(token.statusText)
  }

//   console.log(token.data.token)
  localStorage.setItem('token',token.data.token)
  console.log(localStorage)
}


</script>

<template>
  <div class="login">
    <input type="text" placeholder="email" v-model="email">
    <div>{{ email }}</div>
    <input type="text" placeholder="password" v-model="password">
    <input type="button" value="login" @click="LoginCheck()">
  </div>
</template>
<style scoped></style>