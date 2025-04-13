import { createWebHistory } from 'vue-router'

// 路由配置
const options = {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:catchAll(.*)',
            name: '404',
            component: () => import('../pages/exception/404.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../pages/login/Login.vue')
        },
        {
            path: '/',
            name: '首页',
            redirect: '/dashboard/workplace',
            component: () => import('../layouts/tabs/TabsView.vue'),
            children: [
                {
                    path: 'dashboard',
                    name: '控制台',
                    component: () => import('../layouts/tabs/BlankView.vue'),
                    children: [
                        {
                            path: 'workplace',
                            name: '工作台',
                            meta: {
                                page: {
                                    closable: true
                                }
                            },
                            component: () => import('../views/dashboard/workspace/Workspace.vue'),
                        },
                    ]
                },
                {
                    path: '/rules',
                    name: '规则管理',
                    component: () => import('../views/RulesView.vue'),
                },
                {
                    path: '/test',
                    name: '规则测试',
                    component: () => import('../views/TestView.vue'),
                },
                {
                    path: '/stats',
                    name: '统计分析',
                    component: () => import('../views/StatsView.vue'),
                },
                {
                    path: '/connections',
                    name: '数据连接',
                    component: () => import('../views/ConnectionsView.vue'),
                },
                {
                    path: '/settings',
                    name: '系统设置',
                    component: () => import('../views/SettingsView.vue'),
                },
                {
                    path: '/about',
                    name: 'about',
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import('../views/AboutView.vue'),
                },
            ]
        },
    ],
}

export default options
