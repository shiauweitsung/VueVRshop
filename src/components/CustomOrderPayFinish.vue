<template>
  <div>
    <div class="banner">
      <div class="row justify-content-center">
        <div class="col-md-3 d-flex flex-column justify-content-center align-items-center  rounded mt-8 py-6 pay-info">
          <h2 class="text-white">付款完成</h2>
          <div class="row">
            <div class="col pt-5">
              <router-link class="btn btn-vrpink mr-3" to="/products">再去購物</router-link>
              <router-link class="btn btn-vrpink" to="/home">回首頁</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.banner {
  background-image: url(../assets/banner6.jpg);
  background-size: cover;
  background-position: center;
  min-height: 600px;
}
.pay-info{
    background-color: rgba(0, 0, 0, 0.315);
}
</style>