import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import TheWelcome from './components/TheWelcome.vue'
import AboutView from './components/AboutView.vue'
import ListsView from './components/ListsView.vue'
import ListView from './components/ListView.vue'

const routes = [
  { path: '/', component: TheWelcome },
  { path: '/about', component: AboutView },
  { path: '/lists', component: ListsView },
  { path: '/lists/:id', component: ListView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
