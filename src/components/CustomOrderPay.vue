<template>
  <div style="background:black">
    <div class="container">
      <h2 class="text-center text-white py-4">結帳確認</h2>
      <form @submit.prevent="payOrder">
        <table class="table text-white">
          <thead>
            <tr class="cart-info">
              <th scope="col" class="text-center">商品名稱</th>
              <th scope="col" class="text-center">圖片</th>
              <th scope="col" class="text-center">數量</th>
              <th scope="col" class="text-center">小計</th>
            </tr>
          </thead>
          <tbody v-for="(item,key) in order.products" :key="key">
            <tr class="cart-info">
              <td class="text-center py-3">{{item.product.title}}</td>
              <td class="text-center py-3">
                <img :src="item.product.image" alt class="img-fluid" style="height:100px" />
              </td>
              <td class="text-center py-3">{{item.qty}}</td>
              <td class="text-center py-3">{{item.total | currency}}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-white text-right mr-7">總共:{{order.total | currency}}</div>

        <h2 class="text-center text-white py-4">付款資訊確認</h2>
        <hr class="border-top border-vrpink pt-4" />
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-md-6">
            <dl class="row text-white">
              <dt class="col-sm-5">姓名</dt>
              <dd class="col-sm-7">{{order.user.name}}</dd>
              <dt class="col-sm-5">電話</dt>
              <dd class="col-sm-7">{{order.user.tel}}</dd>

              <dt class="col-sm-5">email</dt>
              <dd class="col-sm-7">{{order.user.email}}</dd>

              <dt class="col-sm-5">地址</dt>
              <dd class="col-sm-7">{{order.user.address}}</dd>
              <dt class="col-sm-5">留言</dt>
              <dd class="col-sm-7">{{order.message}}</dd>
            </dl>
          </div>
        </div>
        <hr class="border-top border-vrpink" />
        <div class="row justify-content-center">
          <div class="col-md-6 d-flex justify-content-around">
            <button class="btn btn-vrpink my-5">確認付款</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: "",
      order: {}
    };
  },

  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;

      this.$http.get(api).then(response => {
        console.log(response);
        vm.order = response.data.order;
        vm.order_data = response.data;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;

      this.$http.post(api).then(response => {
        console.log(response);
        if (response.data.success) {
          vm.$router.push(`/custom-order-pay-finish`);
        }
      });
    },
    getCartVal() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        this.$bus.$emit("get:cartval", response.data.data.carts.length);
      });
    },
  },

  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrder();
    this.getCartVal();
  }
};
</script>

<style>
.table th .table td {
  vertical-align: middle;
}
</style>