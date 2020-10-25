<template>
    <div>
        <div class="goods_desc_content">
            <h3>{{goodsDescLists.title}}</h3>
            <hr>
            <div v-html="goodsDescLists.content" class="goods_desc"></div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                id: this.$route.params.id,
                goodsDescLists: []
            }
        },
        created() {
            this.getGoodsDesc();
        },
        updated() {
            $('.goods_desc').find('.gomeImgLoad').css({ 'width': '100%', 'height': '100%' });
            $('.goods_desc').find('td').css({ 'display': 'block' });
            $('.goods_desc').find('table').css({ 'width':'100%' });
        },
        methods: {
            getGoodsDesc() {
                this.$http.get('api/goods/getdesc/' + this.id).then(response => {
                    this.goodsDescLists = response.body.message[0];
                })
            }
        }
    }
</script>

<style scoped>
    .goods_desc_content h3 {
        text-align: center;
        font-size: 16px;
        color: #2b90dd;
        margin: 15px 0;
    }

    .goods_desc {
        padding: 5px;
    }
</style>