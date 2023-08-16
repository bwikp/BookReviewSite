<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useRouter } from 'vue-router';
const router = useRouter()
if( localStorage.token == null)
    {
        window.location = "/login"
    }
console.log(localStorage.token)
const jwt = localStorage.token
const decoded = jwt_decode(jwt)
console.log(decoded)
</script>
<template>
<div>LES</div>    
  </template>