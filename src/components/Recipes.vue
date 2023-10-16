<template>
    <div class="no-result-box" v-if="noResult">
        <p class="no-result-message">{{ message }}</p>
    </div>
    <ul id="recipes">
    </ul>
</template>

<script>
export default {
    data() {
        return {
            message: "Couldn't find any recipes!",
            noResult: false
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
                    this.fetchData("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes").then(data => { this.renderData(data); }).catch((error) => console.log("Error"));
                    localStorage.search = "";
                }
                if (this.categoryId) {
                    this.fetchData("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/categories/" + this.categoryId + "/recipes").then(data => { this.renderData(data); }).catch((error) => console.log("Error"));
                    localStorage.search = "";
                }
                
                if (this.search) {
                    localStorage.search = this.search;
                    this.renderData(this.findRecipes(this.search));
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
        renderData: function (data) {
            this.clearList();
            let list = document.getElementById("recipes");
            for (let item of data) {
                let listItem = document.createElement("li");
                listItem.classList.add("list-item");
                let link = document.createElement("a");

                link.onclick = () => { this.loadRecipe(item._id) };

                let top = document.createElement("div");
                top.classList.add("top");
                let paragraph = document.createElement("p");
                paragraph.classList.add("recipe-info");
                let footer = document.createElement("p");
                footer.classList.add("footer");
                let img = document.createElement("img");
                img.classList.add("thumb-nail");
                img.src = item.imageUrl;

                paragraph.appendChild(img);

                let header = document.createElement("h2");
                header.classList.add("header-title");
                header.appendChild(document.createTextNode(item.title));

                let score = Math.round(item.avgRating * 2) / 2;

                let headerDiv = document.createElement("div");
                headerDiv.classList.add("header-div");
                let headerSpan = document.createElement("span");
                headerSpan.classList.add("header-rating");
                headerDiv.appendChild(headerSpan);
                headerDiv.appendChild(header);
                let count = 5;

                while (count > 0) {
                    let span = document.createElement("span");
                    span.appendChild(this.renderStar(score));
                    headerSpan.appendChild(span);
                    score -= 1;
                    count -= 1;
                }

                paragraph.appendChild(headerDiv);
                paragraph.appendChild(document.createTextNode(item.description));
                paragraph.appendChild(document.createElement("br"));
                footer.appendChild(document.createTextNode(item.ingredients.length + " INGREDIENTS | " + item.timeInMins + " MINUTES"));

                top.appendChild(paragraph);
                link.appendChild(top);
                link.appendChild(footer);
                listItem.append(link);
                list.appendChild(listItem);
            }
        }
    }
}
</script>

<style>
@import '../assets/list.css';
</style>