<template>
  <div id="app">
    
    <router-view></router-view>
  
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Header from './components/header';
import Footer from './components/footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
