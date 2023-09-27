<template>
    <div class="full-page-layout">
        <header class="header">
            <h1>{{ headerText }}</h1>
            <p>{{ paragraphText }}</p>
        </header>

        <nav class="menu">
            <a href="">Start</a><br>
            <a href="">Category</a><br>
            <a href="">Recipe</a>
        </nav>

        <main class="main">
            <ul>
                <li v-for="(item, index) in list" :key="index">{{ item }}</li>
            </ul>
            <Button></Button>
        </main>
    </div>
</template>

<script>
import Button from "./components/Button.vue"

export default {
    components: {
        Button
    },
    data() {
        return {
            headerText: "Forchetta Pasta Recipes",
            paragraphText: "Something about pasta",
            list: ["Recipe 1", "Recipe 2", "Recipe 3"]
        }
    }
}

</script>