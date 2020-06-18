<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar bg-dark">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-3 text-white"
        >管理員</h6>
        <ul class="nav flex-column mb-2 side">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/backproducts" >
              <i class="fas fa-box mr-2"></i>商品管理
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/backcoupon">
              <i class="fas fa-box mr-2"></i>優惠券管理
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/backorderlist">
              <i class="fas fa-list mr-2"></i>訂單管理
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style>
.sidebar {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 50px 20px 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
}

.side li {
  padding: 5px 0px;
}
.side li a {
  color: white;
  display: inline-block;
}
.side li a:hover {
  color: #dc007b;
}
.side li a:after {
  display: block;
  content: "";
  border-bottom: solid 2px #dc007b;
  transform: scaleX(0);
  transition: transform 350ms ease-in-out;
}
.side li a:hover:after {
  transform: scaleX(1);
  transform-origin: 0% 50%;
}
.side li a.active{
  color: #dc007b;
  
}
</style>

