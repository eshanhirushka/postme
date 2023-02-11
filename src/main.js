import { createApp } from 'vue';
import App from './App.vue';
import Enemy from './pages/Enemy.vue';
import Friend from './pages/Friend.vue';
import Family from './pages/Family.vue';
import Posts from './pages/Posts.vue';
import PostItem from './pages/PostItem.vue';
import NotFound from './pages/NotFound.vue';
import axios from 'axios';

import { createRouter, createWebHistory } from 'vue-router';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

axios.defaults.baseURL = `https://vue-notes-fab2f-default-rtdb.firebaseio.com/`

const routes = [{ path: '/', component:Posts, children:[
    { path: '', component:Enemy },
    { path: '', component:Friend },
    { path: '', component:Family },
]},
{ path: '/stranger', component:Enemy },
{ path: '/friend', component:Friend },
{ path: '/family', component:Family },
{ path: '/:postId', component:PostItem },
{ path: '/:pathMatch(.*)*', name: 'NotFound', component:NotFound },
];


const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

app.use(router);
app.mount('#app');