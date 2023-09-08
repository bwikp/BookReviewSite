<script setup>
import { ref } from 'vue';
import { useRouter,RouterLink } from 'vue-router';
const search = ref("");
const router = useRouter()
const Token = localStorage.token
const searchBook = async () => {
    // const resultat = await axios.get('https://www.dbooks.org/api/search/' + search.value)
    // console.log(resultat.data)
    // console.log(search.value)
    // rSearch.value = resultat.data.books
    router.push({path: '/search/'+search.value})
}
let show = ref(false);

</script>

<template>
    <div class="nav">
        <div class="zoneNav"><RouterLink to='/'><img src="../assets/book-wnb.png"></RouterLink></div>
        <div id="SearchMobile" class="thirdNav zoneNav ">
            <input type="text" @change="searchBook" class="navSearch" placeholder="Search" v-model="search">
            <p class="searchButton" @click="searchBook">🔎</p>
        </div>
        <div class="navlist zoneNav pasMobile">
            <RouterLink v-if="Token != null" to="/logout">Logout</RouterLink>
            <RouterLink v-else to="/login">Login</RouterLink>
            <RouterLink to="/library">MyLibrary</RouterLink>
        </div>
        <div class="burgerMenu" @click="show = !show">
            <div class="burgerLine"></div>
            <div class="burgerLine"></div>
            <div class="burgerLine"></div>
        </div>
    </div>
    <div v-show="show" class="menuSlide">
        <RouterLink class="hover-underline" v-if="Token != null" to="/logout">Logout</RouterLink>
        <RouterLink class="hover-underline" v-else to="/login">Login</RouterLink>
        <RouterLink class="hover-underline" to="/library">MyLibrary</RouterLink>
    </div>
</template>
<style scoped>
  @media (max-width:1050px) {
    .menuSlide {
    position: absolute;
    right: 0;
    width: 100%;
    background:rgb(80, 106, 225);
    z-index: 99999;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    transition: width 200ms ease-in ;
  }
  .hover-underline {
    height: 3vh;
    margin-bottom: 2.5%;
    width: 100%;
    text-align: center;
    color: whitesmoke;
  }
  .hover-underline:hover::after{
    transform: scaleX(1);
  transform-origin: bottom right;
  }
  .hover-underline::after{
    content: '';
  position: absolute;
  width: 80%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  right: 0;
  background-color: #fafafa;
  transform-origin: top right;
  transition: transform 0.25s ease-out;
  }
  .hov
  .burgerLine{
      width: 30px;
      height: 5px;
      background: white;
    }
    .navlist{
        display: none;
    }
  }
</style>