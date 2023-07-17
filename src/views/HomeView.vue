<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const search = ref();
const RecentBook = ref([]);

const fetchRecentBooks = async () => {
  const livre = await axios.get('https://www.dbooks.org/api/recent')
  console.log(livre.data.books[0])
  RecentBook.value = livre.data.books
}
onBeforeMount(async () => {
  await fetchRecentBooks()
})
</script>

<template>
  <div class="HomePage"  >
    <div class="gallery" >
    <div class="zoneLivre" v-for="item in  RecentBook">
      <img v-bind:src='item.image' />
      <div>{{ item.title }}</div>
    </div>
  </div>
  </div>
</template>
<style scoped></style>