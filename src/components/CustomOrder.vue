<template>
  <div class="custom-order-bg">
    <div class="container text-vrpink">
      <h2 class="text-center py-4">訂單明細</h2>
      <div class="row justify-content-center align-items-center">
        <table class="table col-md-6 text-vrblue cart-bg rounded">
          <thead>
            <tr class="cart-info">
              <th scope="col">名稱</th>
              <th scope="col">圖片</th>
              <th scope="col">數量</th>
              <th scope="col">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,key) in cart.carts" :key="key" class="cart-info">
              <td>{{item.product.title}}</td>
              <td>
                <img :src="item.product.image" alt class="img-fluid" style="height:100px" />
              </td>
              <td>{{item.qty}}</td>
              <td>{{item.product.price | currency}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row flex-column justify-content-center align-items-center">
        <h2 class="py-4">填寫收件人資料</h2>
        <div class="col-md-5">
          <form @submit.prevent="creatOrder">
            <div class="form-group">
              <label for="exampleInputEmail1">信箱</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                name="email"
                v-model="form.user.email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-validate="'required|email'"
                :class="{'is-invalid':errors.has('email')}"
              />
              <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
            </div>
            <div class="form-group">
              <label for="exampleInputname">收件人姓名</label>
              <input
                type="text"
                name="name"
                class="form-control"
                v-model="form.user.name"
                id="exampleInputname"
                placeholder="收件人姓名"
                v-validate="'required'"
                :class="{'is-invalid':errors.has('name')}"
              />
              <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
            </div>
            <div class="form-group">
              <label for="exampleInputnumber">電話</label>
              <input
                type="num"
                name="number"
                class="form-control"
                id="exampleInputnumber"
                v-model="form.user.tel"
                v-validate="'required'"
                placeholder="請輸入手機號碼或是家裡電話"
                :class="{'is-invalid':errors.has('number')}"
              />
              <span class="text-danger" v-if="errors.has('number')">電話必須輸入</span>
            </div>
            <div class="form-group">
              <label for="exampleInputaddress">地址</label>
              <input
                type="address"
                class="form-control"
                name="address"
                v-model="form.user.address"
                id="exampleInputaddress"
                placeholder="請輸入地址"
                v-validate="'required'"
                :class="{'is-invalid':errors.has('address')}"
              />
              <span class="text-danger" v-if="errors.has('address')">地址必須輸入唷</span>
            </div>
            <div class="form-group">
              <label for="useraddress">留言</label>
              <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="d-flex justify-content-around py-4">
              <router-link class="btn btn-vrpink" to="/cart">返回上一頁</router-link>
              <button class="btn btn-vrpink" to="/cart">送出</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },

  methods: {
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response);
        console.log(response.data.data);
        console.log(response.data.data.carts);
        vm.cart = response.data.data;
      });
    },
    creatOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      this.$validator.validate().then(result => {
        if (result) {
          // 當驗證成功時執行 AJAX 的行為
          this.$http.post(api, { data: vm.form }).then(response => {
            console.log(response);
            if (response.data.success) {
              vm.$router.push(`/custom-order-pay/${response.data.orderId}`);
              
            }
          });
        } else {
          // 驗證失敗產生的行為
          console.log("失敗");
        }
      });
    }
  },

  created() {
    this.getCart();
  }
};
</script>

<style>
.cart-bg {
  background-color: rgba(0, 0, 0, 0.616);
}
.cart-info th,
.cart-info td {
  text-align: center;
  vertical-align: middle;
}
.custom-order-bg {
  background: url(../assets/order-bg.jpg);
  background-size: cover;
}
</style>