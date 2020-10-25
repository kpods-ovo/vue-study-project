import VueRouter from 'vue-router';

import home from './components/HomeContenter.vue';
import member from './components/MemberContenter.vue';
import shopcar from './components/ShopcarContenter.vue';
import search from './components/SearchContenter.vue';
import newlist from './components/NewList/NewList.vue';
import newlist_details from './components/NewList/NewList_details.vue';
import photos from './components/PhotosShare/Photos.vue';
import photos_details from './components/PhotosShare/Photos_details.vue';
import goods from './components/GoodsList/GoodsList.vue';
import goods_details from './components/GoodsList/Goods_details.vue';
import goods_desc from './components/GoodsList/Goods_desc.vue';
import goods_comment from './components/GoodsList/GoodsComment.vue';

var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        { path: '/member', component: member },
        { path: '/shopcar', component: shopcar },
        { path: '/search', component: search },
        { path: '/home/newlist', component: newlist },
        { path: '/home/newlist/:id', component: newlist_details },
        { path: '/home/photos', component: photos },
        { path: '/home/photos/:id', component: photos_details },
        { path: '/home/goods', component: goods },
        { path: '/home/goods/:id', component: goods_details, name: 'goods_details' },
        { path: '/home/goods/goods_desc/:id', component: goods_desc, name: 'goods_desc' },
        { path: '/home/goods/goods_comment/:id', component: goods_comment, name: 'goods_comment' }
    ],
    linkActiveClass: 'mui-active'
})

export default router;