<template>
  <div style="background:black;">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <h1>
          <router-link class="navbar-brand text-white" to="/">VR .</router-link>
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
          <ul class="navbar-nav ml-auto menu">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">產品購買</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/login">後臺管理登入</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/likeList">
                <i class="fas fa-heart">
                  <span class="count count-like" v-if="likeVal>0">{{likeVal}}</span>
                </i>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">
                <i class="fas fa-shopping-cart">
                  <span class="count count-cart" v-if="cartVal>0">{{cartVal}}</span>
                </i>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      cartVal: 0,
      likeVal: 0
    };
  },
  created() {
    const vm = this;
    vm.$bus.$on("get:cartval", val => {
      vm.cartVal = val;
    });
    vm.$bus.$on("get:likeVal", val => {
      vm.likeVal = val;
    });
  }
};
</script>




<style>
@media (max-width: 991px) {
  .count-cart {
    top: 235px;
    left: 27px;
    right: 0;
  }  
  .count-like {
    top: 193px;
    left: 27px;
    right: 0;
  }
}
</style>

