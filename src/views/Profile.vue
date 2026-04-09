<template>
  <div class="content-section">
    <h2>个人中心</h2>
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>账号信息</span>
        </div>
      </template>
      <el-form :model="userInfo" label-width="120px" class="profile-form">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" disabled />
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="userInfo.role" @change="changeRole">
            <el-option label="企业用户" value="企业" />
            <el-option label="市级管理员" value="市级" />
            <el-option label="省级管理员" value="省级" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属企业">
          <el-input v-model="userInfo.company" disabled />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="userInfo.phone" disabled />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="userInfo.email" disabled />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProfile">保存修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 用户信息
const userInfo = ref({
  username: 'enterprise1',
  role: '企业',
  company: '云南某企业',
  phone: '13800138000',
  email: 'contact@example.com'
})

// 切换角色
const changeRole = () => {
  // 保存角色到本地存储
  localStorage.setItem('userRole', userInfo.value.role)
  // 提示角色已切换
  alert(`角色已切换为：${userInfo.value.role}`)
  // 刷新页面以更新菜单
  window.location.reload()
}

// 保存修改
const saveProfile = () => {
  alert('个人信息已保存')
}

// 重置表单
const resetForm = () => {
  userInfo.value = {
    username: 'enterprise1',
    role: '企业',
    company: '云南某企业',
    phone: '13800138000',
    email: 'contact@example.com'
  }
}

// 初始化
onMounted(() => {
  // 可以从本地存储或API获取用户信息
  const savedRole = localStorage.getItem('userRole')
  if (savedRole) {
    userInfo.value.role = savedRole
  }
})
</script>

<style scoped>
.content-section {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  margin-bottom: 20px;
}

.content-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
}

.profile-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-form {
  max-width: 600px;
}
</style>