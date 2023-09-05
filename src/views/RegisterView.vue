<script setup>
import { ref } from 'vue';
import { useRouter,RouterLink } from 'vue-router';
import axios from 'axios';

const email = ref('')
const password = ref('')
const first_name = ref('')
const last_name = ref('')
const router = useRouter()

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
            <input type="email" name="email" placeholder="email" required="required" v-model="email">
            <label for="password">password</label>
            <input type="password" name="password" placeholder="password" required="required" v-model="password">
            <label for="fname">first name</label>
            <input type="text" name="fname" placeholder="first_name" required="required" v-model="first_name">
            <label for="lname">last name</label>
            <input type="text" name="lname" placeholder="last_name"  required="required" v-model="last_name">
            <RouterLink class="linkRegister" to="/login">Sign up</RouterLink>
            <input id="DwdRegister" type="button" value="register"  @click="registerUser()">
        </div>
    </div>
</template>
<style scoped>
.linkRegister{
    color: black;
    margin-left: 50%;
    text-decoration: underline;
  }
  
</style>