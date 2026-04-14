import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { title: '企业备案', requiresAuth: true }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue'),
    meta: { title: '数据填报', requiresAuth: true }
  },
  {
    path: '/data-view',
    name: 'DataView',
    component: () => import('../views/DataView.vue'),
    meta: { title: '数据查看', requiresAuth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: { title: '历史查询', requiresAuth: true }
  },
  {
    path: '/audit',
    name: 'Audit',
    component: () => import('../views/Audit.vue'),
    meta: { title: '数据审核', requiresAuth: true }
  },
  {
    path: '/register-audit',
    name: 'RegisterAudit',
    component: () => import('../views/RegisterAudit.vue'),
    meta: { title: '企业备案审核', requiresAuth: true }
  },
  {
    path: '/final-audit',
    name: 'FinalAudit',
    component: () => import('../views/FinalAudit.vue'),
    meta: { title: '数据终审', requiresAuth: true }
  },
  {
    path: '/national-report',
    name: 'NationalReport',
    component: () => import('../views/NationalReport.vue'),
    meta: { title: '国家上报', requiresAuth: true }
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('../views/Analysis.vue'),
    meta: { title: '数据分析', requiresAuth: true }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/Notifications.vue'),
    meta: { title: '通知中心', requiresAuth: true }
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import('../views/Password.vue'),
    meta: { title: '修改密码', requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { title: '个人中心', requiresAuth: true }
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../views/System.vue'),
    meta: { title: '系统管理', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('userRole')

  // 如果用户已登录
  if (isLoggedIn) {
    // 如果访问登录页面，重定向到首页
    if (to.path === '/login') {
      next('/home')
    } else {
      next()
    }
  } else {
    // 如果用户未登录，访问需要认证的页面则重定向到登录页
    if (to.meta.requiresAuth) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router