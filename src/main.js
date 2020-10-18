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

// 导入App.vue组件
import app from './App.vue';

// 导入router.js文件
import router from './router.js'

// 引入mint-ui组件库的相关组件
import { Header, Swipe, SwipeItem } from 'mint-ui';

// 引入mui的相关文件
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css'

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

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

