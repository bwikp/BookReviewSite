<script setup>
    import { ref } from 'vue';
    import axios from 'axios';

    const  search = ref("");
    const  rSearch = ref([]);

    const searchBook = async () => {
        const resultat = await axios.get('https://www.dbooks.org/api/search/'+search.value)
        // console.log(resultat.data)
        rSearch.value = resultat.data.books
        console.log(rSearch.value)
}
</script>

<template>
    <div class="nav">
        <a href='/'>LesLivres</a>
        <div class="thirdNav">
            <input type="text" @change="searchBook" class="navSearch"  placeholder="Enter the book of your dream" v-model="search" >
        </div>
        <div class="navlist">
            <a href="/login">Login</a>
            <a href="/login">mybook</a>
        </div>
    </div>
</template>