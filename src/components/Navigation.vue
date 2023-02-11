<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
        <a class="navbar-brand" href="#"><span style="color:red">Post</span> Me</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <router-link class="nav-link" to="/">All Posts</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/friend">As a Friend</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/stranger">As a Stranger</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/family">As a Family</router-link>
            </li>
            </ul>
            <form class="d-flex">
            <input class="form-control me-2" v-model="search" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" @click.prevent="showModalClick">Search</button>
            </form>
        </div>
        </div>
    </nav>
    <div class="container" v-show="showModal">
        <div class="row container">
            <div class="col-md-8">
                <h2>Search Results</h2>
            </div>
            <div class="col-md-4 text-end">
                <button @click="showModal = false" class="btn btn-danger">Close Search Results</button>
            </div>
        </div>
        
        <div class="cards-container">
            <div v-for="post in searchData" :key="post.id" class="card" :style="{backgroundColor: post.backgroundColor}">
                <p class="main-text">{{ post.title  }}</p>
                <p class="main-text">{{ post.as  }}</p>
                <p class="main-text">{{ post.text.substring(0, 40) }}</p>
                <router-link :to="`/${post.id}`">More</router-link>
                <p class="date">{{ post.date }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    data(){
        return{
            search: "",
            postsData:[],
            showModal: false,
            searchData:[],
        }
    },
    mounted() {
        axios.get(`posts.json`).then((response) => {
            this.formatPostsData(response.data);
        })
    },
    methods: {
        formatPostsData(posts) {
            for (let key in posts) {
                this.postsData.push({ ...posts[key], id: key });
            }
        },
        showModalClick() {
            if(this.search == ''){
                this.showModal = false
            }
            this.searchData = [];
            for(let i = 0; i < this.postsData.length; i++){
                if((this.postsData[i].as == this.search) || (this.postsData[i].title == this.search) || (this.postsData[i].date == this.search)){
                    this.showModal = true
                    this.searchData.push ( this.postsData[i] );
                }
            }
            this.search = '';
            
        }
    },
    computed: {
        filteredList() {
            return this.searchData.filter(post => {
            return post.title.toLowerCase().includes(this.search.toLowerCase())
        })
        }
    }
}
</script>

<style scoped>
.router-link-active {
    background: #aaa;
}
.nav-item:hover {
    background: rgba(112, 111, 202, 0.404);
}
.date{
  font-size: 12.5px;
  font-weight: bold;
}
.container {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
}
.card {
  width: 225px;
  height: 225px;
  background-color: rgb(237, 182, 44);
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  margin-bottom: 20px;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
}

</style>