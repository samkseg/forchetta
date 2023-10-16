<template>
    <div class="search-bar">
        <input id="search-field" class="search-field" type="text" v-model="searchText" 
        @keyup="dynamicSearch" 
        @keypress.enter="enterSearch" 
        placeholder="Search Recipe...">
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchText: ""
        }
    },
    mounted() {
        this.searchText = localStorage.search;
        document.getElementById("search-field").select();
    },
    methods: {
        dynamicSearch: function() {
            if (this.searchText != null & this.searchText != "") {
                this.$router.push({ name: "Search", params: { search: this.searchText } })
                localStorage.search = this.searchText;
            }
        }, 
        enterSearch: function () {
            if (this.searchText != null & this.searchText != "") {
                this.$router.push({ name: "Search", params: { search: this.searchText } })
                this.searchText = "";
            }
        }, 
        clearSearch: function() {
            this.searchText = "";
            localStorage.search = "";
        }
    }
}
</script>

<style>
@import '../assets/search.css';
</style>