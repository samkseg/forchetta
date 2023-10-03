<template>
    <div v-if='["Start", "Category", "Search"].includes($route.name)' class="full-page-layout">
        <header class="header">
            <h1>{{ headerText }}</h1>
            <p class="header-text">{{ paragraphText }}</p>
        </header>
        
        <nav class="menu">
            <Menu></Menu>
        </nav>

        <main class="main">
            <SearchBar></SearchBar>
            <RouterView :key="$route.fullPath"></RouterView>
        </main>
    </div>
    <div v-if='["Recipe"].includes($route.name)' class="recipe-page-layout">
        <header class="header">
            <h1>{{ headerText }}</h1>
            <p class="header-text">{{ paragraphText }}</p>
        </header>

        <main class="main-recipe">
            <RouterView :key="$route.fullPath"></RouterView>
        </main>
    </div>
</template>

<script>
import Recipes from "./components/Recipes.vue"
import SearchBar from "./components/SearchBar.vue"
import Menu from "./components/Menu.vue"

export default {
    components: {
        Menu,
        SearchBar,
        Recipes
    },
    data() {
        return {
            headerText: "Forchetta Italia",
            paragraphText: "Welcome to this unique website for recipes from the Italian cuisine!",
        }
    }
}
</script>