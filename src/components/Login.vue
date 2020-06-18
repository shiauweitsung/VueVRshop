<template>
  <div class="signin">
    <Alert></Alert>
    <div class="container">
      <div class="row justify-content-center py-4">
        <div class="col-md-4 text-vrpink sign-info rounded py-3">
          <form @submit.prevent="signin">
            <h3 class="text-white text-center">登入</h3>
            <div class="form-group">
              <label for="exampleInputEmail1" class="font-weight-bold">帳號</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="請輸入email帳號或是手機號碼"
                v-model="user.username"
              />
              <small id="emailHelp" class="text-vrblue">請輸入email帳號或是手機號碼</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1" class="font-weight-bold">密碼</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="請輸入密碼"
                v-model="user.password"
              />
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">記住我</label>
            </div>
            <button type="submit" class="btn btn-vrpink">登入</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "./AlertMessage";
export default {
  components: {
    Alert
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then(response => {
        console.log(response);
        if (response.data.success) {
          vm.$router.push("/admin/backproducts");
        } else {
          this.$bus.$emit("messsage:push", response.data.message, "success");
          // vm.$bus.$emit('messsage:push', message, status);
          // message(String): 訊息內容
          // status(String): Alert 的樣式
        }
      });
    }
  }
};
</script>
<style>
.signin {
  background-image: url(../assets/signin-banner.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 30% 30%;
}
.sign-info {
  background-color: rgba(80, 78, 78, 0.596);
}
</style>