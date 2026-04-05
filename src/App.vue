<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <el-header class="app-header">
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
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 主体内容区域 -->
    <el-container class="app-body">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  House, Edit, Document, Time, Bell, Check, Upload, 
  DataAnalysis, Setting, ArrowDown
} from '@element-plus/icons-vue'

// 用户角色
const userRole = ref('企业') // 可切换为 '市级' 或 '省级'

// 退出登录
const logout = () => {
  alert('已退出登录')
}
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