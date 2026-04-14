<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h2>云南省企业就业失业数据采集系统</h2>
        </div>
      </template>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" style="width: 100%;" @click="handleLogin" :loading="loading">
            登录
          </el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const loginFormRef = ref()
const loading = ref(false)

const loginForm = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true

      // 模拟登录验证
      setTimeout(() => {
        if (loginForm.value.username === 'enterprise1' && loginForm.value.password === '123456') {
          localStorage.setItem('userRole', '企业')
          localStorage.setItem('username', loginForm.value.username)
          ElMessage.success('登录成功')
          // 跳转到首页并强制重新加载
          window.location.href = '/home'
        } else if (loginForm.value.username === 'city1' && loginForm.value.password === '123456') {
          localStorage.setItem('userRole', '市级')
          localStorage.setItem('username', loginForm.value.username)
          ElMessage.success('登录成功')
          // 跳转到首页并强制重新加载
          window.location.href = '/home'
        } else if (loginForm.value.username === 'province1' && loginForm.value.password === '123456') {
          localStorage.setItem('userRole', '省级')
          localStorage.setItem('username', loginForm.value.username)
          ElMessage.success('登录成功')
          // 跳转到首页并强制重新加载
          window.location.href = '/home'
        } else {
          ElMessage.error('用户名或密码错误')
        }
        loading.value = false
      }, 500)
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.card-header h2 {
  text-align: center;
  margin: 0;
  color: #333;
  font-size: 20px;
}

.login-form {
  padding: 20px 0;
}


</style>