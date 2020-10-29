<template>
    <div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="shopcar" v-for="(item,index) in shopCarGoods">
                        <mt-switch v-model="item.selected" @change="turn(item.id,index)"></mt-switch>
                        <div class="shopcar_photos">
                            <img :src="item.thumb_path">
                        </div>
                        <div class="shopcar_details">
                            <h3>{{item.title}}</h3>
                            <div class="shopcar_price">
                                <span>￥{{item.sell_price}}</span>
                                <shopCarNumbox :maxValue="item.stock" :number="item.cou" :id="item.id"></shopCarNumbox>
                                <span @click="delGoods(item.id,index)">删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="settlement">
                        <p>总计 ( 不含运费 ) </p>
                        <div class="settlement_button">
                            <span>已勾选商品<strong> {{this.$store.state.sumNum}}
                                </strong>件,总价:<strong>￥{{this.$store.state.sumPrice}}</strong></span>
                            <mt-button type="danger">去结算</mt-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import shopCarNumbox from './GoodsList/ShopCarNumberBox.vue';
    import mui from '../lib/mui/js/mui.js';
    export default {
        data() {
            return {
                ids: [],
                shopCarGoods: []
            }
        },
        updated() {
            mui(".mui-numbox").numbox();
            // 解决加减按钮点击无效的bug
            this.$store.commit("getGoodsPrice");
        },
        created() {
            this.getShopCarGoodsInfo();
            this.getShopCarGoods();
            this.$store.commit("getGoodsPrice");
        },
        methods: {
            getShopCarGoods() {
                var infos = JSON.parse(localStorage.getItem('data')) || [];
                if (this.ids.length != 0) {
                    this.$http.get('api/goods/getshopcarlist/' + this.ids).then(response => {
                        this.shopCarGoods = response.body.message;
                        //将获取的数据的cou值替换为商品加入购物车的count
                        this.shopCarGoods.forEach(item => {
                            infos.forEach(i => {
                                if (item.id == i.id) {
                                    item.cou = i.count;
                                    item.stock = i.stock;
                                    item.selected = i.selected;
                                }
                            })
                        })
                    })
                }
            },
            getShopCarGoodsInfo() {
                var infos = JSON.parse(localStorage.getItem('data')) || [];
                infos.forEach(item => {
                    this.ids.push(item.id);
                })
            },
            turn(id, index) {
                var infos = JSON.parse(localStorage.getItem('data')) || [];
                infos.some(item => {
                    if (id == item.id) {
                        item.selected = this.shopCarGoods[index].selected;
                    }
                })
                localStorage.setItem('data', JSON.stringify(infos));
                this.$store.commit("getGoodsPrice");
            },
            delGoods(id,index) {
                this.$store.commit("delGoods", id);
                this.shopCarGoods.some(item => {
                    if(item.id == id){
                        this.shopCarGoods.splice(index,1);
                    }
                })
            }
        },
        components: {
            shopCarNumbox
        }
    }
</script>

<style scoped>
    .shopcar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .shopcar h3 {
        font-size: 14px;
        line-height: 20px;
    }

    .mui-numbox {
        height: 25px;
    }

    .shopcar_price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }

    .shopcar_price span:first-child {
        color: #df0000;
        font-weight: bold;
    }

    .shopcar_price span:last-child {
        color: #68aae3;
        font-size: 14px;
        font-weight: bold;
    }

    .settlement_button {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .settlement p {
        font-size: 14px;
    }

    .settlement_button strong {
        font-size: 18px;
        color: #eb0705;
    }

    .shopcar_photos img {
        width: 50px;
        height: 50px;
    }

    .shopcar_details {
        width: 230px;
        height: 80px;
    }
</style>