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

    <el-card class="quick-actions" v-if="userRole === '企业'">
      <template #header>
        <div class="card-title">快捷操作</div>
      </template>
      <div class="action-grid">
        <div class="action-item" @click="$router.push('/register')">
          <el-icon><edit /></el-icon>
          <span>企业备案</span>
        </div>
        <div class="action-item" @click="$router.push('/report')">
          <el-icon><document /></el-icon>
          <span>数据填报</span>
        </div>
        <div class="action-item" @click="$router.push('/history')">
          <el-icon><time /></el-icon>
          <span>历史查询</span>
        </div>
        <div class="action-item" @click="$router.push('/notifications')">
          <el-icon><bell /></el-icon>
          <span>通知中心</span>
        </div>
      </div>
    </el-card>

    <el-card class="quick-actions" v-else-if="userRole === '市级'">
      <template #header>
        <div class="card-title">快捷操作</div>
      </template>
      <div class="action-grid">
        <div class="action-item" @click="$router.push('/audit')">
          <el-icon><check /></el-icon>
          <span>数据审核</span>
        </div>
        <div class="action-item" @click="$router.push('/report')">
          <el-icon><document /></el-icon>
          <span>数据查看</span>
        </div>
        <div class="action-item" @click="$router.push('/notifications')">
          <el-icon><bell /></el-icon>
          <span>通知管理</span>
        </div>
      </div>
    </el-card>

    <el-card class="quick-actions" v-else-if="userRole === '省级'">
      <template #header>
        <div class="card-title">快捷操作</div>
      </template>
      <div class="action-grid">
        <div class="action-item" @click="$router.push('/register-audit')">
          <el-icon><edit /></el-icon>
          <span>备案审核</span>
        </div>
        <div class="action-item" @click="$router.push('/final-audit')">
          <el-icon><check /></el-icon>
          <span>数据终审</span>
        </div>
        <div class="action-item" @click="$router.push('/national-report')">
          <el-icon><upload /></el-icon>
          <span>国家上报</span>
        </div>
        <div class="action-item" @click="$router.push('/analysis')">
          <el-icon><data-analysis /></el-icon>
          <span>数据分析</span>
        </div>
      </div>
    </el-card>

    <el-card class="notifications-card">
      <template #header>
        <div class="card-title">最新通知</div>
      </template>
      <div class="notification-list">
        <div v-for="item in notifications" :key="item.id" class="notification-item">
          <div class="notification-title">{{ item.title }}</div>
          <div class="notification-content">{{ item.content }}</div>
          <div class="notification-time">{{ item.time }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { House, Edit, Document, Time, Bell, Check, Upload, DataAnalysis } from '@element-plus/icons-vue'

const userRole = computed(() => {
  return localStorage.getItem('userRole') || '企业'
})

const currentDate = ref('')
const todoCount = ref(5)
const completedCount = ref(12)

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

onMounted(() => {
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

.card-title {
  font-size: 16px;
  font-weight: 600;
}

.quick-actions {
  margin-top: 20px;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 10px 0;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  border-radius: 8px;
  background-color: #f5f7fa;
  cursor: pointer;
  transition: all 0.3s;
}

.action-item:hover {
  background-color: #e6f0ff;
  transform: translateY(-2px);
}

.action-item .el-icon {
  font-size: 28px;
  color: #1890ff;
  margin-bottom: 8px;
}

.action-item span {
  font-size: 12px;
  color: #333;
  text-align: center;
}

.notifications-card {
  margin-top: 20px;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.notification-item {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 6px;
  border-left: 3px solid #1890ff;
}

.notification-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.notification-content {
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
  line-height: 1.4;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

@media (max-width: 768px) {
  .content-section {
    padding: 12px;
  }

  .content-section h2 {
    font-size: 16px;
  }

  .welcome-content {
    flex-direction: column;
    text-align: center;
    margin-bottom: 20px;
  }

  .welcome-icon {
    font-size: 48px;
    margin-right: 0;
    margin-bottom: 15px;
  }

  .welcome-stats {
    flex-direction: column;
    gap: 15px;
  }

  .action-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .action-item {
    padding: 12px 8px;
  }

  .action-item .el-icon {
    font-size: 24px;
  }

  .action-item span {
    font-size: 11px;
  }
}
</style>