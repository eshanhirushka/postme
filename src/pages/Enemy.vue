<template>
    <Navigation />
<div class="header">
    <h1><span style="color:#a95ddd; font-weight: bold;">Stangers's</span> Page</h1>
    <hr />
</div>
<div class="container">
    <div class="cards-container">
        <div v-for="post in enemy" :key="post.id" class="card" :style="{backgroundColor: post.backgroundColor}">
            <p class="main-text">{{ post.title  }}</p>
            <p class="main-text">{{ post.as  }}</p>
            <p class="main-text">{{ post.text.substring(0, 40) }}</p>
            <router-link style="color: black!important;" :to="`/${post.id}`">More</router-link>
            <p class="date">{{ post.date }}</p>
        </div>
    </div>
    <br>
    <h2 style="color:#a95ddd;">Unknown</h2>
    <br>
    <div class="cards-container">
        <div v-for="post in unknown" :key="post.id" class="card" :style="{backgroundColor: post.backgroundColor}">
            <p class="main-text">{{ post.title  }}</p>
            <p class="main-text">{{ post.as  }}</p>
            <p class="main-text">{{ post.text.substring(0, 40) }}</p>
            <router-link style="color: black!important;" :to="`/${post.id}`">More</router-link>
            <p class="date">{{ post.date }}</p>
        </div>
    </div>
</div>   
</template>

<script>
import Navigation from '../components/Navigation.vue';
import axios from 'axios';
export default{
    data() {
        return {
            postsData: [],
            selected:'',
            enemy:[],
            unknown: [],
        }
    },
    mounted() {
        axios.get(`posts.json`).then((response) => {
            this.formatPostsData(response.data);
            this.enemyData();
        })
    },
    methods: {
        formatPostsData(posts) {
            for (let key in posts) {
                this.postsData.push({ ...posts[key], id: key });
            }
        },
        enemyData(){
            for(let i = 0; i < this.postsData.length ; i++){
                if(this.postsData[i].as == "As a Stranger" && this.postsData[i].title != "Unknown"){
                    this.enemy.push ( this.postsData[i] );
                }else if(this.postsData[i].as == "As a Stranger" && this.postsData[i].title == "Unknown"){
                    this.unknown.push (this.postsData[i])
                }
            }
        }     
    },
    components: {
    Navigation,
  }
}
</script>
<style scoped>
hr{
    color: #a95ddd !important;
    border-top: 5px solid !important;
}
.header{
  max-width: 1500px;
  margin: auto;
  padding: 0px;
  margin-bottom: 30px;
  margin-top: 30px;
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
  width: 300px;
  height: 300px;
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