<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const search = ref("");
const rSearch = ref([]);
const router = useRouter()
const Token = localStorage.token
const searchBook = async () => {
    const resultat = await axios.get('https://www.dbooks.org/api/search/' + search.value)
    console.log(resultat.data)
    console.log(search.value)
    rSearch.value = resultat.data.books
    // console.log(rSearch.value)
    // router.push({path: '/search/'+search.value})
    location.replace('/search/' + search.value)
}
</script>

<template>
    <div class="nav">
        <div class="zoneNav"><a href='/'><img src="../assets/book-wnb.png"></a>
        </div>
        <div class="thirdNav zoneNav pasMobile">
            <input type="text" @change="searchBook" class="navSearch" placeholder="Search"
                v-model="search">
            <p class="searchButton">🔎</p>
        </div>
        <div class="navlist zoneNav pasMobile">
            <a v-if="Token != null" href="/logout">Logout</a>
            <a v-else href="/login">Login</a>
            <a href="/library">MyLibrary</a>
        </div>
        <div class="burgerMenu">
               <div></div>
               <div></div>
               <div></div>
        </div>
    </div>
</template>