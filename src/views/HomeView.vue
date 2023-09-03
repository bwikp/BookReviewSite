<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';

const RecentBook = ref([]);
const fetchRecentBooks = async () => {
  let livre = await axios.get('https://www.dbooks.org/api/recent')
  console.log(livre.data)
  RecentBook.value = livre.data.books
  console.log(RecentBook.value)
}

onBeforeMount(async () => {
  await fetchRecentBooks()
})
</script>

<template>
  <div class="HomePage">
    <div class="gallery">
      <div v-for="item in RecentBook">
      <div class="zoneLivre" >
        <a v-bind:href="'/book/' + item.id"><img class="pimg" v-bind:src='item.image'></a>
        <div class="titleZonelib">
          <p class="title">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped></style>