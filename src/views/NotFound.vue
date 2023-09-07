<template>
    <div class="err404">
            <h1>Error 404, There is Nothing to read here</h1>
    </div>
</template>
<style scoped>
   .err404 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    margin: 5%;
   }

   .err404 h1{
        font-size: 5vw;
        color: #FFFFFF;
   }
   @media (max-width:1050px){
    .err404 h1{
        font-size: 5vh;
    }
   }
</style>