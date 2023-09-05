<script setup>
import { RouterView } from 'vue-router'
import Leheader from './components/Leheader.vue';

</script>

<template>
  <Leheader/>
  <RouterView :key="$route.path" />
</template>

<style scoped>
</style>
  