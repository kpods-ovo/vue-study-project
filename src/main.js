// 入口文件
import Vue from 'vue';

// 导入App.vue组件
import app from './App.vue';

// 引入mint-ui组件库的相关组件
import {Header} from 'mint-ui';

// 引入mui的相关文件
import './lib/mui/css/mui.css';

Vue.component(Header.name,Header);

var vm = new Vue({
    el:"#app",
    data:{

    },
    methods:{

    },
    render:function(c){
        return c(app)
    }
})

