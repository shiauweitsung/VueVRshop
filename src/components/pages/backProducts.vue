<template>
  <div style="
    position: relative;
">
    <loading :active.sync="isLoading"></loading>
    <!--/admin/backproducts 網址-->
    <div class="backproduct"></div>
    <div class="container">
      <button class="btn btn-vrpink float-right mt-3 mr-2" @click="openModal(isNew = true)" style="position:relative">建立新產品</button>
      <div class="row justify-content-center">
        <div class="col-md-8 text-white">
          <div
            class="row py-3 border border-vrblue rounded my-2"
            v-for="(item,key) in products"
            :key="key"
          >
            <div class="col-3">
              <img :src="item.image" alt class="img-fluid" style="height:100px" />
            </div>
            <div class="col-9 d-flex align-items-center justify-content-around">
              <h4 class="m-0">{{item.title}}</h4>
              <p class="m-0">原價:{{item.origin_price | currency}}</p>
              <p class="m-0">售價:{{item.price | currency}}</p>
              <div class="d-flex">
                <p class="m-0">
                  <button
                    class="btn btn-vrpink mr-2"
                    data-toggle="modal"
                    data-target="#productModal"
                    @click="openModal(isNew = false , item)"
                  >編輯</button>
                </p>
                <p class="m-0">
                  <button class="btn btn-vrpink" @click="delProductModal(item)">刪除</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--分頁製作
      <nav aria-label="Page navigation example ">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled' : !pagination.has_pre}">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="getProducts(pagination.current_page - 1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            v-for="page in pagination.total_pages"
            :key="page"
            :class="{ 'active' : pagination.current_page === page}"
          >
            <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
          </li>
          <li class="page-item" :class="{ 'disabled' : !pagination.has_next}">
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="getProducts(pagination.current_page + 1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>-->
       <page :pages="pagination" @emitPages="getProducts"></page>
    </div>

    <!--編輯與新增產品-->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>產品列表</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.image"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileuploading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadfile"
                  />
                </div>
                <img class="img-fluid" alt :src="tempProduct.image" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="1"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-vrpink" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!--刪除商品-->
    <div
      class="modal fade"
      id="delProductModal"
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
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import page from '../Pagination2';

export default {
  components: {
    page,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isLoading: false,
      isNew: false,
      status: {
        fileuploading: false
      }
    };
  },

  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.products = response.data.products;
        console.log(vm.products);
        console.log(response.data);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    //在開啟產品檔案時，新增參數，判斷是否為新產品或是舊產品
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          console.log("建立失敗");
          $("#productModal").modal("hide");
        }
      });
    },
    delProductModal(item) {
      const vm = this;
      //將產品物件存入tempProduct 使用object是因為傳入的值是陣列
      vm.tempProduct = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },
    delProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;

      this.$http.delete(api).then(response => {
        if (response.data.success) {
          console.log("刪除成功");
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          console.log("刪除失敗");
        }
      });
    },
    //上傳圖片行為
    uploadfile() {
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      //新增一個formData的格式
      const formData = new FormData();
      vm.status.fileuploading = true;
      formData.append("file-to-upload", uploadedFile);
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.$http
        .post(api, formData, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          if (response.data.success) {
            //強制將圖片路徑寫入欄位
            vm.tempProduct.image = response.data.imageUrl;
            // vm.$set(vm.products, 'image',response.data.imageUrl)
            vm.status.fileuploading = false;
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style>
.backproduct {
position: fixed;
    top: 0;
    bottom: 0;
    background-image: url(../../assets/backproductbanner.jpg);
    background-size: cover;
    width: 100%;
    background-repeat: no-repeat;
}
</style>