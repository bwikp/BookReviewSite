<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { useRouter, RouterLink } from 'vue-router';
import jwt_decode from "jwt-decode";

const router = useRouter()
const dataUser = ref([])
const password = ref('')
const first_name = ref('')
const last_name = ref('')
if (localStorage.length === 0) {
    window.location.assign("/login")
}
const Token = localStorage.token
const payload = jwt_decode(Token)

const displayUser = ref(true)
const userData = async () => {
    const fetchUserData = await axios.request({
        headers: { Authorization: `Bearer ${Token} ` },
        method: "GET",
        url: `https://michel.cciformationlyon.fr/api/user/${payload.id}`
        // url: `http://localhost:8000/api/user/${+payload.id}`
    }).catch(function (error) {
        let code = error.response.status
        if (code === 401) {
            router.push({ name: 'login' })
        }
    })
    dataUser.value = fetchUserData.data
    console.log("user", dataUser.value)
    first_name.value = dataUser.value.first_name
    last_name.value = dataUser.value.last_name
}
const dataContact = ref([])

const userContact = async () => {
    const fetchContact = await axios.request({
        headers: { Authorization: `Bearer ${Token}` },
        method: "GET",
        url: `https://michel.cciformationlyon.fr/api/contact/${payload.id}`
    })
    dataContact.value = fetchContact.data
    // console.log('contact',dataContact.value)
    twitter.value = dataContact.value.twitter
    github.value = dataContact.value.github
    linkedin.value = dataContact.value.linkedin
}
const github = ref('')
const twitter = ref('')
const linkedin = ref('')

const editUser = async () => {

    const jsonUser = {
        password: password.value,
        first_name: first_name.value,
        last_name: last_name.value,
    }
    const jsonContact = {
        github: github.value,
        twitter: twitter.value,
        linkedin: linkedin.value,
    }
    await axios.request(
        {
            headers: { Authorization: `Bearer ${Token}` },
            method: "PUT",
            url: `https://michel.cciformationlyon.fr/api/contact/update/${payload.id}`,
            data: jsonContact
        })
    await axios.request(
        {
            headers: { Authorization: `Bearer ${Token}` },
            method: "PUT",
            url: `https://michel.cciformationlyon.fr/api/user/${payload.id}/update`,
            data: jsonUser
        })
        dataUser.value.first_name = first_name.value
        dataUser.value.last_name = last_name.value
    displayUser.value = !displayUser.value
}
const regexPassword =/^.{6,30}$/
onBeforeMount(async () => {
    await userData()
    await userContact()
})
</script>
<template>
    <div class="Profile">
        <div v-if="displayUser" class="pageProfile">
            <div class="updateUser">
                <h1>{{ dataUser.last_name }} {{ dataUser.first_name }}</h1>
                <input v-show='displayUser' type="button" class="userEdit" value="edit" @click="editUser()">
            </div>
        </div>
        <div class="pageProfile" v-else>
            <div class="updateUser">
                <label for="fname">first name</label>
                <input class="inputEdit" type="text" name="fname" v-model="first_name" placeholder="first name">
                <label for="lastname">last name</label>
                <input class="inputEdit" type="text" name="lastname" v-model="last_name" placeholder="last name">
                <label for="password">password</label>
                <input class="inputEdit" type="text" name="password" v-model="password" placeholder="password">
                <label for="">github</label>
                <input class="inputEdit" type="text" v-model="github" placeholder="github">
                <label for="">twitter</label>
                <input class="inputEdit" type="text" v-model="twitter" placeholder="twitter">
                <label for="">linkedin</label>
                <input class="inputEdit" type="text" v-model="linkedin" placeholder="linkedin">
                <input v-if="regexPassword.test(password)" type="button" value="save" class="userEdit" @click="editUser()">
            </div>
        </div>
        
    </div>
    <div v-if="displayUser" class="footer">
        <div class="ulbiss">
            <a :href='dataUser.contact.twitter' target="_blank">twitter</a>
            <a :href='dataUser.contact.github' target="_blank">github</a>
            <a :href="dataUser.contact.linkedin" target="_blank">linkedin</a>
        </div>
    </div>
</template>
<style scoped>
 @media (max-width:1050px) {

 }
.Profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 70%;
    margin: 3%;
}
.inputEdit{
    height: 10%;
    width: 40%;
}
.userEdit {
    height: 50px;
    width: 100px;
    border-radius: 20px;
}

.updateUser {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3%;
    height: 80%;
    width: 80%;
}

.pageProfile {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 80%;
    gap: 25px;
    border: solid 2px white;
}

.ulbiss {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
}

.footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}</style>