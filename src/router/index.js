import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LivrePage from '../views/LivrePage.vue'
import SearchPage from '../views/SearchPage.vue'
import MyLibrary from '../views/MyLibrary.vue'
import LogoutView from '../views/LogoutView.vue'
import NoteUserVue from '../views/NoteUser.vue'
import NotFound from '../views/NotFound.vue'
const router = createRouter({
  mode: 'history',
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
    },
    {
      path: '/library',
      name: 'library',
      component: MyLibrary
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/note/:b',
      name: 'note',
      component: NoteUserVue
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: ()=> import('../views/PrivacyPolicy.vue')
    }
  ]
})

export default router
