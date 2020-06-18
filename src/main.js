// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';
import currencyFilter from './filter/currency';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import dateFilter from './filter/date';
import './bus';

axios.defaults.withCredentials = true;
import App from './App';
import router from './router';

Vue.component('Loading',Loading);
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.filter('currency',currencyFilter);
Vue.filter('date', dateFilter);
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  i18n,
});

//設定網址驗證方法
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){//
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
    console.log(response.data);
    if(response.data.success){
      next();
    } else({
        path: '/login', 
    });
        });
  }else{
    next();
  }
});
