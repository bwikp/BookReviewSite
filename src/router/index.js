import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LivrePage from '../views/LivrePage.vue'
import SearchPage from '../views/SearchPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView 
    },
    {
      path: '/register',
      name: 'register',
      component: ()=> import('../views/RegisterView.vue')
    },
    {
      path: '/book/:id',
      name: 'bookpage',
      component: LivrePage
    },
    {
      path: '/search/:sq',
      name: 'searchPage',
      component: SearchPage
    }
  ]
})

export default router
