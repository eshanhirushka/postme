<template>   
<Navigation />   
<div v-show="showModal" class="overlay">
      <div class="modal">
        <label>Name</label>
        <input v-model.trim="title" name="note" id="note" cols="30" rows="10" />
        <label>As a</label>
        <select v-model="selected" class="form-select" name="adviceAs" aria-label="Default select example">
          <option value="As a Friend" selected>Friend</option>
          <option value="As a Stranger">Stranger</option>
          <option value="As a Family">Family</option>
        </select>
        <label>Description</label>
        <textarea v-model.trim="newNote" name="note" id="note" cols="30" rows="10"></textarea>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <button @click="addNote">Add Note</button>
        <button class="close" @click="showModal = false">Close</button>
      </div>
    </div>  
<div class="row header">
    <div class="col-md-8">
      <h1><span style="color:Red; font-weight: bold;">Posts</span> Page</h1>
    </div>
    <div class="col-md-4 text-end">
        <button @click="showModal = true" class="btn btn-primary">Create Post</button>
    </div>
    <hr />
  </div>
<div class="container">
  <div class="cards-container">
    <div v-for="note in notes" class="card" :style="{backgroundColor: note.backgroundColor}" :post="note">
      <p class="main-text">{{ note.title }}</p>
      <p class="main-text">{{ note.as }}</p>
      <p class="main-text">{{ note.text }}</p>
      <router-link style="color: black!important;" :to="`/${this.more}`">More</router-link>
      <p class="date">{{ note.date }}</p>
    </div>
  </div>
  <div class="cards-container">
    <div v-for="post in postsData" :key="post.id" class="card" :style="{backgroundColor: post.backgroundColor}">
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
            more: '',
            title:'',
            selected: '',
            postsData: '',
            showModal: false,
            newNote:'',
            errorMessage: '',
            notes:[],
            post: {
              title: '',
              as: '',
              text: '',
              date: '',
              backgroundColor: ''},
        }
    },
    mounted() {
        axios.get(`posts.json`).then((response) => {
            this.formatPostsData(response.data);
        })
    },
    methods: {
        formatPostsData(posts) {
            this.postsData = [];
            for (let key in posts) {
                this.postsData.push({ ...posts[key], id: key });
            }
        },
        addNote(){
        if(this.newNote.length < 10 ) {
        return this.errorMessage = "Note needs to be 10 characters or more"
        }
        var color = this.getRandomColor()
        var date = new Date()
        var shorttext = this.newNote.substring(0, 40);
        if(this.title == ''){
          this.title = "Unknown"
        }
        if(this.as == ''){
          this.as = "As a Stranger"
        }
        this.notes.push({
        title: this.title,
        as: this.selected,
        text: shorttext,
        date: date.toLocaleDateString("en-US"),
        backgroundColor: color,
        })
        this.post.title = this.title,
        this.post.as = this.selected,
        this.post.text = this.newNote,
        this.post.date = date.toLocaleDateString("en-US"),
        this.post.backgroundColor = color
        axios.post(`posts.json`,this.post).then((response) => {
          console.log(response)
          this.more = response.data.name
          })
            this.title = '';
            this.newNote = '';
            this.selected = '';
            this.errorMessage = "";
            this.showModal = false;
        },
        getRandomColor() {
        return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        },
    },
    components: {
    Navigation,
  }
}
</script>

<style scoped>
hr{
  color: #f01a1a !important;
  border-top: 5px solid !important;
  margin-top: 5px;
}
.text-end {
  margin-top: 10px;
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
  max-width: 1100px;
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
  margin-left: 20px;
  margin-bottom: 20px;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
}
.overlay {
  position: fixed;
  width: 100%;
  height:100%;
  background-color: rgba(0,0,0,0.77);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 350px;
  height: 60%;
  background-color: white;
  border-radius: 30px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal button {
  padding: 10px 20px;
  font-size: 20px;
  width: 100%;
  background-color: blueviolet;
  border: none;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin-top: 15px;
}

.modal .close {
  background-color: rgb(193, 15, 15);
  margin-top: 7px;
}

.modal p {
  color: rgb(193, 15, 15);
}
</style>