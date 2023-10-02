import './assets/main.css'
import Recipes from "./components/Recipes.vue"

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/category/:categoryId", name: "Category", props: true, component: Recipes },
        { path: "/search/:search", name: "Search", props: true, component: Recipes},
        { path: "/", name: "Start", component: Recipes },
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')