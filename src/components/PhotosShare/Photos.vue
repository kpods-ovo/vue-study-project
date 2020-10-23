<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="'mui-control-item '+(item.id==0?'mui-active':'')" href="#item1mobile"
                        data-wid="tab-top-subpage-1.html" v-for="(item,index) in photosList" :key="item.id"
                        @click="getImagesList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图片展示区域 -->
        <ul class="photos-list">
            <li v-for="item in ImagesList" :key="item.id">
                <router-link :to="'/home/photos/' +item.id">
                    <img v-lazy="item.img_url">
                    <div class="text">
                        <h5>{{item.title}}</h5>
                        <p v-html="item.content"></p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import { Lazyload } from 'mint-ui';
    import mui from '../../lib/mui/js/mui.js';
    export default {
        data() {
            return {
                photosList: [{ title: '全部', id: 0 }],
                ImagesList: []
            }
        },
        created() {
            this.getPhotosList();
            this.getImagesList(0);
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getPhotosList() {
                this.$http.get('api/getimgcategory').then(response => {
                    this.photosList = this.photosList.concat(response.body.message);
                }, (err => {
                    Toast("数据获取失败！请稍后再试...");
                }))
            },
            getImagesList(cateid) {
                this.$http.get('api/getimages/' + cateid).then(response => {
                    this.ImagesList = response.body.message;
                }, err => {
                    Toast("获取图片数据失败!")
                })
            }
        }
    }
</script>

<style scoped>
    .mui-scroll {
        touch-action: none;
    }

    .photos-list li image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

    .photos-list {
        padding: 10px;
        margin: 0;
        padding-bottom: 0;
    }

    .photos-list li {
        list-style: none;
        margin-bottom: 10px;
        position: relative;
    }

    .photos-list li img {
        vertical-align: middle;
        box-shadow: 0 0 6px rgb(102, 102, 102);
        width: 100%;
    }

    .photos-list .text {
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        max-height: 84px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .photos-list .text h5 {
        font-weight: 550;
        font-size: 15px;
        color: #fff;
    }

    .photos-list li .text p {
        font-size: 14px;
        margin-bottom: 0;
        color: #fff !important;
    }
</style>