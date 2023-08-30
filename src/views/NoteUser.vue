<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const router = useRouter()
const route = useRoute();
const book = route.params.b
const Token = localStorage.token
const payload = jwt_decode(Token);

const titleNote = ref([])
const getUser = async () =>
{
    const userToPut = await axios.request({
        headers: { Authorization: `Bearer ${Token} ` },
        method: "GET",
        url: `http://localhost:8000/api/user/${+payload.id}`
    }).catch(function (error) {
        let code = error.response.status
        if (code === 401) {
            router.push({ name: "login" })
        }
    }
    )
    console.log(userToPut.data)
    titleNote.value = userToPut.data

}
onBeforeMount(
    async () => {
        await getUser()
    }
)
</script>
<template>{{ titleNote }}</template>