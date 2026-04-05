<template>
  <div class="content-section">
    <h2>国家上报</h2>
    <el-form :inline="true" class="search-form">
      <el-form-item label="上报周期">
        <el-date-picker
          v-model="reportForm.period"
          type="month"
          placeholder="选择上报周期"
        />
      </el-form-item>
      <el-form-item label="上报类型">
        <el-select v-model="reportForm.reportType" placeholder="选择上报类型">
          <el-option label="全量上报" value="full" />
          <el-option label="增量上报" value="increment" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitReport">上报国家</el-button>
        <el-button @click="queryStatus">查询状态</el-button>
      </el-form-item>
    </el-form>
    <el-card class="report-status-card">
      <template #header>
        <div class="card-header">
          <span>上报状态</span>
        </div>
      </template>
      <el-table :data="reportStatusList" style="width: 100%">
        <el-table-column prop="period" label="上报周期" />
        <el-table-column prop="reportType" label="上报类型" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="reportTime" label="上报时间" />
        <el-table-column prop="message" label="备注" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 上报表单
const reportForm = ref({
  period: '',
  reportType: 'full'
})

// 上报状态列表
const reportStatusList = ref([
  {
    id: 1,
    period: '2026-03',
    reportType: '全量上报',
    status: '成功',
    reportTime: '2026-04-01 10:00:00',
    message: '上报成功，收到国家系统回执'
  },
  {
    id: 2,
    period: '2026-02',
    reportType: '全量上报',
    status: '成功',
    reportTime: '2026-03-01 09:30:00',
    message: '上报成功，收到国家系统回执'
  },
  {
    id: 3,
    period: '2026-01',
    reportType: '全量上报',
    status: '成功',
    reportTime: '2026-02-01 14:20:00',
    message: '上报成功，收到国家系统回执'
  }
])

// 提交上报
const submitReport = () => {
  alert('数据已上报国家系统')
}

// 查询状态
const queryStatus = () => {
  alert('查询国家系统上报状态')
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

.search-form {
  margin-bottom: 20px;
}

.report-status-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>