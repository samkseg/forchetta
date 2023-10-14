<template>
    <div id="recipe">
        <div id="recipe-top-layout"></div>
        <hr>
        <div id="recipe-middle-layout"></div>
        <Rating :recipeId="recipeId"></Rating>
        <Comments :recipeId="recipeId"></Comments>
    </div>
</template>

<script>
import Rating from "./Rating.vue"
import Comments from "./Comments.vue"
export default {
    components: {
        Rating,
        Comments
    },
    data() {
        return {
        }
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
                star.classList.add("fa", "fa-star", "info-rating");
            } else
                if (score == 0.5) {
                    star.classList.add("fa", "fa-star-half-o", "info-rating");
                } else
                    if (score < 0.5) {
                        star.classList.add("fa", "fa-star-o", "info-rating");
                    }
            return star;
        },
        renderData: function (data) {
            this.renderTop(data);
            this.renderMiddle(data);
        },
        renderTop: function(data) {
            let top = document.getElementById("recipe-top-layout");
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
            infoBar.appendChild(document.createTextNode(" | " + data.ingredients.length));
            infoBar.appendChild(document.createTextNode(" INGREDIENTS | " + data.timeInMins + " MIN"));

            paragraph.appendChild(document.createTextNode(data.description));
            description.appendChild(infoBar);

            let img = document.createElement("img");
            img.classList.add("recipe-image");
            img.src = data.imageUrl;

            top.appendChild(h1);
            top.appendChild(description);
            top.appendChild(img);
        },
        renderMiddle: function(data) {
            let middle = document.getElementById("recipe-middle-layout");
            let ingredients = document.createElement("div");
            let ingredientsH = document.createElement("h2");
            ingredientsH.innerHTML = "Ingredients";
            ingredientsH.classList.add("ing-header");
            ingredients.classList.add("ingredient");

            let ingredientsList = document.createElement("ul");
            for (let ingredient of data.ingredients) {
                let ingredientItem = document.createElement("li");
                ingredientItem.innerHTML = ingredient.amount + " " + ingredient.unit + " " + ingredient.name;
                ingredientsList.appendChild(ingredientItem);
            }
            ingredients.appendChild(ingredientsList);

            let instructions = document.createElement("div");
            let instructionsH = document.createElement("h2");
            instructionsH.innerHTML = "Instructions";
            instructionsH.classList.add("ins-header");
            instructions.classList.add("instruction");

            let instructionsList = document.createElement("ul");
            for (let instruction of data.instructions) {
                let instructionItem = document.createElement("li");
                instructionItem.classList.add("instruction-item");
                instructionItem.innerHTML = instruction;
                instructionsList.appendChild(instructionItem);
            }
            instructions.appendChild(instructionsList);

            middle.appendChild(ingredientsH);
            middle.appendChild(instructionsH);
            middle.appendChild(ingredients);
            middle.appendChild(instructions);
        }
    }
}
</script>

<style>
@import '../assets/recipe.css';
</style>