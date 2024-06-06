import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '../views/BookView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/book/:id',
    name: 'BookView',
    component: BookView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
