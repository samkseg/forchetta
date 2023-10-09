<template>
    <h1 id="comments-header">Comments</h1>
    <p id="warning" v-if="isIncorrect">Please fill in the form!</p>
    <p id="message" v-if="isCommented">Thank you for your comment!</p>
    <div id="form" v-if="isCommented == false">
        <textarea id="comment-field" v-model="commentText" type="textarea" placeholder="Write your comment" required
            maxlength="159"></textarea>
        <div id="bottom">
            <input id="name-field" v-model="nameText" type="text" placeholder="Your name" required
                maxlength="32">
            <button id="submit-button" type="button" onclick="postComment">Post</button>
        </div>
    </div>
    <ul id="comments-list"></ul>
</template>

<script>
export default {
    data() {
        return {
            isCommented: false,
            isIncorrect: false,
            commentText: "",
            nameText: ""
        }
    },
    props: {
        recipeId: String
    },
    mounted() {
        let button = document.getElementById("submit-button");
        button.onclick = () => { this.postComment() };
        this.getComments();
    },
    methods: {
        fetchData: async function (url) {
            let response = await fetch(url);
            const data = await response.json();
            return data;
        },
        renderData: function (data) {
            let list = document.getElementById("comments-list");
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            for (let item of data) {
                let listItem = document.createElement("li");
                listItem.classList.add("post");

                let top = document.createElement("div");
                top.classList.add("comment-top");
                let name = document.createElement("h2");
                name.innerHTML = item.name;
                let date = document.createElement("p");
                date.classList.add("date");
                let year = item.createdAt.charAt(0) + item.createdAt.charAt(1) + item.createdAt.charAt(2) + item.createdAt.charAt(3);
                let month = item.createdAt.charAt(5) + item.createdAt.charAt(6);
                let monthName = "january";
                if (month == "02") {monthName = "february"} if (month == "03") {monthName = "march"} if (month == "04") {monthName = "april"} if (month == "05") {monthName = "may"} if (month == "06") {monthName = "june"} if (month == "07") {monthName = "july"} if (month == "08") {monthName = "august"} if (month == "09") {monthName = "september"} if (month == "10") {monthName = "october"} if (month == "11") {monthName = "november"} if (month == "12") {monthName = "december"}
                let day = item.createdAt.charAt(8) + item.createdAt.charAt(9);
                date.innerHTML = day + " " + monthName + " " + year;
                top.appendChild(name);
                top.appendChild(date);

                let comment = document.createElement("p");
                comment.classList.add("comment")
                comment.appendChild(document.createTextNode(item.comment));

                listItem.appendChild(top);
                listItem.appendChild(comment);
                list.appendChild(listItem);
            }
        },
        getComments: async function () {
            this.fetchData("https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes/" + this.recipeId + "/comments").then(data => { this.renderData(data); }).catch((error) => console.log("Error"));
        },
        postComment: async function () {
            if (this.commentText == "" || this.nameText == "") {
                this.isIncorrect = true;
            } else {
                let commentInput = document.getElementById("comment-field");
                let nameInput = document.getElementById("name-field");
                let button = document.getElementById("submit-button");
                commentInput.disabled = true;
                nameInput.disabled = true;
                button.disabled = true;
                let url = "https://jau22-recept-grupp7-4x3d2bpwj8jg.reky.se/recipes/" + this.recipeId + "/comments";
                fetch(url, {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        comment: this.commentText,
                        name: this.nameText
                    })
                }).then(res => { console.log("Request complete! response: ", res); this.getComments(); });
                this.commentText = "";
                this.nameText = "";
                this.isIncorrect = false;
                this.isCommented = true;
                commentInput.disabled = false;
                nameInput.disabled = false;
                button.disabled = false;
            }
        },
    }
}
</script>

<style>
@import '../assets/comments.css';</style>