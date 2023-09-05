<script setup>
import { ref } from 'vue';
import { useRouter,RouterLink } from 'vue-router';
import axios from 'axios';

const email = ref('')
const password = ref('')
const first_name = ref('')
const last_name = ref('')
const router = useRouter()

const regexMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const regexPassword = /^.{6,}$/

const registerUser = async () => {
    const infoUser = {
        email: email.value,
        password: password.value,
        first_name: first_name.value,
        last_name: last_name.value
    }
    const questRegister = await axios.post('https://michel.cciformationlyon.fr/api/register', infoUser)

    if(questRegister.status == 200)
        {
            router.push({ name: 'home' })
        }
}
</script>
<template>
    <div class="formRegister">
        <h2>Register</h2>
        <div class="RegisterZone">
            <label for="email">email</label> 
            <input type="email" name="email" placeholder="email" r v-model="email" />
            <p v-if="!regexMail.test(email) && email != '' ">please enter a valid mail adress !!!</p>
            <label for="password">password</label>
            <input type="password" name="password" placeholder="password"  v-model="password">
            <p v-if="!regexPassword.test(password) && password != '' "> At least 6 characters</p>
            <label for="fname">first name</label>
            <input type="text" name="fname" placeholder="first_name"  v-model="first_name">
            <label for="lname">last name</label>
            <input type="text" name="lname" placeholder="last_name"  v-model="last_name">
            <RouterLink class="linkRegister" to="/login">Sign up</RouterLink>
            <input v-if="regexMail.test(email) == true  && regexPassword.test(password) == true " id="DwdRegister" type="button" value="register"  @click="registerUser()">
        </div>
    </div>
</template>
<style scoped>
.linkRegister{
    color: black;
    margin-left: 50%;
    text-decoration: underline;
  }

  .RegisterZone p{
    color: red;
  }
  
</style>