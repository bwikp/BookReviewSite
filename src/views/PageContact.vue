<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'vue-router';
    const github = ref('')
    const twitter = ref('')
    const linkedin = ref('')
    const router = useRouter()
    const Token = localStorage.token
    const payload = jwtDecode(Token)
    const newContact = async()=>{
            const contactJson = {
                github: github.value,
                twitter: twitter.value,
                linkedin: linkedin.value
            }
    const newa =  await axios.request(
            {
                headers:{ Authorization: `Bearer ${Token}`},
                method: "POST",
                url: `https://michel.cciformationlyon.fr/api/contact/new/${payload.id}`,
                data: contactJson
            }
        )
       if(newa.status == "200")
        {
            router.push({name: 'profile'})
        }     
    }
</script>
<template>
    <div class="formRegister">
        <h2>Contact</h2>
        <div class="RegisterZone">
            <label for="email">github</label> 
            <input type="text" name="github" placeholder="github"  v-model="github" />
            <label for="password">twitter</label>
            <input type="text" name="twitter" placeholder="twitter"  v-model="twitter">
            <label for="fname">linkedin</label>
            <input type="text" name="fname" placeholder="linkedin"  v-model="linkedin">
            <input type="button" id="DwdRegister" value="confirm" @click="newContact()">
        </div>
    </div>
</template>
<style scoped>
.linkRegister{
    color: black;
    margin-left: 50%;
    text-decoration: underline;
  }

  .RegisterZone p{
    color: red;
  }
  
</style>