import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { title: '企业备案' }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue'),
    meta: { title: '数据填报' }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: { title: '历史查询' }
  },
  {
    path: '/audit',
    name: 'Audit',
    component: () => import('../views/Audit.vue'),
    meta: { title: '数据审核' }
  },
  {
    path: '/register-audit',
    name: 'RegisterAudit',
    component: () => import('../views/RegisterAudit.vue'),
    meta: { title: '企业备案审核' }
  },
  {
    path: '/final-audit',
    name: 'FinalAudit',
    component: () => import('../views/FinalAudit.vue'),
    meta: { title: '数据终审' }
  },
  {
    path: '/national-report',
    name: 'NationalReport',
    component: () => import('../views/NationalReport.vue'),
    meta: { title: '国家上报' }
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('../views/Analysis.vue'),
    meta: { title: '数据分析' }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/Notifications.vue'),
    meta: { title: '通知中心' }
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import('../views/Password.vue'),
    meta: { title: '修改密码' }
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../views/System.vue'),
    meta: { title: '系统管理' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router