<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { useRouter,RouterLink } from 'vue-router';
import jwt_decode from "jwt-decode";

    const router = useRouter()
    const dataUser = ref([])
    if(localStorage.length === 0)
        {
            window.location.assign("/login") 
        }
        const Token = localStorage.token
        const payload = jwt_decode(Token)
    const userData  = async ()=>
    {
        const fetchUserData = await axios.request({
            headers: { Authorization: `Bearer ${Token} ` },
            method: "GET",
        // url: `https://michel.cciformationlyon.fr/api/user/${+payload.id}`
        url: `http://localhost:8000/api/user/${+payload.id}`
        }).catch(function (error)
            {
                let code = error.response.status
                if(code === 401)
                    {
                        router.push({ name: 'login' })
                    }
            })
            dataUser.value = fetchUserData.data
    console.log("user",dataUser.value)

    }

    onBeforeMount( async()=>{
      await  userData()
    })
</script>
<template>
        <div>{{ dataUser.last_name }}</div>
        <div>TON PROFILE</div> 
</template>