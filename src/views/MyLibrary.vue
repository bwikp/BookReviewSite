<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import jwt_decode from "jwt-decode";

const router = useRouter()

if (localStorage.length === 0) {
    // router.push({ name: "login" })
    window.location.assign("/login")
}

const Token = localStorage.token

const payload = jwt_decode(Token);
// console.log(localStorage.token)
// const decoded = jwt_decode(jwt)
// console.log(payload)
const userUser = ref([]);
const defArray = ref([]);

const test = async () => {

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
    userUser.value = userToPut.data;

    //  console.log(userToPut.value)
    let libArray = [];
    // let tempArray = [];
    for (let i = 0; i < userUser.value.lib.length; i++) {
        //    console.log(userUser.value.lib[i].idlivre);
        libArray.push(userUser.value.lib[i].idlivre)
        //    console.log(libArray)
        // tempArray.push(await axios.get('https://www.dbooks.org/api/book/' + libArray[i]))
        defArray.value.push(await axios.get('https://www.dbooks.org/api/book/' + libArray[i]))
        //    console.log(tempArray)
    }
    console.log(tempArray[0].data)

    // defArray.value = tempArray
}


const delBook = async (id, user) => {
console.warn(id);
    const index = defArray.value.findIndex(item => item.data.id === user);
  if (index !== -1) {
    defArray.value.splice(index, 1);
  }

    await axios.request({
        headers: { Authorization: `Bearer ${Token} ` },
        method: "DELETE",
        url: `http://localhost:8000/api/lib/delete/${id}/${user}`
    }).catch(function (error) {
        console.log(error)
    }
    )
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
                    <div class="suppButton" @click="delBook(userUser.id, liv.data.id)">
                        <div></div>
                    </div>
                    <a v-bind:href="'/book/' + liv.data.id"><img class="pimg" v-bind:src='liv.data.image' /></a>
                    <div class="titleZone">
                        <p class="title">{{ liv.data.title }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>