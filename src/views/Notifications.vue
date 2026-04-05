<template>
  <div class="content-section">
    <h2>通知中心</h2>
    <el-card v-for="notification in notifications" :key="notification.id" class="notification-card">
      <div class="notification-header">
        <h3>{{ notification.title }}</h3>
        <span class="notification-time">{{ notification.time }}</span>
      </div>
      <div class="notification-content">{{ notification.content }}</div>
      <div class="notification-footer">
        <el-button type="text" @click="markAsRead(notification.id)">标记为已读</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
  },
  {
    id: 3,
    title: '审核结果通知',
    content: '您提交的2026年3月月度数据已通过市级审核，请等待省级终审。',
    time: '2026-04-01'
  },
  {
    id: 4,
    title: '半月度上报提醒',
    content: '2026年4月上半月数据上报截止时间为4月15日，请及时完成上报。',
    time: '2026-04-12'
  }
])

// 标记为已读
const markAsRead = (id: number) => {
  alert(`通知 ${id} 已标记为已读`)
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

.notification-card {
  margin-bottom: 10px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.notification-header h3 {
  margin: 0;
  font-size: 16px;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.notification-content {
  margin-bottom: 10px;
  line-height: 1.5;
}
</style>