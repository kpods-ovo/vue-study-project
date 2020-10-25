<template>
    <div>
        <!-- 轮播图模块 -->
        <mt-swipe :auto="3000" :speed="500">
            <mt-swipe-item v-for="(item,index) in RotationChartList" :key="index">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 九宫格模块 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newlist">
                    <img src="../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photos">
                    <img src="../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <router-link to="/home/goods">
                        <img src="../images/menu3.png" alt="">
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                RotationChartList: []
            }
        },
        created() {
            this.getChart();
        },
        methods: {
            getChart() {
                this.$http.get('api/getlunbo').then(response => {
                    if (response.body.status === 0) {
                        this.RotationChartList = response.body.message;
                    } else {
                        console.log("请求数据失败desune!");
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .mint-swipe {
        height: 200px;
    }

    .mint-swipe-items-wrap img {
        height: 100%;
        width: 100%;
    }

    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
    }

    .mui-table-view img {
        width: 60px;
        height: 60px;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        margin: 10px 16px;
        border: none;
        padding: 0px 15px;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
        font-size: 13px;
    }
</style>