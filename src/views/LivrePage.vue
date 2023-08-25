<script setup>
    import { onBeforeMount, ref } from 'vue'
    import axios from 'axios';
    import { useRoute,useRouter } from 'vue-router';
    import Leheader from '../components/Leheader.vue';
    import jwtDecode from 'jwt-decode';
    const route = useRoute()
    const router = useRouter()

    const Token = localStorage.token
    const payload = jwtDecode(Token)
    const idBook = route.params.id
    const leLivre = ref([]);
    const fetchOneBook = async () => { 
        let aBook =  await  axios.get('https://www.dbooks.org/api/book/'+idBook) 
        // console.log(aBook.data)
        // console.log('a book',aBook.data)
        leLivre.value = aBook.data;
        return aBook;
    }
    
    const addOneBook = async () => {
        let tempo = await fetchOneBook();
        console.log('tempo',tempo.data);

            const bookinfo = {
                idlivre:leLivre.id,
                note:"Jack",
                livretitle:leLivre.title
            }
        let selected = await axios.request({
            headers: { Authorization: `Bearer ${Token}` },
            method: "POST",
            url: `http://localhost:8000/api/lib/new/${payload.id}`,
        },bookinfo).catch(function (error) {
        let code = error.response
                console.log(code)
            })
        
            
    }

    onBeforeMount(async () => {
  await fetchOneBook()
})
</script>
<template>
    <div class="LivreP">
        <div class="LivrePimg">
            <img v-bind:src='leLivre.image'/>
            <div class="livrePclick">
            <a :href="leLivre.download" class="DwdButton" >Download</a>
            <button class="addButton" @click="addOneBook()" >+</button>
            </div>
        </div>
        
        <div class="LivrePdes">
            <h2>{{ leLivre.title }}</h2>
            <h3>{{ leLivre.subtitle }}</h3>
            <p>description: {{ leLivre.description}}</p>
            <div>authors: {{ leLivre.authors }}</div>
            <div>publisher: {{ leLivre.publisher }}</div>
            <div> number of pages: {{ leLivre.pages }}</div>
            <div>year:{{ leLivre.year }}</div>
        </div>
    </div>
</template>