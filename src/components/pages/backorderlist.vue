<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-9">
        <div class="container">
          <h3 class="p-4">訂單管理</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">建立日期</th>
                <th scope="col">訂單編號</th>
                <th scope="col">客戶姓名</th>
                <th scope="col">電話</th>
                <th scope="col">總金額</th>
                <th scope="col">是否付款</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,key) in orderlist.orders" :key="key">
                <td>{{item.create_at | date}}</td>
                <td>{{item.id}}</td>
                <td>{{item.user.name}}</td>
                <td>{{item.user.tel}}</td>
                <td>{{item.total | currency}}</td>
                <td>
                  <strong v-if="item.is_paid" class="text-success">已付款</strong>
                  <span v-else class="text-muted">尚未付款</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <page :pages="pagination" @emitPages="getOrder"></page>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import page from "../Pagination2";

export default {
  components: {
    page
  },
  data() {
    return {
      orderlist: [],
      pagination: {},
      isLoading: false
    };
  },
  methods: {
    getOrder(current_page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${current_page}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.orderlist = response.data;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
        console.log(vm.orderlist);
        console.log(vm.pagination);
      });
    }
  },
  created() {
    this.getOrder();
  }
};
</script>

<style>
</style>

