<template>
  <div class="content-section">
    <h2>数据分析</h2>
    <el-card class="analysis-card">
      <template #header>
        <div class="card-header">
          <span>数据统计</span>
          <el-select v-model="analysisPeriod" placeholder="选择统计周期">
            <el-option label="月度" value="月度" />
            <el-option label="季度" value="季度" />
            <el-option label="年度" value="年度" />
          </el-select>
        </div>
      </template>
      <div class="analysis-content">
        <div class="chart-container">
          <h3>就业人数趋势</h3>
          <div class="chart-placeholder">
            <el-icon class="chart-icon"><data-analysis /></el-icon>
            <span>折线图：就业人数趋势</span>
          </div>
        </div>
        <div class="chart-container">
          <h3>失业原因分布</h3>
          <div class="chart-placeholder">
            <el-icon class="chart-icon"><data-analysis /></el-icon>
            <span>柱状图：失业原因分布</span>
          </div>
        </div>
        <div class="chart-container">
          <h3>地区就业情况</h3>
          <div class="chart-placeholder">
            <el-icon class="chart-icon"><data-analysis /></el-icon>
            <span>排名表：地区就业情况</span>
          </div>
        </div>
      </div>
      <div class="analysis-actions">
        <el-button type="primary">导出Excel</el-button>
        <el-button>导出PDF</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DataAnalysis } from '@element-plus/icons-vue'

// 数据分析周期
const analysisPeriod = ref('月度')
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

.analysis-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.analysis-content {
  margin-bottom: 20px;
}

.chart-container {
  background-color: #fafafa;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
}

.chart-icon {
  font-size: 48px;
  color: #1890ff;
  margin-bottom: 10px;
}

.analysis-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>