import './assets/main.css'
import Recipes from "./views/Recipes.vue"
import Recipe from "./views/Recipe.vue"
import Error404 from "./views/Error404.vue"

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/recipe/:recipeId", name: "Recipe", props: true, component: Recipe },
        { path: "/category/:categoryId", name: "Category", props: true, component: Recipes },
        { path: "/search/:search", name: "Search", props: true, component: Recipes},
        { path: "/", name: "Start", component: Recipes },
        { path: "/:pathMatch(.*)*", name: "error404", component: Error404}
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')