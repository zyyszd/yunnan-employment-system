<template>
  <div class="content-section">
    <h2>企业备案审核</h2>
    <el-table :data="registerList" style="width: 100%">
      <el-table-column prop="companyName" label="企业名称" width="180" />
      <el-table-column prop="orgCode" label="组织机构代码" />
      <el-table-column prop="region" label="所属地区" />
      <el-table-column prop="submitTime" label="提交时间" />
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

// 企业备案列表
const registerList = ref([
  {
    id: 1,
    companyName: '云南某企业',
    orgCode: '123456789',
    region: '云南省昆明市五华区',
    submitTime: '2026-04-01 10:00:00',
    status: '待审核'
  },
  {
    id: 2,
    companyName: '昆明某公司',
    orgCode: '987654321',
    region: '云南省昆明市官渡区',
    submitTime: '2026-04-02 09:30:00',
    status: '待审核'
  },
  {
    id: 3,
    companyName: '曲靖某企业',
    orgCode: '456789123',
    region: '云南省曲靖市麒麟区',
    submitTime: '2026-04-02 14:20:00',
    status: '待审核'
  }
])

// 查看详情
const viewDetails = (row: any) => {
  alert(`查看 ${row.companyName} 的备案详情`)
}

// 通过审核
const passAudit = (row: any) => {
  alert(`${row.companyName} 的备案已通过审核`)
}

// 退回审核
const rejectAudit = (row: any) => {
  alert(`${row.companyName} 的备案已退回`)
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