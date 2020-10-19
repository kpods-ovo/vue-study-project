<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newLists" :key="item.id">
                <router-link :to="'/home/newlist/'+ item.id">
                    <img class="mui-media-object mui-pull-left" :src=item.img_url>
                    <div class="mui-media-body">
                        <h4>{{item.title}}</h4>
                        <div>
                            <span>{{item.add_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                            <span>点击: {{item.click}}次</span>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newLists: []
            }
        },
        created() {
            this.getNewLists();
        },
        methods: {
            getNewLists() {
                this.$http.get('api/getnewslist').then((response) => {
                    this.newLists = response.body.message;
                },(err)=>{
                    console.log('请求失败desune!');
                })
            }
        }
    }
</script>

<style scoped>
    .mui-media-body h4 {
        font-size: 16px;
    }

    .mui-media-body span {
        font-size: 13px;
        color: #3590db;
    }

    .mui-media-body div {
        display: flex;
        justify-content: space-between;
    }
</style>