<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import jwt_decode from "jwt-decode";

if( localStorage.token == null || localStorage.token == "expired")
    {
        window.location = "/login"
    }
const Token = localStorage.token

const payload = jwt_decode(Token);
// console.log(localStorage.token)
// const decoded = jwt_decode(jwt)
// console.log(payload)
const userUser = ref([]);

const test =  async () => {
    const userToPut = await axios.get('http://localhost:8000/api/user/'+payload.id);
    // console.log(userToPut.data.Object)
    userUser.value = userToPut.data;
    console.log(userUser.value.lib[0])
}


onBeforeMount(async () => {
  await test();
})

</script>
<template>
 <div>{{ userUser.first_name }}</div>
 <div>{{ userUser.last_name }}</div>

  </template>