<script setup>
    import { onBeforeMount, ref } from 'vue'
    import axios from 'axios';
    import { useRoute,useRouter } from 'vue-router';
    import jwtDecode from 'jwt-decode';
    const route = useRoute()
    const router = useRouter()

    const Token = localStorage.token
    const payload = jwtDecode(Token)
    const idBook = route.params.id
    const leLivre = ref([]);
    const fetchOneBook = async () => { 
        let aBook =  await  axios.get('https://www.dbooks.org/api/book/'+idBook) 
        // console.log(aBook.data)
        // console.log('a book',aBook.data)
        leLivre.value = aBook.data;
        return aBook;
    }

    
    let added = ref(false);
    const addOneBook = async () => {
        let tempo = await fetchOneBook();
        // console.log('tempo',tempo.data);

            const bookinfo = {
                "idlivre":tempo.data.id,
                "note":"",
                "livretitle":tempo.data.title
            }
            // console.log(tempo.data.id)
          await axios.request({
            headers: { Authorization: `Bearer ${Token}` },

            method: "POST",
            url: `http://localhost:8000/api/lib/new/${payload.id}`,
            data: bookinfo
        }).catch(function (error) {
        let code = error.response
                console.log(code)
            })
            added.value = true;
    }

    let userInfo = ref([])

    const checkUser = async () => {
         let check =  await axios.request(
                {
                    headers: { Authorization: `Bearer ${Token}`},
                    method: "GET",
                    url: `http://localhost:8000/api/user/${+payload.id}`
                }
            )
            let tempo = await fetchOneBook();

            userInfo.value = check.data

            // console.log(userInfo.value.lib[0].idlivre)
            // console.log(tempo.data.id)
            for(let i = 0 ;i < userInfo.value.lib.length;i++)
                {   
                    console.log("partie 1",userInfo.value.lib[i].idlivre)
                    if(userInfo.value.lib[i].idlivre == tempo.data.id)
                    {
                        added.value = true;
                    }
                }
    }    

    onBeforeMount(async () => {
  await fetchOneBook()
  await checkUser()
})
</script>
<template>
    <div class="LivreP">
        <div class="LivrePimg">
            <img v-bind:src='leLivre.image'/>
            <div class="livrePclick">
            <a :href="leLivre.download" class="DwdButton" >Download</a>
            <div  v-if="added" class="valider">✅</div>
            <button v-else class="addButton" @click="addOneBook()" >➕</button>
            </div>
        </div>
        
        <div class="LivrePdes">
            <h2>{{ leLivre.title }}</h2>
            <h3>{{ leLivre.subtitle }}</h3>
            <p>description: {{ leLivre.description}}</p>
            <div>authors: {{ leLivre.authors }}</div>
            <div>publisher: {{ leLivre.publisher }}</div>
            <div> number of pages: {{ leLivre.pages }}</div>
            <div>year:{{ leLivre.year }}</div>
        </div>
    </div>
</template>