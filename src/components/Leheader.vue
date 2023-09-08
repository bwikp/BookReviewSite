<script setup>
import { ref } from 'vue';
import { useRouter,RouterLink } from 'vue-router';
const search = ref("");
const router = useRouter()
const Token = localStorage.token
const searchBook = async () => {
    // const resultat = await axios.get('https://www.dbooks.org/api/search/' + search.value)
    // console.log(resultat.data)
    // console.log(search.value)
    // rSearch.value = resultat.data.books
    router.push({path: '/search/'+search.value})
}
let show = ref(false);

</script>

<template>
    <div class="nav">
        <div class="zoneNav"><RouterLink to='/'><img src="../assets/book-wnb.png"></RouterLink></div>
        <div id="SearchMobile" class="thirdNav zoneNav ">
            <input type="text" @change="searchBook" class="navSearch" placeholder="Search" v-model="search">
            <p class="searchButton" @click="searchBook">🔎</p>
        </div>
        <div class="navlist zoneNav pasMobile">
            <RouterLink v-if="Token != null" to="/logout">Logout</RouterLink>
            <RouterLink v-else to="/login">Login</RouterLink>
            <RouterLink to="/library">MyLibrary</RouterLink>
        </div>
        <div class="burgerMenu" @click="show = !show">
            <div class="burgerLine"></div>
            <div class="burgerLine"></div>
            <div class="burgerLine"></div>
        </div>
    </div>
    <div v-show="show" class="menuSlide">
        <RouterLink v-if="Token != null" to="/logout">Logout</RouterLink>
        <RouterLink v-else to="/login">Login</RouterLink>
        <RouterLink to="/library">MyLibrary</RouterLink>
    </div>
</template>