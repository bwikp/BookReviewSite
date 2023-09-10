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
    <div class="pageProfile">
        <div>{{ dataUser.last_name }} {{ dataUser.first_name }}</div>
    </div>
    <div class="footer">
       <div class="ulbiss">
            <a :href='dataUser.contact.twitter' target="_blank">twitter</a>
            <a :href="dataUser.contact.github" target="_blank">github</a>
            <a :href="dataUser.contact.linkedin" target="_blank">linkedin</a>
       </div>
    </div>
</template>
<style scoped>
        .pageProfile{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 80%;
            width: 100%;
        }
        .ulbiss{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 20px;
            width: 100%;
        }
        .footer{
            display: flex;
            flex-direction:row;
            align-items: center;
            justify-content: center;
        }
</style>