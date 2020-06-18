<template>
  <div style="background-color:black;">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <div class="container py-5" v-if="cart.total" style="overflow-x: scroll;">
      <table class="table text-white">
        <thead>
          <tr class="cart-info">
            <th scope="col" class="text-center">圖片</th>
            <th scope="col" class="text-center">商品名稱</th>
            <th scope="col" class="text-center">數量</th>
            <th scope="col" class="text-center">小計</th>
            <th scope="col" class="text-center"></th>
          </tr>
        </thead>
        <tbody v-for="(item,key) in cart.carts" :key="key">
          <tr class="cart-info">
            <td class="py-3 text-center">
              <img :src="item.product.image" alt class style="height:100px;" />
            </td>
            <td class="text-center py-3">{{item.product.title}}</td>
            <td class="text-center py-3">{{item.qty}}</td>
            <td class="text-center py-3">{{item.final_total | currency}}</td>
            <td class="text-center py-3">
              <button type="button" class="btn btn-vrpink" @click="delModal(item)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr class="border-bottom border-vrpink border-top-0" />

      <div class="row py-5">
        <div class="col-md-8">
          <div class="row justify-content-around">
            <div class="col-md-8 d-flex flex-column align-items-center">
              <input
                type="text"
                placeholder="請輸入折價"
                class="w-75 rounded border border-vrpink p-1"
                v-model="couponCode"
              />
              <small class="text-vrpink">請輸入: "BeatSaberKing" 即可享有最高優惠</small>
            </div>
            <div class="col-md-4 d-flex d-md-block justify-content-center my-2 my-md-0">
              <button class="btn btn-vrpink" @click="addCoupon">使用優惠券</button>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-white text-center">
          <p>總計:{{cart.total | currency}}</p>
          <hr class="border" />
          <p
            v-if="cart.final_total!==cart.total"
            class="text-vrpink font-weight-bold"
          >折扣後:{{cart.final_total | currency}}</p>
        </div>
      </div>
      <div class="text-center">
        <router-link class="btn btn-vrpink w-50" to="/custom-order">結帳並前往填寫個人資料</router-link>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row justify-content-center">
        <div class="col-md-8 cart-banner">
          <h1 class="text-vrpink text-center pt-8">購物車沒有商品 : (</h1>
          <div class="d-flex justify-content-center mt-4">
            <router-link class="btn btn-vrpink" to="/products">現在去逛逛</router-link>
          </div>
        </div>
      </div>
    </div>
    <!--刪除商品-->
    <div
      class="modal fade"
      id="delModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger"></strong>商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct(tempCart.id)">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Alert from "./AlertMessage";
export default {
  components: {
    Alert
  },
  data() {
    return {
      cart: {},
      cartVal: "0",
      tempCart: {},
      couponCode: "",
      isLoading: false
    };
  },

  methods: {
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        console.log(response.data.data);
        console.log(response.data.data.carts);
        vm.cart = response.data.data;
        this.$bus.$emit("get:cartval", response.data.data.carts.length);
        vm.isLoading = false;
      });
    },
    delModal(item) {
      const vm = this;
      vm.tempCart = Object.assign({}, item);
      $("#delModal").modal("show");
    },
    delProduct(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          $("#delModal").modal("hide");
          console.log(response.data);
          vm.isLoading = false;
          this.$bus.$emit("messsage:push", "已將商品刪除", "danger");
          vm.getCart();
          this.$bus.$emit("get:cartval", response.data.data.carts.length);
        } else {
          console.log("刪除失敗");
        }
      });
    },
    addCoupon() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      vm.isLoading = true;
      const coupon = {
        code: vm.couponCode
      };
      this.$http.post(api, { data: coupon }).then(response => {
        vm.getCart();
        vm.isLoading = false;
      });
    }
  },

  created() {
    this.getCart();
  }
};
</script>

<style>
.cart-info td,
.cart-info th {
  vertical-align: middle;
}
.cart-banner {
  min-height: 500px;
  background: url(../assets/cartBanner.jpg);
  background-repeat: no-repeat;
  background-position: center;
}
</style>