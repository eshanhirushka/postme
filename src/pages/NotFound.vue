<template>
    <Navigation />
    <div><h1>
        Page Not Found Error 404
    </h1>
    <router-link to="/">Go Back to HomePage</router-link>
</div>

</template>
<script>
import Navigation from '../components/Navigation.vue';
export default{
    data(){

    },
    components: {
    Navigation,
  }
}
</script>