<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
const RecentBook = ref([]);
const fetchRecentBooks = async () => {
  let livre = await axios.get('https://www.dbooks.org/api/recent')
  RecentBook.value = livre.data.books
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
        <RouterLink v-bind:to="'/book/' + item.id"><img class="pimg" v-bind:src='item.image'></RouterLink>
        <div class="titleZonelib">
          <p class="title">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped></style>