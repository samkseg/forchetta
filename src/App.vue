<template>
    <div v-if='["Start", "Category", "Search"].includes($route.name)' class="full-page-layout">
        <header class="header">
            <RouterLink @click="clearSearchBar" :to='{ name: "Start" }'>
                <h1>{{ headerText }}
                    <img class="italy" src="./assets/flag-italy.png" alt="Italian flag">
                </h1>
            </RouterLink>
            <p class="header-text">{{ paragraphText }}</p>
        </header>

        <nav class="menu">
            <Menu @clearSearchBar="clearSearchBar"></Menu>
        </nav>

        <main class="main">
            <SearchBar ref="child"></SearchBar>
            <RouterView :key="$route.fullPath"></RouterView>
        </main>
    </div>
    <div v-if='["Recipe"].includes($route.name)' class="recipe-page-layout">
        <header class="header">
            <RouterLink :to='{ name: "Start" }'>
                <h1>{{ headerText }}
                    <img class="italy" src="./assets/flag-italy.png" alt="Italian flag">
                </h1>
            </RouterLink>
            <p class="header-text">{{ paragraphText }}</p>
        </header>

        <main class="main-recipe">
            <RouterView :key="$route.fullPath"></RouterView>
        </main>
    </div>
</template>

<script>
import Recipe from "./views/Recipe.vue"
import Recipes from "./views/Recipes.vue"
import SearchBar from "./components/SearchBar.vue"
import Menu from "./components/Menu.vue"

export default {
    components: {
        Menu,
        SearchBar,
        Recipes,
        Recipe
    },
    data() {
        return {
            headerText: "Forchetta Italia",
            paragraphText: "Welcome to this unique website for recipes from the Italian cuisine!",
        }
    },
    methods: {
        clearSearchBar: function () {
            this.$refs.child.clearSearch();
        }
    }
}
</script>
