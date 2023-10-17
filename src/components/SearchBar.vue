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
        if(this.$route.params.search) {
            this.searchText = this.$route.params.search;
        }
    },
    watch: {
        "$route.params.search"(newVal, oldVal) {
            if (newVal != oldVal) {
                this.searchText = this.$route.params.search;
            }
        }
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