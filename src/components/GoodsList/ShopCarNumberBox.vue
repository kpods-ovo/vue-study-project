<template>
    <div class="numbox_content">
        <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='maxValue'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="number" @change="newNumber($event)" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js';
    export default {
        name: "shopCarNumbox",
        data() {
            return {

            }
        },
        methods: {
            newNumber(event) {
                this.$store.state.newQuantity = parseInt(event.currentTarget.value);
                this.$store.commit("changeNum", {
                    id: this.id,
                    count: this.$store.state.newQuantity
                });
                this.$store.commit("getGoodsPrice");
            }
        },
        props: ['maxValue', 'number', 'id'],
        watch: {
            maxValue(newValue, oldValue) {
                mui(".mui-numbox").numbox().setOption('max', newValue)
            }
        }
    }
</script>

<style>
    .numbox_content {
        display: inline-block;
    }
</style>