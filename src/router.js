import VueRouter from 'vue-router';

import home from './components/HomeContenter.vue';
import member from './components/MemberContenter.vue';
import shopcar from './components/ShopcarContenter.vue';
import search from './components/SearchContenter.vue';
import newlist from './components/NewList/NewList.vue';
import newlist_details from './components/NewList/NewList_details.vue'

var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        { path: '/member', component: member },
        { path: '/shopcar', component: shopcar },
        { path: '/search', component: search },
        { path: '/home/newlist', component: newlist },
        { path: '/home/newlist/:newid', component: newlist_details }
    ],
    linkActiveClass: 'mui-active'
})

export default router;