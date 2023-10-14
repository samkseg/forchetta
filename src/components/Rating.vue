<template>
    <hr>
    <div id="rating-message" v-if="isRated">
        <h1>Thank you for your rating!</h1>
    </div>
    <div id="rating-header" v-else="isRated">
        <h1>How did you like the recipe?</h1>
        <p>Click on a star to add you rating!</p>
        <div id="rating-bar"></div>
    </div>
    <hr>
</template>

<script>
export default {

    props: {
        recipeId: String
    },
    data() {
        return {
            isRated: false
        }
    },
    mounted() {
        let ratingBar = document.getElementById("rating-bar");
        let count = 0;
        while (count < 5) {
            count += 1;
            let rate = count;
            let link = document.createElement("a");
            link.setAttribute("href", "#");
            link.onclick = () => { this.sendRating(rate) };
            link.onmouseover = () => { this.selectStars(rate)};
            link.onmouseleave = () => { this.selectStars(0) };
            let star = document.createElement("i");
            star.classList.add("fa", "fa-star-o", "rating-star");
            star.setAttribute("id", "star" + rate);
            link.append(star);
            ratingBar.appendChild(link);
        }
    },
    methods: {
        sendRating: async function (rate) {
            this.isRated = true;
            let url = "https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes/" + this.recipeId + "/ratings";
            fetch(url, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( {
                    rating: rate
                })
            }).catch((error) => console.log("Error"));
        },
        selectStars: function(rate) {
            let star1 = document.getElementById("star1");
            let star2 = document.getElementById("star2");
            let star3 = document.getElementById("star3");
            let star4 = document.getElementById("star4");
            let star5 = document.getElementById("star5");
            if (rate == 0) {
                star1.classList.replace("fa-star", "fa-star-o");
                star2.classList.replace("fa-star", "fa-star-o");
                star3.classList.replace("fa-star", "fa-star-o");
                star4.classList.replace("fa-star", "fa-star-o");
                star5.classList.replace("fa-star", "fa-star-o");
            }
            if (rate == 1) {
                star1.classList.replace("fa-star-o", "fa-star");
            }
            if (rate == 2) {
                star1.classList.replace("fa-star-o", "fa-star");
                star2.classList.replace("fa-star-o", "fa-star");
            }
            if (rate == 3) {
                star1.classList.replace("fa-star-o", "fa-star");
                star2.classList.replace("fa-star-o", "fa-star");
                star3.classList.replace("fa-star-o", "fa-star");
            }
            if (rate == 4) {
                star1.classList.replace("fa-star-o", "fa-star");
                star2.classList.replace("fa-star-o", "fa-star");
                star3.classList.replace("fa-star-o", "fa-star");
                star4.classList.replace("fa-star-o", "fa-star");
            }
            if (rate == 5) {
                star1.classList.replace("fa-star-o", "fa-star");
                star2.classList.replace("fa-star-o", "fa-star");
                star3.classList.replace("fa-star-o", "fa-star");
                star4.classList.replace("fa-star-o", "fa-star");
                star5.classList.replace("fa-star-o", "fa-star");
            }
        }
    }
}
</script>

<style>
@import '../assets/rating.css';
</style>