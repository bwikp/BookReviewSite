<script setup>
import { RouterView } from 'vue-router'
import Leheader from './components/Leheader.vue';

</script>

<template>
  <Leheader class="leHead" />
  <RouterView class="page" :key="$route.path" />
</template>

<style scoped>
</style>
  