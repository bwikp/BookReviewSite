<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
    const questRegister = await axios.post('http://localhost:8000/api/register', infoUser)

    if(questRegister.status == 200)
        {
            router.push({ name: 'home' })
        }
}
</script>
<template>
    <div class="formRegister">
        <input type="text" placeholder="email" v-model="email">
        <input type="text" placeholder="password" v-model="password">
        <input type="text" placeholder="first_name" v-model="first_name">
        <input type="text" placeholder="last_name" v-model="last_name">
        <input type="button" value="register"  @click="registerUser()">
    </div>
</template>