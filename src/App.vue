<template>
    <div class="full-page-layout">
        <header class="header">
            <h1>{{ headerText }}</h1>
            <p class="header-text">{{ paragraphText }}</p>
        </header>

        <nav class="menu">
            <h2 class="menu-header">Categories</h2><br>
            <a href="">Category 1</a><br>
            <a href="">Category 2</a><br>
            <a href="">Category 3</a>
        </nav>

        <main class="main">
            <Recipes></Recipes>
        </main>
    </div>
</template>

<script>
import Recipes from "./components/Recipes.vue"

export default {
    components: {
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