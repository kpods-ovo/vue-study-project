<template>
    <div>
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="isShow" ref="ball"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-swipe :auto="5000" :speed="500">
                        <mt-swipe-item v-for="(item,index) in goodsPhotos" :key="index">
                            <img :src="item.src" alt="">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品名称</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        <span>市场价：<small>￥{{goodsInfos.market_price}}</small></span>
                        <span>销售价：<strong>￥{{goodsInfos.sell_price}}</strong></span>
                    </div>
                    <div class="number">
                        <span>购买数量：</span>
                        <numbox :maxValue="goodsInfos.stock_quantity"></numbox>
                    </div>
                    <div class="btn">
                        <mt-button type="primary" size="small" @click="">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="showBall">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfos.goods_no}}</p>
                    <p>库存情况：{{goodsInfos.stock_quantity}}</p>
                    <p>上架时间：{{goodsInfos.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" @click="getGoodsDesc(id)" plain>图文介绍</mt-button>
                <mt-button type="danger" size="large" @click="getGoodsComments(id)" plain>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import numbox from './Numbox.vue';
    import mui from '../../lib/mui/js/mui.js';
    export default {
        data() {
            return {
                id: this.$route.params.id,
                goodsPhotos: [],
                goodsInfos: [],
                isShow: false
            }
        },
        updated() {
            mui(".mui-numbox").numbox();
            // 解决加减按钮点击无效的bug
        },
        created() {
            this.getGoodsPhotos();
            this.getGoodsInfos();
        },
        methods: {
            getGoodsPhotos() {
                this.$http.get('api/getthumimages/' + this.id).then(response => {
                    this.goodsPhotos = response.body.message;
                })
            },
            getGoodsInfos() {
                this.$http.get('api/goods/getinfo/' + this.id).then(response => {
                    this.goodsInfos = response.body.message[0];
                })
            },
            getGoodsDesc(id) {
                this.$router.push({ name: 'goods_desc', params: { id } })
            },
            getGoodsComments(id) {
                this.$router.push({ name: 'goods_comment', params: { id } })
            },
            showBall() {
                this.isShow = !this.isShow;
                goodsDetail = {
                    id: this.id,
                    price: this.goodsInfos.sell_price,
                    selected: true,
                    count: this.$store.state.newQuantity,
                    stock: this.goodsInfos.stock_quantity
                }
                this.$store.commit('addShopCar',goodsDetail);
            },
            beforeEnter(el) {
                el.style.transform = "translate(0, 0)";
            },
            enter(el, done) {
                const ballX = this.$refs.ball.getBoundingClientRect().left;
                const ballY = this.$refs.ball.getBoundingClientRect().top;
                const shopCarX = document.getElementById("badge").getBoundingClientRect().left;
                const shopCarY = document.getElementById("badge").getBoundingClientRect().top;
                const transX = shopCarX - ballX;
                const transY = shopCarY - ballY;
                el.offsetWidth;
                el.style.transform = `translate(${transX}px,${transY}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.75,.24,.86,.48)";
                done();
            },
            afterEnter(el) {
                this.isShow = !this.isShow;
            }
        },
        components: {
            numbox
        }
    }
</script>

<style scoped>
    .ball {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 151px;
    }

    .mint-swipe {
        height: 200px;
    }

    .mint-swipe-item {
        text-align: center;
    }

    .mint-swipe-items-wrap img {
        height: 100%;
    }

    .mui-card-content-inner .price small {
        text-decoration: line-through;
    }

    .mui-card-content-inner .price span:last-child {
        margin-left: 10px;
    }

    .mui-card-content-inner .price span:last-child strong {
        color: #df4637;
        font-weight: bold;
    }

    .mui-card-content-inner {
        color: #a2a2a6;
        font-size: 14px;
    }

    .mui-card-content-inner .number {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .mui-card-content-inner .btn {
        margin-bottom: 6px;
    }

    .mui-card-footer {
        display: flex;
        flex-wrap: wrap;
    }

    .mui-card-footer .mint-button {
        margin: 5px 0;
    }
</style>