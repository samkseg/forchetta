<template>
    <ul id="recipes">
    </ul>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    async created() {
        let response = await fetch("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes");
        const data = await response.json();
        let list = document.getElementById("recipes");
        for (let item of data) {
            let listItem = document.createElement("li");
            listItem.classList.add("list-item");
            let top = document.createElement("div");
            top.classList.add("top");
            let paragraph = document.createElement("p");
            paragraph.classList.add("recipe-info");
            let footer = document.createElement("p");
            footer.classList.add("footer");
            let img = document.createElement("img");
            img.classList.add("thumb-nail");
            img.src = item.imageUrl;
            let header = document.createElement("h2");
            header.classList.add("recipe-header");

            let rating = Math.round(item.avgRating * 2) / 2;

            paragraph.appendChild(img);
            paragraph.appendChild(document.createElement("br"));
            header.appendChild(document.createTextNode(item.title + " " + rating + "/5"));
            paragraph.appendChild(header);
            paragraph.appendChild(document.createTextNode(item.description));
            paragraph.appendChild(document.createElement("br"));
            footer.appendChild(document.createTextNode(item.ingredients.length + " Ingredients | " + item.timeInMins + " Minutes"));
            
            top.appendChild(paragraph);
            listItem.append(top);
            listItem.appendChild(footer);
            list.appendChild(listItem);
        }
    }
}
</script>

<style>
@import '../assets/list.css';
</style>