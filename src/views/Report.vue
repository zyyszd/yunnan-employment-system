<template>
  <div class="content-section">
    <h2>数据填报</h2>
    <el-card class="report-card">
      <template #header>
        <div class="card-header">
          <span>填报信息</span>
          <el-select v-model="reportPeriodType" placeholder="选择周期类型">
            <el-option label="月度" value="月度" />
            <el-option label="上半月" value="上半月" />
            <el-option label="下半月" value="下半月" />
          </el-select>
        </div>
      </template>
      <el-form :model="reportForm" label-width="150px" class="report-form">
        <el-form-item label="调查期" required>
          <el-date-picker
            v-model="reportForm.period"
            type="month"
            placeholder="选择调查期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="建档期就业人数" required>
          <el-input v-model="reportForm.baseEmployment" disabled />
        </el-form-item>
        <el-form-item label="调查期就业人数" required>
          <el-input v-model="reportForm.currentEmployment" type="number" min="0" />
        </el-form-item>
        <el-form-item label="调查期新增就业人数" required>
          <el-input v-model="reportForm.newEmployment" type="number" min="0" />
        </el-form-item>
        <el-form-item label="调查期减少就业人数" required>
          <el-input v-model="reportForm.reduceEmployment" type="number" min="0" />
        </el-form-item>
        <el-form-item label="调查期末失业人数" required>
          <el-input v-model="reportForm.unemployment" type="number" min="0" />
        </el-form-item>
        <el-form-item label="失业原因分类" required>
          <el-checkbox-group v-model="reportForm.unemploymentReasons">
            <el-checkbox label="经济性裁员" />
            <el-checkbox label="合同到期" />
            <el-checkbox label="个人原因" />
            <el-checkbox label="其他" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="reportForm.remarks" type="textarea" placeholder="请输入备注说明" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveDraft">暂存</el-button>
          <el-button type="success" @click="submitReport">上报</el-button>
          <el-button @click="resetReportForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { api } from '../utils/api'

const reportPeriodType = ref('月度')

const reportForm = ref({
  period: new Date(),
  baseEmployment: 100,
  currentEmployment: 0,
  newEmployment: 0,
  reduceEmployment: 0,
  unemployment: 0,
  unemploymentReasons: [] as string[],
  remarks: ''
})

const saveDraft = async () => {
  try {
    await api.employment.create({
      period: formatDate(reportForm.value.period),
      periodType: reportPeriodType.value,
      baseEmployment: reportForm.value.baseEmployment,
      currentEmployment: reportForm.value.currentEmployment,
      newEmployment: reportForm.value.newEmployment,
      reduceEmployment: reportForm.value.reduceEmployment,
      unemployment: reportForm.value.unemployment,
      unemploymentReasons: reportForm.value.unemploymentReasons,
      remarks: reportForm.value.remarks
    })
    ElMessage.success('数据已暂存')
  } catch (error: any) {
    ElMessage.error(error.message || '暂存失败')
  }
}

const submitReport = async () => {
  try {
    await api.employment.create({
      period: formatDate(reportForm.value.period),
      periodType: reportPeriodType.value,
      baseEmployment: reportForm.value.baseEmployment,
      currentEmployment: reportForm.value.currentEmployment,
      newEmployment: reportForm.value.newEmployment,
      reduceEmployment: reportForm.value.reduceEmployment,
      unemployment: reportForm.value.unemployment,
      unemploymentReasons: reportForm.value.unemploymentReasons,
      remarks: reportForm.value.remarks
    })
    ElMessage.success('数据已上报，等待审核')
  } catch (error: any) {
    ElMessage.error(error.message || '上报失败')
  }
}

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

const resetReportForm = () => {
  reportForm.value = {
    period: new Date(),
    baseEmployment: 100,
    currentEmployment: 0,
    newEmployment: 0,
    reduceEmployment: 0,
    unemployment: 0,
    unemploymentReasons: [],
    remarks: ''
  }
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

.report-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.report-form {
  max-width: 600px;
}
</style>