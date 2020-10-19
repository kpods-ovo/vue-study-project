// 入口文件
import Vue from 'vue';

// 导入路由的包且安装
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入vue-resource的包
import VueResource from 'vue-resource';
Vue.use(VueResource);
// 全局配置根域名
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
Vue.http.options.emulateJSON = true;

// 导入App.vue组件
import app from './App.vue';

// 导入router.js文件
import router from './router.js'

// 引入mint-ui组件库的相关组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui';

// 引入mui的相关文件
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css'

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

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
    router
})

