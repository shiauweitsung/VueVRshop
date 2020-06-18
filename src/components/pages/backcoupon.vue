<template>
  <div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8 mx-4">
        <button class="btn btn-vrpink my-2" @click="openModal(isNew)">新增優惠</button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">優惠標題</th>
              <th scope="col">金鑰ID</th>
              <th scope="col">折扣數</th>
              <th scope="col">使用期限</th>
              <th scope="col">是否啟用</th>
              <th scope="col">修改/刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,key) in coupons" :key="key">
              <td>{{item.title}}</td>
              <td>{{item.id}}</td>
              <td>{{item.percent}}</td>
              <td>{{item.due_date}}</td>
              <td>{{item.is_enabled}}</td>
              <td>
                <button class="btn btn-vrpink" @click="openModal(isNew = false ,item)">修改</button>
                <button class="btn btn-vrpink" @click="delModal(item)">刪除</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
    <!--新增產品modal-->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="請輸入標題"
                v-model="tempCoupon.title"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                placeholder="請輸入優惠碼"
                v-model="tempCoupon.code"
              />
            </div>    
                        <div class="form-group">
              <label for="coupon_id">金鑰</label>
              <input
                type="text"
                class="form-control"
                id="coupon_id"
                placeholder="請輸入金鑰"
                v-model="tempCoupon.id"
              /> 
              </div>         
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date" v-model="tempCoupon.due_date" />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                placeholder="請輸入折扣百分比"
                v-model="tempCoupon.percent"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
    <!--刪除商品-->
    <div
      class="modal fade"
      id="delcouponModal"
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
            是否刪除{{tempCoupon.title}}
            <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import page from "../Pagination2";
export default {
  component: {
    page
  },
  data() {
    return {
      coupons: {},
      pagination: {},
      //tempCoupon 送出的欄位
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ""
      },
      isNew: false
    };
  },
  methods: {
    getCoupon(page = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      this.$http.get(url).then(response => {
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        console.log(vm.coupons);

      });
    },
    openModal(isNew, item) {
      const vm = this;
      $("#couponModal").modal("show");
      if (vm.isNew) {
        vm.tempCoupon = {};
        isNew = true;
      } else {
        vm.tempCoupon = Object.assign({}, item);
        isNew = false;
      }
    },
    updateCoupon() {
      const vm = this;
      let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post";
      if (!vm.isNew) {
        url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](url, { data: vm.tempCoupon }).then(response => {
        console.log(response);
        if (response.data.success) {
          $("#couponModal").modal("hide");
          this.getCoupon();
        } else {
          console.log("新增失敗");
        }
      });
    },
    delModal(item) {
      const vm = this;
      vm.tempCoupon = Object.assign({}, item);
      $("#delcouponModal").modal("show");
    },
    delCoupon() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(url).then(response => {
        if (response.data.success) {
          $("#delcouponModal").modal("hide");
          console.log("刪除成功");
          vm.getCoupon();
        } else {
          console.log("刪除失敗");
        }
      });
    }
  },
  created() {
    this.getCoupon();
  }
};
</script>

<style>
</style>

