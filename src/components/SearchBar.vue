<template>
    <div class="search-bar">
        <input class="search-field" type="text" v-model="searchText" 
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
    methods: {
        dynamicSearch: function() {
            console.log("in dynamicSearch");
            if (this.searchText != null & this.searchText != "") {
                this.$router.push({ name: "Search", params: { search: this.searchText } })
                console.log("inside IF");
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
        }
    }
}
</script>

<style>
@import '../assets/search.css';
</style>