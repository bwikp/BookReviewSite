<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { RouterLink } from 'vue-router';


const email = ref('')
const password = ref('')
const router = useRouter()


const LoginCheck = async () => {
  const loginInfo = {
    username:email.value,
    password:password.value
  }
  const token = await axios.post('https://michel.cciformationlyon.fr/api/login_check',loginInfo)
  
  if (token.status == 200) {
    router.push({ name: 'home' })
    // window.location.assign("/")
    console.log("ok")
  } else {
    console.warn(token.statusText)
  }
//   console.log(token.data.token)
  localStorage.setItem('token',token.data.token)
  console.log(localStorage.token)
}


</script>

<template>
  <div class="login">
    <h2>Login</h2>
    <div class="loginZone">    
      <input type="text" placeholder="email" v-model="email" required>
      <input type="password" placeholder="password" v-model="password" required>
      <RouterLink class="linkLogin" to="/register">Sign in</RouterLink>
      <input class="DwdButton" type="button" value="login" @click="LoginCheck()">
    </div>
  </div>
</template>
<style scoped>
  .linkLogin{
    color: black;
    margin-left: 50%;
    text-decoration: underline;
  }
  
</style>