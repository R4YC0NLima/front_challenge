import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/layouts/Default.vue'
import Home from '@/pages/Home.vue'

const routes = [
    {
        path: '/', component: LayoutDefault,
        children: [
            { path: '', name: 'index', component: Home },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router