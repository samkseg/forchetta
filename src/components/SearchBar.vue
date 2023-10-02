<template>
    <div class="search-bar">
        <input class="search-field" type="text" v-model="searchText" @keypress.enter="searchList"
            v-on:change="saveFormState" placeholder=" Search Recipe...">
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchText: ""
        }
    },
    created() {
        this.initFormState();
    },
    methods: {
        searchList: function () {
            if (this.searchText != null & this.searchText != "") {
                this.$router.push({ name: "Search", params: { search: this.searchText } })
                sessionStorage.setItem("searchText", this.searchText);
            }
        },
        initFormState: function () {
            const searchText = sessionStorage.getItem("searchText") || "";
            if (searchText != null) {
                this.searchText = searchText;
            }
        }
    }
}
</script>

<style>
@import '../assets/search.css';
</style>