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
        this.fetchData("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes/" + this.recipeId).then(data => { this.renderData(data); }).catch((error) => console.log("Error"));
    },
    methods: {
        fetchData: async function (url) {
            let response = await fetch(url);
            const data = await response.json();
            return data;
        },
        renderData: function(data) {
            let recipe = document.getElementById("recipe");
            
            let h1 = document.createElement("h1");
            h1.innerHTML = data.title;

            let paragraph = document.createElement("p");
            paragraph.classList.add("description");
            let img = document.createElement("img");
            img.classList.add("recipe-image");
            img.src = data.imageUrl;

            paragraph.appendChild(document.createTextNode(data.description));
            paragraph.appendChild(img);

            recipe.appendChild(h1);
            recipe.appendChild(document.createElement("br"));
            recipe.appendChild(paragraph);
        }
    }
}
</script>

<style>
@import '../assets/recipe.css';
</style>