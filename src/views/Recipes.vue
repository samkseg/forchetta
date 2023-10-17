<template>
    <div class="no-result-box" v-if="noResult">
        <p class="no-result-message">{{ message }}</p>
    </div>
    <ul id="recipes">
        <li v-for="item in recipes" class="list-item">
            <RouterLink :to='{ name: "Recipe", params: { recipeId: item._id } }'>
                <div class="top">
                    <p class="recipe-info">
                        <img class="thumb-nail" :src="item.imageUrl">
                        <div class="header-div">
                            <span class="header-rating">
                                <Grade :rating="item.avgRating"></Grade>
                            </span>
                            <h2 class="header-title">{{ item.title }}</h2>
                        </div>
                        {{ item.description }}
                        <br>
                        <p class="footer">{{ item.ingredients.length }} INGREDIENTS | {{ item.timeInMins }} MINUTES</p>
                    </p>
                </div>
            </RouterLink>
        </li>
    </ul>
</template>

<script>
import Grade from "../components/Grade.vue"
export default {
    components: {
        Grade
    },
    data() {
        return {
            message: "Couldn't find any recipes!",
            noResult: false,
            recipes: []
        }
    },
    props: {
        categoryId: "",
        search: "",
    },
    async created() {
        this.fetchData("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes").then(data => { this.saveData(data); }).catch((error) => console.log("Error"));
    },
    async mounted() {
        this.$watch(
            () => this.$route.params,
            () => {
                this.noResult = false;
                if (!this.categoryId && !this.search) {
                    this.fetchData("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes").then(data => { this.loadData(data); }).catch((error) => console.log("Error"));
                    localStorage.search = "";
                }
                if (this.categoryId) {
                    this.fetchData("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/categories/" + this.categoryId + "/recipes").then(data => { this.loadData(data); }).catch((error) => console.log("Error"));
                    localStorage.search = "";
                }
                if (this.search) {
                    localStorage.search = this.search;
                    this.loadData(this.findRecipes(this.search));
                }
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
        findRecipes: function (search) {
            let result = [];
            for (let item of JSON.parse(localStorage.recipesList)) {
                let catMatch = false;
                for (let cat of item.categories) {
                    if (cat.toLowerCase().includes(search.toLowerCase())) {
                        catMatch = true;
                    }
                }
                if (item.title.toLowerCase().includes(search.toLowerCase()) || catMatch == true) {
                    result.push(item);
                }
            }
            if (result.length == 0) {
                this.noResult = true;
            } else {
                this.noResult = false;
            }
            return result;
        },
        loadRecipe(recipe) {
            this.$router.push({ name: "Recipe", params: { recipeId: recipe } });
        },
        saveData: function (data) {
            localStorage.recipesList = JSON.stringify(data);
        },
        clearList: function () {
            let list = document.getElementById("recipes");
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        },
        loadData: function(data) {
            this.recipes = data;
        }
    }
}
</script>

<style>
@import '../assets/list.css';
</style>