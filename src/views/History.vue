<template>
  <div class="content-section">
    <h2>历史查询</h2>
    <el-form :inline="true" class="search-form">
      <el-form-item label="调查期">
        <el-date-picker
          v-model="searchForm.period"
          type="month"
          placeholder="选择调查期"
        />
      </el-form-item>
      <el-form-item label="周期类型">
        <el-select v-model="searchForm.periodType" placeholder="选择周期类型">
          <el-option label="全部" value="" />
          <el-option label="月度" value="月度" />
          <el-option label="上半月" value="上半月" />
          <el-option label="下半月" value="下半月" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" placeholder="选择状态">
          <el-option label="全部" value="" />
          <el-option label="待审核" value="待审核" />
          <el-option label="已通过" value="已通过" />
          <el-option label="已退回" value="已退回" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="historyList" style="width: 100%">
      <el-table-column prop="period" label="调查期" />
      <el-table-column prop="periodType" label="周期类型" />
      <el-table-column prop="currentEmployment" label="就业人数" />
      <el-table-column prop="unemployment" label="失业人数" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="submitTime" label="提交时间" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button type="primary" size="small" @click="viewDetails(scope.row)">查看详情</el-button>
          <el-button size="small" @click="exportData(scope.row)">导出</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 搜索表单
const searchForm = ref({
  period: '',
  periodType: '',
  status: ''
})

// 历史数据列表
const historyList = ref([
  {
    id: 1,
    period: '2026-03',
    periodType: '月度',
    currentEmployment: 120,
    unemployment: 5,
    status: '已通过',
    submitTime: '2026-04-01 10:30:00'
  },
  {
    id: 2,
    period: '2026-03',
    periodType: '下半月',
    currentEmployment: 118,
    unemployment: 3,
    status: '已通过',
    submitTime: '2026-03-31 15:20:00'
  },
  {
    id: 3,
    period: '2026-03',
    periodType: '上半月',
    currentEmployment: 115,
    unemployment: 2,
    status: '已通过',
    submitTime: '2026-03-15 16:45:00'
  },
  {
    id: 4,
    period: '2026-02',
    periodType: '月度',
    currentEmployment: 110,
    unemployment: 1,
    status: '已通过',
    submitTime: '2026-03-01 09:15:00'
  }
])

// 查询
const search = () => {
  alert('查询功能已触发')
}

// 重置查询
const resetSearch = () => {
  searchForm.value = {
    period: '',
    periodType: '',
    status: ''
  }
}

// 查看详情
const viewDetails = (row: any) => {
  alert(`查看 ${row.period} ${row.periodType} 的详细数据`)
}

// 导出数据
const exportData = (row: any) => {
  alert(`导出 ${row.period} ${row.periodType} 的数据`)
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
</style>