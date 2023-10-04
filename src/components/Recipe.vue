<template>
    <div id="recipe" class="recipe-item-layout"></div>
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
        renderStar: function (score) {
            let star = document.createElement("i");
            if (score > 0.5) {
                star.classList.add("fa", "fa-star");
            } else
                if (score == 0.5) {
                    star.classList.add("fa", "fa-star-half-o");
                } else
                    if (score < 0.5) {
                        star.classList.add("fa", "fa-star-o");
                    }
            return star;
        },
        renderData: function (data) {
            let recipe = document.getElementById("recipe");

            let h1 = document.createElement("h1");
            h1.classList.add("header");
            h1.innerHTML = data.title;

            let description = document.createElement("div");
            let paragraph = document.createElement("p");
            paragraph.classList.add("description");
            let infoBar = document.createElement("div");
            infoBar.classList.add("info-bar");
            description.appendChild(paragraph);

            let score = Math.round(data.avgRating * 2) / 2;
            let count = 5;

            while (count > 0) {
                let span = document.createElement("span");
                span.appendChild(this.renderStar(score));
                infoBar.appendChild(span);
                score -= 1;
                count -= 1;
            }
            infoBar.appendChild(document.createTextNode("| " + data.ingredients.length + " INGREDIENTS | " + data.timeInMins + " MIN"));

            paragraph.appendChild(document.createTextNode(data.description));
            description.appendChild(infoBar);

            let img = document.createElement("img");
            img.classList.add("recipe-image");
            img.src = data.imageUrl;

            recipe.appendChild(h1);
            recipe.appendChild(description);
            recipe.appendChild(img);
        }
    }
}
</script>

<style>
@import '../assets/recipe.css';
</style>