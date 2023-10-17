<template>
    <i v-for="item in stars" class="fa fa-star info-rating"></i>
    <i v-if="halfStar == true" class="fa fa-star-half-o info-rating"></i>
    <i v-for="item in noStars" class="fa fa-star-o info-rating"></i>
</template>

<script>
export default {
    data() {
        return {
            score: 0,
            stars: 0,
            noStars: 5,
            halfStar: false
        }
    },
    props: {
        rating: Number
    },
    created() {
        this.score = Math.round(this.rating * 2) / 2;
        this.stars = Math.floor(this.score);
        this.noStars = Math.floor(5 - this.score);
        if (this.stars + this.noStars == 4) {
            this.halfStar = true;
        }
    }
}
</script>