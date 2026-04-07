<template>
  <div class="content-section">
    <h2>修改密码</h2>
    <el-form :model="passwordForm" label-width="120px" class="password-form">
      <el-form-item label="原密码" required>
        <el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入原密码" />
      </el-form-item>
      <el-form-item label="新密码" required>
        <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" required>
        <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请再次输入新密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPasswordChange">提交修改</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 密码修改表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 提交密码修改
const submitPasswordChange = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('两次输入的新密码不一致，请重新输入')
    return
  }
  alert('密码修改成功')
}

// 重置表单
const resetForm = () => {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}
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

.password-form {
  max-width: 600px;
}
</style>