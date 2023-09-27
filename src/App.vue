<template>
    <div class="full-page-layout">
        <header class="header">
            <h1>{{ headerText }}</h1>
            <p>{{ paragraphText }}</p>
        </header>

        <nav class="menu">
            <a href="">Start</a>
            <a href="">Category</a>
            <a href="">Recept</a>
            <a><Button></Button></a>
        </nav>

        <main class="main">
            <ul>
                <li v-for="(item, index) in list" :key="index">{{ item }}</li>
            </ul>
        </main>
    </div>
</template>

<script>
import Button from "./Button.vue"

export default {
    components: {
        Button
    },
    data() {
        return {
            headerText: "Forchetta Receptbok",
            paragraphText: "Nånting om recept",
            list: ["Recept 1", "Recept 2", "Recept 3"]
        }
    }
}

</script>

<style>
</style>