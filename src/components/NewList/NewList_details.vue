<template>
    <div>
        <div class="newlist_contents" v-if="details[0]">
            <h4>{{details[0].title}}</h4>
            <div class="newlist_time">
                <span>发表时间: {{details[0].add_time}}</span>
                <span>点击{{details[0].click}}次</span>
            </div>
            <hr>
            <div v-html="details[0].content"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.newid,
                details: []
            }
        },
        created() {
            this.getNewListDetails();
        },
        methods: {
            getNewListDetails() {
                this.$http.get('api/getnew/' + this.id).then((response) => {
                    this.details = response.body.message;
                }, (err) => {
                    console.log('请求失败desune!');
                })
            }
        }
    }
</script>

<style scoped>
    .newlist_contents {
        padding: 0 8px;
        margin-top: 15px;
    }

    .newlist_contents h4 {
        font-size: 16px;
        color: rgba(255, 0, 0, 0.767);
        text-align: center;
    }
    .newlist_time{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #3590db;
        margin-top: 15px;
    }
</style>