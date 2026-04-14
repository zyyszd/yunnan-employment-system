<template>
  <div class="content-section">
    <h2>数据查看</h2>
    <el-card class="filter-card">
      <el-form :inline="true" :model="filterForm">
        <el-form-item label="企业名称">
          <el-input v-model="filterForm.companyName" placeholder="请输入企业名称" />
        </el-form-item>
        <el-form-item label="调查期">
          <el-date-picker
            v-model="filterForm.period"
            type="month"
            placeholder="选择调查期"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="选择状态">
            <el-option label="全部" value="" />
            <el-option label="已通过" value="已通过" />
            <el-option label="待审核" value="待审核" />
            <el-option label="已退回" value="已退回" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="dataList" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="companyName" label="企业名称" width="180" />
      <el-table-column prop="period" label="调查期" />
      <el-table-column prop="periodType" label="周期类型" />
      <el-table-column prop="currentEmployment" label="就业人数" />
      <el-table-column prop="newEmployment" label="新增就业" />
      <el-table-column prop="reduceEmployment" label="减少就业" />
      <el-table-column prop="unemployment" label="失业人数" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="primary" size="small" @click="viewDetails(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next"
      style="margin-top: 20px; justify-content: flex-end;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const filterForm = reactive({
  companyName: '',
  period: '',
  status: ''
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const dataList = ref([
  {
    id: 1,
    companyName: '云南某企业',
    period: '2026-04',
    periodType: '月度',
    currentEmployment: 120,
    newEmployment: 10,
    reduceEmployment: 5,
    unemployment: 3,
    status: '已通过'
  },
  {
    id: 2,
    companyName: '昆明某公司',
    period: '2026-04',
    periodType: '月度',
    currentEmployment: 85,
    newEmployment: 8,
    reduceEmployment: 3,
    unemployment: 2,
    status: '待审核'
  },
  {
    id: 3,
    companyName: '曲靖某企业',
    period: '2026-04',
    periodType: '上半月',
    currentEmployment: 50,
    newEmployment: 5,
    reduceEmployment: 2,
    unemployment: 1,
    status: '已通过'
  },
  {
    id: 4,
    companyName: '大理某公司',
    period: '2026-03',
    periodType: '下半月',
    currentEmployment: 65,
    newEmployment: 3,
    reduceEmployment: 1,
    unemployment: 0,
    status: '已退回'
  }
])

total.value = dataList.value.length

const getStatusType = (status: string) => {
  switch (status) {
    case '已通过':
      return 'success'
    case '待审核':
      return 'warning'
    case '已退回':
      return 'danger'
    default:
      return 'info'
  }
}

const handleSearch = () => {
  console.log('查询条件:', filterForm)
}

const handleReset = () => {
  filterForm.companyName = ''
  filterForm.period = ''
  filterForm.status = ''
}

const viewDetails = (row: any) => {
  alert(`查看 ${row.companyName} 的详细数据\n调查期: ${row.period} ${row.periodType}\n就业人数: ${row.currentEmployment}\n新增就业: ${row.newEmployment}\n减少就业: ${row.reduceEmployment}\n失业人数: ${row.unemployment}\n状态: ${row.status}`)
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

.filter-card {
  margin-bottom: 0;
}
</style>
