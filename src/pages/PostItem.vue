<template>
    <Navigation />
    <div class="header">
        <h1><span style="color:darkorange; font-weight: bold;">Post</span> Item <span :style="{color: post.backgroundColor}">{{ this.id }}</span></h1>
        <hr />
        <br>
        <h3><router-link to="/">back to Posts Page</router-link></h3>
        <br>
        <br>
    </div>
    
    <div class="container">
        <div class="cards-container">
            <div class="card" :style="{backgroundColor: post.backgroundColor}">
                    <p class="main-text" style="font-weight: bold;">Name: {{ post.title  }}</p>
                    <p class="main-text" style="font-style: italic; font-weight: bold">{{ post.as  }}</p>
                    <p class="main-text space"><span style="font-weight: bold;">Feed: </span><p>{{ post.text }}</p></p>
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
            id: '',
            post: ''
        };
    },
    created() {
        this.getPostDetails();
        this.$watch(
            () => this.$route.params,
            () => {
                this.getPostDetails();
            }
        )
    },
    methods: {
        getPostDetails() {
            this.id = this.$route.params.postId;
            axios.get(`posts/${this.id}.json`).then((response) => {
            this.post = response.data;
        });
        }
    },
    components: {
    Navigation,
  }
}
</script>
<style scoped>
hr{
    color: #cea317 !important;
    border-top: 5px solid !important;
}
.date{
  font-size: 16px;
  font-weight: bold;
}
.header{
  max-width: 1500px;
  margin: auto;
  padding: 0px;
  margin-bottom: 30px;
  margin-top: 30px;
}
.container {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
}
.card {
  width: 500px;
  height: 500px;
  background-color: rgb(237, 182, 44);
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 20px;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
}
.space{
    height: 350px;
}
</style>