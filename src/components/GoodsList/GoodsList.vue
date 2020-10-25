<template>
    <div class="goods-list">
        <div class="goods" v-for="(item,index) in goodsList" @click="getGoodsDetails(item.id)">
            <img :src="item.img_url" alt="" @error="imgError(index)">
            <h3>{{item.title}}</h3>
            <div class="graytext">
                <section class="price">
                    <span>￥{{item.sell_price}}</span>
                    <span>￥{{item.market_price}}</span>
                </section>
                <section class="tips">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </section>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageindex: 1,
                goodsList: []
            }
        },
        created() {
            this.getGoods();
        },
        methods: {
            getGoods() {
                this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(response => {
                    this.goodsList = this.goodsList.concat(response.body.message);
                }, err => {
                    console.log("获取数据失败!");
                })
            },
            getMore() {
                this.pageindex++;
                this.getGoods();
            },
            imgError(index) {
                this.goodsList.splice(index, 1)
            },
            getGoodsDetails(id) {
                this.$router.push({ name: 'goods_details', params: { id } })
            }
        }
    }
</script>

<style scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 12px;
        justify-content: space-between;
    }

    .goods {
        width: 49%;
        border: 1px solid #999;
        box-shadow: 0 0 3px #999;
        margin-bottom: 10px;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .goods img {
        width: 100%;
    }

    .goods h3 {
        font-size: 15px;
        line-height: 18px;
    }

    .goods .graytext {
        width: 100%;
        background-color: #eeecef;
        padding: 5px 6px 8px;
    }

    .goods .graytext .price span:first-child {
        font-size: 16px;
        font-weight: bold;
        color: #e41401;
    }

    .goods .graytext .price span:last-child {
        font-size: 12px;
        color: #9d9c9e;
        text-decoration: line-through;
        margin-left: 6px;
    }

    .goods .graytext .tips {
        display: flex;
        justify-content: space-between;
    }

    .goods .graytext .tips span {
        font-size: 12px;
        color: #9d9c9e;
    }
</style>