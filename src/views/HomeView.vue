<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import Leheader from '../components/Leheader.vue';
const RecentBook = ref([]);
import jwt_decode from "jwt-decode";
const fetchRecentBooks = async () => {
  let livre = await axios.get('https://www.dbooks.org/api/recent')
  console.log(livre.data)
  RecentBook.value = livre.data.books
  // console.log(RecentBook.value)
}
console.log(localStorage.token)
const jwt = localStorage.token
const decoded = jwt_decode(jwt)
console.log(decoded)

  console.log(decoded.username)
onBeforeMount(async () => {
  await fetchRecentBooks()
})
</script>

<template>
  <div class="HomePage"  >  
    <div class="gallery" >
    <div class="zoneLivre" v-for="item in RecentBook">
      <a v-bind:href="'/book/'+item.id" ><img class="pimg" v-bind:src='item.image'></a>
        <div class="titleZone">
      <p class="title">{{ item.title }}</p>
        </div>
    </div>
  </div>
  </div>
</template>
<style scoped></style>