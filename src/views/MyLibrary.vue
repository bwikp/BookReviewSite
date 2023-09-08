<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { useRouter,RouterLink } from 'vue-router';
import jwt_decode from "jwt-decode";
import { decode } from 'html-entities';

const router = useRouter()

if (localStorage.length === 0) {
    window.location.assign("/login")
}
decode('&lt; &gt; &quot; &apos; &amp; &#169; &#8710;&#039;s ;');
const Token = localStorage.token

const payload = jwt_decode(Token);
const userUser = ref([]);
const defArray = ref([]);

const test = async () => {

    const userToPut = await axios.request({
        headers: { Authorization: `Bearer ${Token} ` },
        method: "GET",
        url: `https://michel.cciformationlyon.fr/api/user/${+payload.id}`
    }).catch(function (error) {
        let code = error.response.status
        if (code === 401) {
            router.push({ name: 'login' })
        }
    }
    )
    userUser.value = userToPut.data;

    let libArray = [];
    for (let i = 0; i < userUser.value.lib.length; i++) {
        libArray.push(userUser.value.lib[i].idlivre.toLowerCase())
        defArray.value.push(await axios.get('https://www.dbooks.org/api/book/' + libArray[i]))
    }
}
const delBook = async (id, user) => {
    const index = defArray.value.findIndex(item => item.data.id === user);
  if (index !== -1) {
    defArray.value.splice(index, 1);
  }

    await axios.request({
        headers: { Authorization: `Bearer ${Token} ` },
        method: "DELETE",
        // url: `http://localhost:8000/api/lib/delete/${id}/${user}`
           url: `https://michel.cciformationlyon.fr/api/lib/delete/${id}/${user}`
    }).catch(function (error) {
        console.log(error.response.status)
    }
    )
    // https://michel.cciformationlyon.fr/
}
console.log(userUser.value)

onBeforeMount(async () => {
    await test();
})

</script>
<template>
    <div class="HomePage">
        <h1 class="libTitle">{{ userUser.last_name }}'s Library</h1>
        <div class="gallery">
            <div v-for="liv in defArray" :key="liv.data.id">
                <div @click="" class="zoneLivre">
                    <div class="noteButton" >
                        <RouterLink v-bind:to="'/note/' + liv.data.id">📝</RouterLink>
                    </div>
                    <div class="suppButton" @click="delBook(userUser.id, liv.data.id)">
                         <div>❌</div>
                    </div>
                    <RouterLink v-bind:to="'/book/' + liv.data.id"><img class="pimg" v-bind:src='liv.data.image' /></RouterLink>
                    <div class="titleZonelib">
                        <p class="title">{{ decode(liv.data.title) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
