import './assets/main.css'
import Search from "./components/Search.vue"
import Recipes from "./components/Recipes.vue"

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/search/:search", name: "Search", props: true, component: Search},
        { path: "/", name: "Start", component: Recipes },
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')