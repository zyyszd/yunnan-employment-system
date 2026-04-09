<template>
  <div class="app-container">
    <!-- 顶部导航栏 - 仅非登录页面显示 -->
    <el-header v-if="!isLoginPage" class="app-header">
      <div class="header-left">
        <h1>云南省企业就业失业数据采集系统</h1>
      </div>
      <div class="header-right">
        <el-dropdown>
          <span class="user-info">
            {{ userRole }}用户
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><router-link to="/profile">个人中心</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/password">修改密码</router-link></el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 主体内容区域 - 仅非登录页面显示侧栏 -->
    <el-container v-if="!isLoginPage" class="app-body">
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" class="app-sidebar">
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          router
        >
          <!-- 企业用户菜单 -->
          <template v-if="userRole === '企业'">
            <el-menu-item index="/home">
              <el-icon><house /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-icon><edit /></el-icon>
              <span>企业备案</span>
            </el-menu-item>
            <el-menu-item index="/report">
              <el-icon><document /></el-icon>
              <span>数据填报</span>
            </el-menu-item>
            <el-menu-item index="/history">
              <el-icon><time /></el-icon>
              <span>历史查询</span>
            </el-menu-item>
            <el-menu-item index="/notifications">
              <el-icon><bell /></el-icon>
              <span>通知中心</span>
            </el-menu-item>
            <el-menu-item index="/profile">
              <el-icon><user /></el-icon>
              <span>个人中心</span>
            </el-menu-item>
            <el-menu-item index="/password">
              <el-icon><edit /></el-icon>
              <span>修改密码</span>
            </el-menu-item>
          </template>

          <!-- 市级用户菜单 -->
          <template v-else-if="userRole === '市级'">
            <el-menu-item index="/home">
              <el-icon><house /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/audit">
              <el-icon><check /></el-icon>
              <span>数据审核</span>
            </el-menu-item>
            <el-menu-item index="/report">
              <el-icon><document /></el-icon>
              <span>数据查看</span>
            </el-menu-item>
            <el-menu-item index="/notifications">
              <el-icon><bell /></el-icon>
              <span>通知管理</span>
            </el-menu-item>
            <el-menu-item index="/profile">
              <el-icon><user /></el-icon>
              <span>个人中心</span>
            </el-menu-item>
            <el-menu-item index="/password">
              <el-icon><edit /></el-icon>
              <span>修改密码</span>
            </el-menu-item>
          </template>

          <!-- 省级用户菜单 -->
          <template v-else-if="userRole === '省级'">
            <el-menu-item index="/home">
              <el-icon><house /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/register-audit">
              <el-icon><edit /></el-icon>
              <span>企业备案审核</span>
            </el-menu-item>
            <el-menu-item index="/final-audit">
              <el-icon><check /></el-icon>
              <span>数据终审</span>
            </el-menu-item>
            <el-menu-item index="/national-report">
              <el-icon><upload /></el-icon>
              <span>国家上报</span>
            </el-menu-item>
            <el-menu-item index="/analysis">
              <el-icon><data-analysis /></el-icon>
              <span>数据分析</span>
            </el-menu-item>
            <el-menu-item index="/notifications">
              <el-icon><bell /></el-icon>
              <span>通知管理</span>
            </el-menu-item>
            <el-menu-item index="/system">
              <el-icon><setting /></el-icon>
              <span>系统管理</span>
            </el-menu-item>
            <el-menu-item index="/profile">
              <el-icon><user /></el-icon>
              <span>个人中心</span>
            </el-menu-item>
            <el-menu-item index="/password">
              <el-icon><edit /></el-icon>
              <span>修改密码</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <!-- 右侧内容区域 -->
      <el-main class="app-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>

    <!-- 登录页面直接显示内容，不使用布局 -->
    <router-view v-if="isLoginPage" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  House, Edit, Document, Time, Bell, Check, Upload,
  DataAnalysis, Setting, ArrowDown, User
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 判断是否是登录页面
const isLoginPage = computed(() => route.path === '/login')

// 用户角色 - 使用计算属性实时读取localStorage
const userRole = computed(() => {
  return localStorage.getItem('userRole') || ''
})

// 退出登录
const logout = () => {
  // 清除localStorage
  localStorage.removeItem('userRole')
  localStorage.removeItem('username')
  // 使用window.location.replace强制跳转到登录页，并替换历史记录
  window.location.replace('/login')
}

// 初始化
onMounted(() => {
  // 不再自动设置默认角色，让用户必须登录
})
</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  height: 60px;
  background-color: #1890ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-left h1 {
  font-size: 18px;
  margin: 0;
}

.user-info {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.app-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.app-sidebar {
  background-color: #f0f2f5;
  border-right: 1px solid #e8e8e8;
}

.sidebar-menu {
  height: 100%;
  border-right: none;
}

.app-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>