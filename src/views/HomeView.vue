<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import Leheader from '../components/Leheader.vue';

const RecentBook = ref([]);

const fetchRecentBooks = async () => {
  let livre = await axios.get('https://www.dbooks.org/api/recent')
  console.log(livre.data)
  RecentBook.value = livre.data.books
  // console.log(RecentBook.value)
}
onBeforeMount(async () => {
  await fetchRecentBooks()
})
</script>

<template>
  <div class="HomePage"  >
    <div class="gallery" >
    <div class="zoneLivre" v-for="item in RecentBook">
      <a v-bind:href="'/book/'+item.id" ><img class="pimg" v-bind:src='item.image'></a>
      <p class="title">{{ item.title }}</p>
    </div>
  </div>
  </div>
</template>
<style scoped></style>