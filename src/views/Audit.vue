<template>
  <div class="content-section">
    <h2>数据审核</h2>
    <el-table :data="auditList" style="width: 100%">
      <el-table-column prop="companyName" label="企业名称" width="180" />
      <el-table-column prop="period" label="调查期" />
      <el-table-column prop="periodType" label="周期类型" />
      <el-table-column prop="currentEmployment" label="就业人数" />
      <el-table-column prop="unemployment" label="失业人数" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="viewDetails(scope.row)">查看详情</el-button>
          <el-button type="success" size="small" @click="passAudit(scope.row)">通过</el-button>
          <el-button type="danger" size="small" @click="rejectAudit(scope.row)">退回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 审核列表
const auditList = ref([
  {
    id: 1,
    companyName: '云南某企业',
    period: '2026-04',
    periodType: '月度',
    currentEmployment: 120,
    unemployment: 5,
    status: '待审核'
  },
  {
    id: 2,
    companyName: '昆明某公司',
    period: '2026-04',
    periodType: '月度',
    currentEmployment: 85,
    unemployment: 2,
    status: '待审核'
  },
  {
    id: 3,
    companyName: '曲靖某企业',
    period: '2026-03',
    periodType: '下半月',
    currentEmployment: 50,
    unemployment: 1,
    status: '待审核'
  }
])

// 查看详情
const viewDetails = (row: any) => {
  alert(`查看 ${row.companyName} 的详细数据`)
}

// 通过审核
const passAudit = (row: any) => {
  alert(`${row.companyName} 的数据已通过审核`)
}

// 退回审核
const rejectAudit = (row: any) => {
  alert(`${row.companyName} 的数据已退回`)
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
</style>