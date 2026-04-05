<template>
  <div class="content-section">
    <h2>欢迎使用云南省企业就业失业数据采集系统</h2>
    <el-card class="welcome-card">
      <div class="welcome-content">
        <el-icon class="welcome-icon"><house /></el-icon>
        <div class="welcome-text">
          <h3>{{ userRole }}用户，您好！</h3>
          <p>当前日期：{{ currentDate }}</p>
          <p v-if="userRole === '企业'">
            您可以在此系统中完成企业备案、数据填报等操作。
          </p>
          <p v-else-if="userRole === '市级'">
            您可以在此系统中审核企业数据、发布通知等操作。
          </p>
          <p v-else-if="userRole === '省级'">
            您可以在此系统中审核企业备案、进行数据终审、上报国家等操作。
          </p>
        </div>
      </div>
      <div class="welcome-stats">
        <el-statistic title="待办事项" :value="todoCount" />
        <el-statistic title="已完成" :value="completedCount" />
        <el-statistic title="通知数量" :value="notifications.length" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { House } from '@element-plus/icons-vue'

// 用户角色
const userRole = ref('企业') // 可切换为 '市级' 或 '省级'

// 当前日期
const currentDate = ref('')

// 待办事项统计
const todoCount = ref(5)
const completedCount = ref(12)

// 通知列表
const notifications = ref([
  {
    id: 1,
    title: '上报提醒',
    content: '2026年4月月度数据上报截止时间为4月30日，请及时完成上报。',
    time: '2026-04-27'
  },
  {
    id: 2,
    title: '系统通知',
    content: '系统将于2026年5月1日进行维护升级，届时系统将暂时无法访问。',
    time: '2026-04-25'
  }
])

// 初始化
onMounted(() => {
  // 设置当前日期
  const now = new Date()
  currentDate.value = now.toLocaleDateString()
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

.welcome-card {
  margin-top: 20px;
}

.welcome-content {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.welcome-icon {
  font-size: 64px;
  color: #1890ff;
  margin-right: 30px;
}

.welcome-text h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.welcome-text p {
  margin: 5px 0;
  color: #666;
}

.welcome-stats {
  display: flex;
  justify-content: space-around;
}
</style>