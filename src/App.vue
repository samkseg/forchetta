<template>
    <div class="full-page-layout">
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
</template>

<script>
import Recipes from "./components/Recipes.vue"
import SearchBar from "./components/SearchBar.vue"
import Categories from "./components/Categories.vue"
import Menu from "./components/Menu.vue"

export default {
    components: {
        Menu,
        Categories,
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