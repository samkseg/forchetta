<template>
    <div id="recipe">
        <div id="recipe-top-layout">
            <h1 class="header">{{ data.title }}</h1>
            <div>
                <p class="description">{{ data.description }}</p>
                <div class="info-bar" id="info-bar"></div>
            </div>
            <img class="recipe-image" id="recipe-image" :alt="data.title">
        </div>
        <hr>
        <div id="recipe-middle-layout">
            <h2 class="ing-header"> {{ ingHeader }}</h2>
            <h2 class="ins-header"> {{ insHeader }}</h2>
            <div class="ingredient">
                <li v-for="ing of this.ingredients">{{ ing.amount }} {{ ing.unit }} {{ ing.name }}</li>
            </div>
            <div class="instruction">
                <li v-for="ins of this.instructions" class="instruction-item">{{ ins }}</li>
            </div>
        </div>
        <Rating :recipeId="recipeId"></Rating>
        <Comments :recipeId="recipeId"></Comments>
    </div>
</template>

<script>
import Rating from "../components/Rating.vue"
import Comments from "../components/Comments.vue"
export default {
    components: {
        Rating,
        Comments
    },
    data() {
        return {
            data: "",
            desc: "",
            ingLength: 0,
            time: 0,
            imgUrl: "",
            ingHeader: "Ingredients",
            insHeader: "Instructions",
            ingredients: [],
            instructions: []
        }
    },
    props: {
        recipeId: ""
    },
    async mounted() {
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchData("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes/" + this.recipeId).then(data => { this.loadData(data) }).catch((error) => console.log("Error"));
            },
            { immediate: true }
        )
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
        loadData: async function (data) {
            this.data = data;
            this.desc = data.description;
            this.ingLength = data.ingredients.length;
            this.time = data.timeInMins;
            this.imgUrl = data.imageUrl;
            this.ingredients = data.ingredients;
            this.instructions = data.instructions;

            let infoBar = document.getElementById("info-bar");
            while (infoBar.firstChild) {
                infoBar.removeChild(infoBar.firstChild);
            }
            let score = Math.round(data.avgRating * 2) / 2;
            let count = 5;

            while (count > 0) {
                let span = document.createElement("span");
                span.appendChild(this.renderStar(score));
                infoBar.appendChild(span);
                score -= 1;
                count -= 1;
            }

            infoBar.appendChild(document.createTextNode(" | " + this.ingLength + " INGREDIENTS | " + this.time + " MIN"));
            let img = document.getElementById("recipe-image");
            img.src = this.imgUrl;
        }
    }
}
</script>

<style>
@import '../assets/recipe.css';
</style>