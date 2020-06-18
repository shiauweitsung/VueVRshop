import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/home';
import Products from '@/components/Products';
import Product from '@/components/Product';
import Login from '@/components/Login';
import Cart from '@/components/Cart';
import likeList from '@/components/likeList';

import CustomOrder from '@/components/CustomOrder';
import CustomOrderPay from '@/components/CustomOrderPay';
import CustomOrderPayFinish from '@/components/CustomOrderPayFinish';


//back
import Backhome from '@/components/pages/Backhome';
import BackProducts from '@/components/pages/backProducts';
import Backcoupon from '@/components/pages/backcoupon';
import Backorderlist from '@/components/pages/backorderlist';

//front
import Front from '@/components/Front';
Vue.use(VueRouter);

export default new VueRouter({
    linkActiveClass: 'active',
    routes: [
        {
            path: '*',
            redirect: '/',
        },
        {
            path: '/',
            name: 'front',
            component: Front,
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: Home,
                },
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                },
                {
                    path:'product/:id',
                    name: 'Product',
                    component: Product,

                },
                {
                    path: 'cart',
                    name: 'Cart',
                    component: Cart,
                },
                {
                    path: 'likeList',
                    name: 'LikeList',
                    component: likeList,
                },
                
                {
                    path: 'custom-order',
                    name: 'CustomOrder',
                    component: CustomOrder,
                },
                {
                    path: 'custom-order-pay/:orderId',
                    name: 'CustomOrderPay',
                    component: CustomOrderPay,
                },
                {
                    path: 'Custom-order-pay-finish',
                    name: 'CustomOrderPayFinish',
                    component: CustomOrderPayFinish,
                },
                {
                    path: '/login',
                    name: 'Login',
                    component: Login,
                },
            ],

        },
        {
            path: '/admin',
            name: 'Backhome',
            component: Backhome,
            children: [
                {
                    path: 'backproducts',
                    name: 'BackProducts',
                    component: BackProducts,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'backcoupon',
                    name: 'Backcoupon',
                    component: Backcoupon,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'backorderlist',
                    name: 'Backorderlist',
                    component: Backorderlist,
                    meta: { requiresAuth: true },
                },
            ],
        },
        // {
        //     path: '/admin/backproducts',
        //     name: 'BackProducts',
        //     component: BackProducts,
        // },




    ],



});