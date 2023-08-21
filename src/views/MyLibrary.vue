<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useRouter } from 'vue-router';
const router = useRouter()
if( localStorage.token == null)
    {
        window.location = "/login"
    }
    
const Token = localStorage.token
const payload = jwt_decode(Token);
// console.log(localStorage.token)
// const decoded = jwt_decode(jwt)
const userUser = ref([]);

const test =  async () => {
    const userToPut = await axios.get('http://localhost:8000/api/user/'+payload.id);
    userUser.value = userToPut.data;
    console.log(userUser.value)
}


onBeforeMount(async () => {
  await test();
})


// console.log(payload)
// console.log(payload.id)
</script>
<template>
 <div>{{ userUser.first_name }}</div> 
  </template>