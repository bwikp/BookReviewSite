<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { onBeforeMount } from 'vue';
import axios from 'axios';
import Leheader from './components/Leheader.vue';

  const Allcategorie = ref([])
  const fetchAllCatego = async ()=>{
          const categorie = await axios.get('http://localhost:8000/api/categorie/4')
          console.log(categorie.data)
          Allcategorie.value = categorie.data
  }

  onBeforeMount( async ()=>{
        await fetchAllCatego()
     })
</script>

<template>
  <Leheader/>
  <RouterView />
</template>

<style scoped>
</style>
  