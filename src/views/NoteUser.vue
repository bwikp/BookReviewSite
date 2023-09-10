<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { decode } from 'html-entities';
const router = useRouter()
const route = useRoute();
const book = route.params.b.toLowerCase()
const Token = localStorage.token
const payload = jwt_decode(Token);
const Note = ref([])
const txtaera = ref('');
const displayNote = ref(true)

const getlib = async () => {
    let datalib = await axios.request(
        {
            headers: { Authorization: `Bearer ${Token}` },
            method: "GET",
            url: `http://localhost:8000/api/lib/${payload.id}/${book}`
            //    url: `https://michel.cciformationlyon.fr/api/lib/${payload.id}/${book}`
            // https://michel.cciformationlyon.fr
        }).catch(function (error) {
            let code = error.response.status
            if (code === 401) {
                router.push({ name: "login" })
            }
        }
        )
    Note.value = datalib.data
    txtaera.value = datalib.data.note
    console.log(Note.value)
}

const noteLivre = async () => {
    const jsonNote =
    {
        idlivre: book,
        note: txtaera.value,
        livretitle: Note.livretitle
    }
    await axios.request(
        {
            headers: { Authorization: `Bearer ${Token}` },
            method: "PUT",
            url: `http://localhost:8000/api/lib/note/${payload.id}/${book}`,
            // url: `https://michel.cciformationlyon.fr/api/lib/note/${payload.id}/${book}`,
            data: jsonNote
        }
        // https://michel.cciformationlyon.fr
    )
    displayNote.value = !displayNote.value
}
onBeforeMount(
    async () => {
        await getlib()
    }
)

</script>
<template>
    <div class="notePage">
        <h2>{{ decode(Note.livretitle) }}</h2>
        <div class="noteContent" v-if="displayNote">
            <p>{{ txtaera }}</p>
        </div>
        <div  v-else class="noteContent editnoteZone">
            <textarea v-model="txtaera">{{ Note.note }}</textarea>
        </div>
            <input v-if="displayNote" id="editButton" type="button" value="edit" @click="noteLivre()">
            <input v-else id="editButton" type="button" value="save" @click="noteLivre()">
    </div>
</template>
<style scoped>
  .notePage h2{
  font-size: 20px;
  margin: 3%;
}
</style>