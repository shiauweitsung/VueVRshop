<template>
  <div style="background-color:black">
  <Alert/>
    <div class="container text-white">
      <div class="row">
        <div class="col-md-3">
          <h6 class="my-4">
            <router-link class="text-vrpink" to="/products">
              <i class="fas fa-arrow-left"></i> 返回
            </router-link>
          </h6>
        </div>
        <div class="col-md-9 my-4">
          <div class="row">
            <div class="col-md-8">
              <img :src="product.image" alt style class="img-fluid rounded border" />
            </div>
            <div class="col-md-4 border border-vrblue rounded py-3 px-2">
              <h4>{{product.title}}</h4>
              <hr class="border-bottom-0 border-vrpink" />
              <div class="d-flex justify-content-around">
                <p style="text-decoration: line-through;">原價: {{product.origin_price | currency}}</p>
                <p class="text-danger font-weight-bold">特價: {{product.price | currency}}</p>
              </div>
              <div class="border rounded border-vrpink p-2">
                <p class="m-0">產品介紹:</p>
                <p>{{product.description}}</p>
              </div>
              <div class="my-3 d-flex justify-content-center">
                <span class="mr-2">加購數量</span>
                <select name id v-model="num">
                  <option v-for="num in 10" :key="num">{{num}}</option>
                </select>
              </div>

              <div class="d-flex justify-content-center my-3">
                <button class="btn btn-vrpink" @click="addCart(product.id,num)"><i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>ADD TO BAG</button>
              </div>
            </div>
          </div>
          <p class="border border-vrpink rounded p-2 my-2">{{product.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Alert from './AlertMessage';
export default {
  components: {
    Alert,
  },
  data() {
    return {
      id: "",
      product: {},
      num: "1",
      like: JSON.parse(localStorage.getItem('Like item')) || [],
      status: {
        loadingItem: ""
      }
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.id}`;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;
        console.log(response.data);
        console.log(vm.product);
        console.log(response.data.product);
      });
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
        this.$bus.$emit("messsage:push", response.data.message, "vrblue");
      });
    },
    editLike(){

    },
     getCartVal() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
        this.$bus.$emit("get:cartval", response.data.data.carts.length);
      });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getProduct();
    this.getCartVal();
  }
};
</script>
<style>
</style>