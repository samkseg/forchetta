<template>
    <h2 class="menu-header">Categories</h2>
    <ul class="menu-list">
        <li class="menu-links">
            <RouterLink @click="$emit('clearSearchBar')" :to='{ name: "Start" }'>All({{ all.length }})</RouterLink>
        </li>
        <li class="menu-links" v-for="item in categories" :key="item._id">
            <RouterLink @click="$emit('clearSearchBar')" :to='{ name: "Category", params: { categoryId: item.name } }'>{{ item.name }}({{ item.count }})
            </RouterLink>
        </li>
    </ul>
</template>

<script>
export default {
    emits: ["clearSearchBar"],
    data() {
        return {
            categories: [],
            all: []
        }
    },
    async mounted() {
        let responseCategories = await fetch("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/categories");
        this.categories = await responseCategories.json();
        let responseAll = await fetch("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes");
        this.all = await responseAll.json();
    }
}
</script>

<style>
@import '../assets/menu.css';
</style>