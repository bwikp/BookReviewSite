<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Leheader from '../components/Leheader.vue';

const search = ref();
const RecentBook = ref([]);

const fetchRecentBooks = async () => {
  let livre = await axios.get('https://www.dbooks.org/api/recent')
  console.log(livre.data)
  RecentBook.value = livre.data.books
}
onBeforeMount(async () => {
  await fetchRecentBooks()
})
</script>

<template>
    <Leheader></Leheader>
  <div class="HomePage"  >
    <div class="gallery" >
    <div class="zoneLivre" v-for="item in RecentBook">
      <img v-bind:src='item.image' />
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
  </div>
</template>
<style scoped></style>