// 入口文件
import Vue from 'vue';

// 导入路由的包且安装
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入vue-resource的包
import VueResource from 'vue-resource';
Vue.use(VueResource);

// 导入vue-preview组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// 全局配置根域名
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
Vue.http.options.emulateJSON = true;

// 导入App.vue组件
import app from './App.vue';

// 导入router.js文件
import router from './router.js'

import VueLazyLoad from 'vue-lazyload';
// 引入mint-ui组件库的相关组件
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch } from 'mint-ui';
Vue.use(Lazyload);

// 引入mui的相关文件
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);

// 引入Vuex
import Vuex from 'vuex';
Vue.use(Vuex)

var carGoods = JSON.parse(localStorage.getItem('data')) || [];
var oldQuantity = 0;
carGoods.forEach(item => {
    oldQuantity += item.count;
})
const store = new Vuex.Store({
    state: {
        oldQuantity: oldQuantity,
        newQuantity: 1,
        oldNum: 1,
        carGoods: carGoods,
        sumPrice: 0,
        sumNum: 0
    },
    mutations: {
        addShopCar(state, goodsDetail) {
            state.oldQuantity = state.oldQuantity + state.newQuantity;
            var flag = true;
            state.carGoods.some(item => {
                if (item.id == goodsDetail.id) {
                    item.count++;
                    flag = false;
                }
            })
            if (flag) {
                state.carGoods.push(goodsDetail)
            }
            localStorage.setItem('data', JSON.stringify(state.carGoods))
        },
        changeNum(state, obj) {
            state.oldQuantity = 0;
            state.carGoods.some(item => {
                if (item.id == obj.id) {
                    item.count = obj.count;
                }
            })
            state.carGoods.forEach(item => {
                state.oldQuantity += item.count;
            })
            localStorage.setItem('data', JSON.stringify(state.carGoods))
        },
        getGoodsPrice(state) {
            // 这一句的作用是为了在点击switch时刷新carGoods数组的内容
            state.carGoods = JSON.parse(localStorage.getItem('data')) || [];
            var sPrice = 0;
            var sNum = 0;
            state.carGoods.forEach(item => {
                if (item.selected) {
                    sNum += item.count;
                    sPrice += item.price * item.count;
                }
            })
            state.sumNum = sNum;
            state.sumPrice = sPrice;
        },
        delGoods(state, id) {
            state.carGoods.some((item,index) => {
                if(item.id == id){
                    state.carGoods.splice(index,1);
                }
            })
            localStorage.setItem('data', JSON.stringify(state.carGoods));
            state.oldQuantity = 0;
            state.carGoods.forEach(item => {
                state.oldQuantity += item.count;
            })
        }
    }
})

// 引入jQuery
import $ from 'jquery';

// 定义时间格式化的过滤器
Vue.filter('dateFormat', function (dateStr, format = 'yyyy-mm-dd hh:mm:ss') {
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    if (format.toLowerCase() == 'yyyy-mm-dd hh:mm:ss') {
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`
    } else {
        return `${year}-${month}-${day}`
    }
})

var vm = new Vue({
    el: "#app",
    data: {

    },
    methods: {

    },
    render: function (c) {
        return c(app)
    },
    router,
    store
})

