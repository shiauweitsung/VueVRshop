<template>
  <div class="header" style="background:black;">
    <div class="container">
      <nav class="navbar navbar-expand-lg logo">
        <h1 class="m-0">
          <a class="navbar-brand text-white" href="#">VR .</a>
        </h1>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto menu">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">回到前台</router-link>
            </li>
          </ul>
          <ul class="navbar-nav menu">
            <li class="nav-item active">
            <a href="#" class="nav-link" @click.prevent="logout">登出</a>
            </li>
          </ul>
        </div>
      </nav>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api, vm.user).then(response => {
        console.log(response);
        if(response.data.success){
            vm.$router.push('/');
        }
      });
    }
  }
};
</script>

<style>
.logo h1 {
  font-size: 0px;
}
</style>