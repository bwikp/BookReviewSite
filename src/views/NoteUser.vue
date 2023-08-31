<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const router = useRouter()
const route = useRoute();
const book = route.params.b.toLowerCase()
const Token = localStorage.token
const payload = jwt_decode(Token);
const Note = ref([])

const getlib = async () => { 
  let datalib =  await axios.request(
    {
        headers: {Authorization: `Bearer ${Token}`},
        method: "GET",
        url: `http://localhost:8000/api/lib/${payload.id}/${book}`
    }).catch(function (error)
        {
            console.log(error.response.status)
        })
    console.log(datalib.data)
    Note.value = datalib.data
}

const noteLivre = async () => {
    const NoteEdit = await axios.request(
        {
            headers: { Authorization: `Bearer ${Token}` },
            method: "PUT",
            url: `http://localhost:8000/api/lib/note/${payload.id}/${book}`
        }
    )
}
onBeforeMount(
    async () => {
        await getlib()
    }
)
</script>
<template>
    <h1>{{ Note.livretitle }}</h1>
    <div>
        <p>{{  Note.note }}</p>
        </div>
</template>