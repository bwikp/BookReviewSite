<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import Leheader from '../components/Leheader.vue';
import axios from 'axios';
    const route = useRoute()

    const  search = route.params.sq;
    const  rSearch = ref([]);
    const  router = useRouter()
    
const searchBook = async () => {
        const resultat = await axios.get('https://www.dbooks.org/api/search/'+search)
        // console.log(resultat.data)
        rSearch.value = resultat.data.books
        // console.log(rSearch.value)
        // router.push({path: '/book/'})
        }

onBeforeMount(async () => {
  await searchBook()
})
</script>
<template>
  <div class="HomePage"  >
    <div class="gallery" >
    <div class="zoneLivre" v-for="item in rSearch">
      <a v-bind:href="'/book/'+item.id" ><img class="pimg" v-bind:src='item.image'></a>
      <p class="title">{{ item.title }}</p>
    </div>
  </div>
  </div>
</template>
<style scoped></style>