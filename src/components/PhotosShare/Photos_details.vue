<template>
    <div>
        <div class="images_info" v-for="item in imagesList">
            <h1>{{item.title}}</h1>
            <div class="article_time">
                <span>发表时间: {{item.add_time | dateFormat}}</span>
                <span>点击: {{item.click}}次</span>
            </div>
            <hr>
            <div class="thumbs">
                <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
            </div>
            <div class="article_details" v-html="item.content"></div>
        </div>
        <comment></comment>
    </div>
</template>

<script>
    import comment from '../NewList/Comment.vue';
    export default {
        data() {
            return {
                id: this.$route.params.id,
                imagesList: [],
                slide1: []
            }
        },
        created() {
            this.getImagesDetails();
            this.getThumbnail();
        },
        methods: {
            getImagesDetails() {
                this.$http.get('api/getimageInfo/' + this.id).then(response => {
                    this.imagesList = response.body.message;
                })
            },
            getThumbnail() {
                this.$http.get('api/getthumimages/' + this.id).then(response => {
                    this.slide1 = response.body.message;
                    this.slide1.forEach((item) => {
                        item.msrc = item.src;
                        item.w = 600;
                        item.h = 400;
                    })
                })
            },
            handleClose() {
                
            }
        },
        components: {
            comment
        }
    }
</script>

<style>
    .images_info {
        padding: 8px;
    }

    .images_info h1 {
        font-size: 16px;
        color: rgb(101, 186, 255);
        text-align: center;
        margin-top: 15px;
        margin-bottom: 18px;
    }

    .images_info .article_time {
        display: flex;
        justify-content: space-between;
    }

    .images_info .article_time span {
        font-size: 13px;
        color: #a9a9a9;
    }

    .images_info .article_details {
        font-size: 14px;
        line-height: 30px;
    }
    .thumbs .my-gallery{
        display: flex;
        flex-wrap: wrap;
    }
    .thumbs .my-gallery figure{
        margin: 6px;
    }
    .thumbs img{
        width: 120px;
        height: 80px;
    }
</style>