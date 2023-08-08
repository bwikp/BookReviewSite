<script setup>
    import { onBeforeMount, ref } from 'vue'
    import axios from 'axios';
    import { useRoute,useRouter } from 'vue-router';
    import Leheader from '../components/Leheader.vue';
    const route = useRoute()
    const router = useRouter()

    const idBook = route.params.id
    const leLivre = ref([])
    const fetchOneBook = async () => {
        let aBook = await axios.get('https://www.dbooks.org/api/book/'+idBook)
        // console.log(aBook.data)
        // console.log(aBook.value)
        leLivre.value = aBook.data        
        console.log(leLivre.value)
    }

    onBeforeMount(async () => {
  await fetchOneBook()
})
</script>
<template>
    <div class="LivreP">
        <div class="LivrePimg">
            <img v-bind:src='leLivre.image' />
            <div class="livrePclick">
            <a v-bind:href="leLivre.download" class="DwdButton" ><button  value="download">Download</button></a>
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