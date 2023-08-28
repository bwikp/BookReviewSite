<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()
    localStorage.clear();
    // router.push({ name: 'home' })
    window.location.replace("/")
</script>
<template>
    <h1>LOGGED OUT</h1>
</template>