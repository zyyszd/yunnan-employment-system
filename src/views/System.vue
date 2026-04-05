<template>
  <div class="content-section">
    <h2>系统管理</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="用户管理" name="user">
        <el-button type="primary" @click="addUser">新增用户</el-button>
        <el-button @click="importUsers">批量导入</el-button>
        <el-table :data="userList" style="width: 100%" class="mt-20">
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="role" label="角色" />
          <el-table-column prop="company" label="所属企业" />
          <el-table-column prop="status" label="状态" />
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
              <el-button type="success" size="small" @click="resetPassword(scope.row)">重置密码</el-button>
              <el-button type="danger" size="small" @click="disableUser(scope.row)">{{ scope.row.status === '正常' ? '禁用' : '启用' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="周期配置" name="period">
        <el-form :model="periodConfig" label-width="150px" class="period-form">
          <el-form-item label="半月度开关">
            <el-switch v-model="periodConfig.halfMonthEnabled" />
          </el-form-item>
          <el-form-item label="上报截止时间">
            <el-input v-model="periodConfig.deadline" placeholder="例如：24:00" />
          </el-form-item>
          <el-form-item label="提醒提前天数">
            <el-input v-model="periodConfig.remindDays" type="number" min="1" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="savePeriodConfig">保存配置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="系统监控" name="monitor">
        <el-card class="monitor-card">
          <template #header>
            <div class="card-header">
              <span>系统状态</span>
            </div>
          </template>
          <div class="monitor-stats">
            <el-statistic title="在线用户数" :value="23" />
            <el-statistic title="今日登录次数" :value="156" />
            <el-statistic title="数据上报量" :value="45" />
            <el-statistic title="系统运行时间" value="720" suffix="小时" />
          </div>
        </el-card>
        <el-card class="monitor-card mt-20">
          <template #header>
            <div class="card-header">
              <span>操作日志</span>
            </div>
          </template>
          <el-table :data="logList" style="width: 100%">
            <el-table-column prop="user" label="操作人" />
            <el-table-column prop="action" label="操作" />
            <el-table-column prop="time" label="操作时间" />
            <el-table-column prop="ip" label="IP地址" />
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活的标签
const activeTab = ref('user')

// 用户列表
const userList = ref([
  {
    id: 1,
    username: 'admin',
    role: '省级管理员',
    company: '-',
    status: '正常'
  },
  {
    id: 2,
    username: 'kunming',
    role: '市级管理员',
    company: '昆明市人社局',
    status: '正常'
  },
  {
    id: 3,
    username: 'enterprise1',
    role: '企业用户',
    company: '云南某企业',
    status: '正常'
  },
  {
    id: 4,
    username: 'enterprise2',
    role: '企业用户',
    company: '昆明某公司',
    status: '正常'
  }
])

// 周期配置
const periodConfig = ref({
  halfMonthEnabled: true,
  deadline: '24:00',
  remindDays: 3
})

// 操作日志
const logList = ref([
  {
    id: 1,
    user: 'admin',
    action: '登录系统',
    time: '2026-04-05 10:00:00',
    ip: '192.168.1.1'
  },
  {
    id: 2,
    user: 'enterprise1',
    action: '提交月度数据',
    time: '2026-04-05 09:30:00',
    ip: '192.168.1.2'
  },
  {
    id: 3,
    user: 'kunming',
    action: '审核企业数据',
    time: '2026-04-04 16:20:00',
    ip: '192.168.1.3'
  }
])

// 新增用户
const addUser = () => {
  alert('新增用户')
}

// 批量导入
const importUsers = () => {
  alert('批量导入用户')
}

// 编辑用户
const editUser = (row: any) => {
  alert(`编辑用户：${row.username}`)
}

// 重置密码
const resetPassword = (row: any) => {
  alert(`重置 ${row.username} 的密码`)
}

// 禁用/启用用户
const disableUser = (row: any) => {
  alert(`${row.username} 已${row.status === '正常' ? '禁用' : '启用'}`)
}

// 保存周期配置
const savePeriodConfig = () => {
  alert('周期配置已保存')
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

.mt-20 {
  margin-top: 20px;
}

.period-form {
  max-width: 600px;
}

.monitor-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.monitor-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
</style>