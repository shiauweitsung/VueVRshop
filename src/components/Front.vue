<template>
  <div>
  <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Header from './header';
import Footer from './footer';

export default {
  components: {
    Header,
    Footer,
  }
}
</script>

<style lang="scss">
@import "../assets/all";
</style>