<template>
  <div style="background-color:black;">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <div class="container py-5" style="overflow-x: scroll;">
      <table class="table text-white">
        <thead>
          <tr class="cart-info" >
            <th scope="col" class="text-center">圖片</th>
            <th scope="col" class="text-center">商品名稱</th>
            <th scope="col" class="text-center">數量</th>
            <th scope="col" class="text-center">小計</th>
            <th scope="col" class="text-center">加入購物車</th>
            <th scope="col" class="text-center">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr class="cart-info" v-for="(item,key) in WishItemInfo" :key="key">
            <td class="py-3 text-center">
              <img :src="item.image" alt class style="height:100px;" />
            </td>
            <td class="text-center py-3">{{item.title}}</td>
            <td class="text-center py-3">
              <div class="input-group addcount" style="max-width: 120px;">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-vrpink"
                    type="button"
                    @click.prevent="CutCount(item)"
                  >&minus;</button>
                </div>
                <input
                  type="text"
                  class="form-control text-center"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  :value="item.qty"
                  disabled
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-vrpink"
                    type="button"
                    @click.prevent="addCount(item)"
                  >&plus;</button>
                </div>
              </div>
            </td>
            <td class="text-center py-3">{{item.price | currency}}</td>
            <td class="text-center py-3">
              <button type="button" class="btn btn-vrpink" @click="addCart(item.id,item.qty)">
                <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                <i class="fas fa-shopping-cart"></i>
              </button>
            </td>
            <td class="text-center py-3">
              <button type="button" class="btn btn-vrpink" @click="delLike(item.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
      products: [],
      WishItemInfo: [],
      WishList: JSON.parse(localStorage.getItem("Like Item")) || [],

      isLoading: false,
      status: {
        loadingItem: ""
      }
    };
  },

  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        vm.products = response.data.products;
        vm.isLoading = false;
        console.log(vm.products);
        console.log("list", vm.WishList.id);
        //取得我的最愛列表
        vm.WishItemInfo = vm.products.filter((element, index, array) => {
          return vm.WishList.indexOf(element.id) != -1;
        });
        console.log("filter", vm.WishItemInfo);
        vm.WishItemInfo.forEach((element, index, array) => {
          element.qty = 1;
        });
        console.log("for", vm.WishItemInfo);
        //取得我的最愛數量
        this.$bus.$emit("get:likeVal", vm.WishItemInfo.length);
        console.log("最愛數量", vm.WishItemInfo.length);
      });
    },
    delLike(item, id) {
      const vm = this;
      const num = vm.WishList.indexOf(item);
      vm.isLoading = true;
      if (num !== -1) {
        vm.WishList.splice(num, 1);
        vm.isLoading = false;
        vm.getProducts();
        this.$bus.$emit("messsage:push", "已將商品刪除", "danger");
      }
      localStorage.setItem("Like Item", JSON.stringify(vm.WishList));
    },
    addCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty
      };
      vm.status.loadingItem = id;
      this.$http.post(api, { data: cart }).then(response => {
        console.log(response);
          vm.status.loadingItem = "";
          vm.getCartVal();
          this.$bus.$emit("messsage:push", "已加到購物車囉", "vrblue");
      });
    },
    getCartVal() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then(response => {
        console.log(response.data.data.carts.length);
        this.$bus.$emit(
          "get:cartval",
          response.data.data.carts.length,
          "添加成功"
        );
      });
    },
    CutCount(item) {
      if (item.qty > 1) {
        item.qty--;
      }
      const num = this.WishItemInfo.indexOf(item);
      this.$set(this.WishItemInfo, num, this.WishItemInfo[num]);
    },
    addCount(item) {
      item.qty++;
      const num = this.WishItemInfo.indexOf(item);
      this.$set(this.WishItemInfo, num, this.WishItemInfo[num]);
    }
  },

  created() {
    this.getProducts();
    this.getCartVal();
    this.getLikeVal();
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
.addcount {
  margin: 0 auto;
}
</style>