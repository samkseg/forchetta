<template>
    <ul id="recipes">
    </ul>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        search: ""
    },
    async created() {
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchData().then(data => { this.renderData(data); }).catch((error) => console.log("Error"));;
            },
            { immediate: true }
        )
    },
    methods: {
        fetchData: async function () {
            let response = await fetch("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes?query=" + this.search);
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
        renderData: async function (data) {
            let list = document.getElementById("recipes");
            for (let item of data) {
                let listItem = document.createElement("li");
                listItem.classList.add("list-item");
                let link = document.createElement("a");
                link.setAttribute("href", "#");
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
                footer.appendChild(document.createTextNode(item.ingredients.length + " Ingredients | " + item.timeInMins + " Minutes"));

                top.appendChild(paragraph);
                link.appendChild(top)
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