<template>
    <div id="recipe"></div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        recipeId: ""
    },
    async created() {
        console.log(this.recipeId);
        this.fetchData("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes/" + this.recipeId).then(data => { this.renderData(data); }).catch((error) => console.log("Error"));
    },
    methods: {
        fetchData: async function (url) {
            let response = await fetch(url);
            const data = await response.json();
            return data;
        },
        renderData: function(data) {
            let main = document.getElementById("recipe");
            main.appendChild(document.createTextNode(data.title));
            main.appendChild(document.createElement("br"));
            main.appendChild(document.createTextNode(data.description));
        }
    }
}
</script>

<style>
@import '../assets/recipe.css';
</style>