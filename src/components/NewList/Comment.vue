<template>
    <div>
        <div class="comment_content">
            <h4>发表评论</h4>
            <hr>
            <textarea placeholder="请输入您要发表的评论" v-model="mycomment"></textarea>
            <mt-button type="primary" size="large" @click="setComment">发表评论</mt-button>
            <div class="content" v-for="(item,index) in comments">
                <div class="title">
                    <p>第{{index+1}}楼&nbsp;用户:&nbsp;{{item.user_name}}&nbsp;发表时间:&nbsp;{{item.add_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}
                    </p>
                </div>
                <div class="text">
                    <span>{{item.content}}</span>
                </div>
            </div>
            <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "comment",
        data() {
            return {
                id: this.$route.params.id,
                pageindex: 1,
                comments: [],
                mycomment: ""
            }
        },
        created() {
            this.getComment();
        },
        methods: {
            getComment() {
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then((response) => {
                    this.comments = this.comments.concat(response.body.message);
                })
            },
            getMore() {
                this.pageindex++;
                this.getComment();
            },
            setComment() {
                this.$http.post('api/postcomment/' + this.id, { content: this.mycomment }).then((response) => {
                    Toast({ message: "评论发送成功!", duration: 1500 })
                    this.comments.unshift({ add_time: Date(), content: this.mycomment, user_name: "匿名用户" });
                }, (err) => {
                    Toast("评论发送失败！请稍后再试...");
                })
            }
        }
    }
</script>

<style scoped>
    .comment_content {
        padding: 0 8px;
        margin-top: 5px;
    }

    .comment_content h4 {
        font-size: 18px;
    }

    .comment_content textarea {
        height: 100px;
        margin-bottom: 5px;
    }

    .comment_content .content {
        margin-bottom: 5px;
    }

    .comment_content .content .title {
        background-color: #cecad0;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
    }

    .comment_content .content .title p {
        color: black;
        margin-bottom: 0px;
        padding-left: 5px;
    }

    .comment_content .content .text {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-indent: 2rem;
    }

    .mint-button {
        margin-bottom: 8px;
    }
</style>