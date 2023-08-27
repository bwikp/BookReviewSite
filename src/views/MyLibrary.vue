<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import jwt_decode from "jwt-decode";

const router = useRouter()

const Token = localStorage.token
const payload = jwt_decode(Token);
// console.log(localStorage.token)
// const decoded = jwt_decode(jwt)
// console.log(payload)
const userUser = ref([]);

const test = async () => {

    const userToPut = await axios.request({
        headers: { Authorization: `Bearer ${Token} ` },
        method: "GET",
        url: `http://localhost:8000/api/user/${+payload.id}`
    }).catch(function (error) {
        let code = error.response.status
        if (code === 401 || Token == null) {
            router.push({ name: "login" })
        }
    }
    )
    userUser.value = userToPut.data;




    //  console.log(userToPut.value)
    // console.log(userUser.value.lib[0])
}


onBeforeMount(async () => {
    await test();
})

</script>
<template>
    <div>{{ userUser.first_name }}</div>
    <div>{{ userUser.last_name }}</div>
    <div v-for="item in userUser.lib">
        {{ item }}
    </div>
</template>