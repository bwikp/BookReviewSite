<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute,RouterLink } from 'vue-router';
import axios from 'axios';
import { decode } from 'html-entities';
const route = useRoute()

const search = route.params.sq;
const rSearch = ref([]);
const badSearch = ref(false)
const searchBook = async () => {
    await axios.get('https://www.dbooks.org/api/search/' + search)
  .then(function (response)
  {
    console.log(response.data)

    if(response.data.status == "ok")
    {
    rSearch.value = response.data.books
    }
    else {
      badSearch.value = !badSearch.value
    }
  }).catch(function (error)
    {
        console.log(error.status)
    })

  // rSearch.value = resultat.data.books

}

onBeforeMount(async () => {
  await searchBook()
})
</script>
<template>
  <div v-if="badSearch === false" class="HomePage">
    <div  class="gallery">
      <div v-for="item in rSearch">
      <div class="zoneLivre">
        <RouterLink v-bind:to="'/book/' + item.id"><img class="pimg" v-bind:src='item.image'></RouterLink>
        <div class="titleZonelib">
          <p class="title">{{ decode(item.title) }}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="badSearch" v-else>
        <h1>Sadly We don't have what you're looking for </h1>
  </div>
</template>
<style>
  .badSearch{
      margin: 5%;
      text-align: center;
  }
</style>