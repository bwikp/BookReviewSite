<script setup>
    import { ref } from 'vue';
    import axios from 'axios';

    const  search = ref("");
    const searchBook = async () => {
        console.log(search)
        const resultat = await axios.get('https://www.dbooks.org/api/search/'+search.value)
       console.log(resultat.data)
    }    
</script>

<template>
    <div class="nav">
        <a href='/'>LesLivres</a>
        <div class="thirdNav">
            <input type="text" @change="searchBook" class="navSearch"  placeholder="Enter the book of your dream" v-model="search" >
            <div>{{ search }}</div>
        </div>
        <div class="navlist">
            <a href="/login">Login</a>
            <a href="/login">mybook</a>
        </div>
    </div>
</template>