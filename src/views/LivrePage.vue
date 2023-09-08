<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import jwtDecode from 'jwt-decode';
import { decode } from 'html-entities';


const route = useRoute()
const router = useRouter()

const Token = localStorage.token
let payload = ""
if (localStorage.length !== 0) {

     payload = jwtDecode(Token)
}
const idBook = route.params.id.toLowerCase()
const leLivre = ref([]);
let   badSearch  = ref(false)

const fetchOneBook = async () => {
    // try{

    let aBook = await fetch('https://www.dbooks.org/api/book/' + idBook)
    if(!aBook.ok)
            {
                // throw new Error(`HTTP error! status: ${aBook.status}`);
                console.log(aBook.status)
                badSearch.value = true
            }
            else{
    const res = await aBook.json()
    leLivre.value = res;
    return res;
            }
    // }
    // catch(error)
    // {
    //     console.log(error)
    // }
    // console.log('aBook',aBook)
    // if(aBook.data.status === 'ok')
    //     {
    // return aBook;
    //     }
    // if(aBook.data.status !== ok )
    //     {
    //         badSearch.value  = !badSearch.value
    //     }
}


let added = ref(false);
const addOneBook = async () => {
    let tempo = await fetchOneBook();

    const bookinfo = {
        "idlivre": tempo.id,
        "note": "",
        "livretitle": tempo.title
    }
    await axios.request({
        headers: { Authorization: `Bearer ${Token}` },

        method: "POST",
        // url: `http://localhost:8000/api/lib/new/${payload.id}`,
           url: `https://michel.cciformationlyon.fr/api/lib/new/${payload.id}`,
        data: bookinfo
    }).then(function (response)
        {
            if(response.status === 200)
            {
                 added.value = true;
            }
        // console.log(response.status)
        }).catch(function (error)
            {
                if(error.response.status === 401)
                    {
                        router.push({ name: "login" })
                    }
                
            })
}

let userInfo = ref([])

const checkUser = async () => {
    let check = await axios.request(
        {
            headers: { Authorization: `Bearer ${Token}` },
            method: "GET",
            // url: `http://localhost:8000/api/user/${payload.id}`
            url: `https://michel.cciformationlyon.fr/api/user/${payload.id}`
        }
    )
    let tempo = await fetchOneBook();

    userInfo.value = check.data

    for (let i = 0; i < userInfo.value.lib.length; i++) {
        // console.log("partie 1", userInfo.value.lib[i].idlivre)
        if (userInfo.value.lib[i].idlivre == tempo.id) {
            added.value = true;
        }
    }
}

onBeforeMount(async () => {
    await fetchOneBook()
    if (localStorage.length !== 0) {
        await checkUser()
    }
})
</script>
<template>
    <div v-if="badSearch === false" class="LivreP">
        <div class="LivrePimg">
            <img v-bind:src='leLivre.image' />
            <div class="livrePclick">
                <a :href="leLivre.download" class="DwdButton">Download</a>
                <div v-if="added" class="valider">✅</div>
                <button v-else class="addButton" @click="addOneBook()">➕</button>
            </div>
        </div>

        <div class="LivrePdes">
            <h2>{{ decode(leLivre.title) }}</h2>
            <h3>{{ leLivre.subtitle }}</h3>
            <p>description: {{ decode(leLivre.description) }}</p>
            <div>authors: {{ decode(leLivre.authors) }}</div>
            <div>publisher: {{ decode(leLivre.publisher) }}</div>
            <div> number of pages: {{ leLivre.pages }}</div>
            <div>year:{{ leLivre.year }}</div>
        </div>
    </div>
    <div class="badSearch" v-else>
        <h1> That book will exist someday but for now it doesn't </h1>
  </div>
</template>
<style scoped>

</style>