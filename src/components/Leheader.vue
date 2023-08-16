<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
import { useRouter } from 'vue-router';

    const  search = ref("");
    const  rSearch = ref([]);
    const  router = useRouter()

    const searchBook = async () => {
        const resultat = await axios.get('https://www.dbooks.org/api/search/'+search.value)
        console.log(resultat.data)
        console.log(search.value)
        rSearch.value = resultat.data.books
        // console.log(rSearch.value)
        // router.push({path: '/search/'+search.value})
        location.replace('/search/'+search.value)
        }
</script>

<template>
    <div class="nav">
        <a href='/'>LesLivres</a>
        <div class="thirdNav">
            <input type="text" @change="searchBook" class="navSearch"  placeholder="Enter the book of your dream" v-model="search" >
            <div class="searchButton">🔎</div> 
        </div> 
        <div class="navlist">
            <a href="/login">Login</a>
            <a href="/library">Mylibrary</a>
        </div>
    </div>
</template>