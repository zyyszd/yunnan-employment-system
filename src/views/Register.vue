<template>
  <div class="content-section">
    <h2>企业备案信息</h2>
    <el-form :model="registerForm" label-width="120px" class="register-form">
      <el-form-item label="所属地区" required>
        <el-cascader
          v-model="registerForm.region"
          :options="regionOptions"
          placeholder="请选择地区"
          :props="{ expandTrigger: 'hover' }"
        />
      </el-form-item>
      <el-form-item label="组织机构代码" required>
        <el-input v-model="registerForm.orgCode" placeholder="请输入9位组织机构代码" />
      </el-form-item>
      <el-form-item label="企业名称" required>
        <el-input v-model="registerForm.companyName" placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item label="企业性质" required>
        <el-select v-model="registerForm.companyType" placeholder="请选择企业性质">
          <el-option label="国有" value="国有" />
          <el-option label="民营" value="民营" />
          <el-option label="外资" value="外资" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属行业" required>
        <el-select v-model="registerForm.industry" placeholder="请选择所属行业">
          <el-option label="农林牧渔业" value="农林牧渔业" />
          <el-option label="制造业" value="制造业" />
          <el-option label="建筑业" value="建筑业" />
          <el-option label="批发和零售业" value="批发和零售业" />
          <el-option label="交通运输、仓储和邮政业" value="交通运输、仓储和邮政业" />
          <el-option label="住宿和餐饮业" value="住宿和餐饮业" />
          <el-option label="其他行业" value="其他行业" />
        </el-select>
      </el-form-item>
      <el-form-item label="主要经营业务" required>
        <el-input v-model="registerForm.business" type="textarea" placeholder="请输入主要经营业务" />
      </el-form-item>
      <el-form-item label="联系人" required>
        <el-input v-model="registerForm.contact" placeholder="请输入联系人姓名" />
      </el-form-item>
      <el-form-item label="联系地址" required>
        <el-input v-model="registerForm.address" placeholder="请输入联系地址" />
      </el-form-item>
      <el-form-item label="邮政编码" required>
        <el-input v-model="registerForm.postalCode" placeholder="请输入6位邮政编码" />
      </el-form-item>
      <el-form-item label="联系电话" required>
        <el-input v-model="registerForm.phone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="传真" required>
        <el-input v-model="registerForm.fax" placeholder="请输入传真" />
      </el-form-item>
      <el-form-item label="电子邮件">
        <el-input v-model="registerForm.email" placeholder="请输入电子邮件" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitRegister">提交备案</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 地区选择选项
const regionOptions = ref([
  {
    value: '530000',
    label: '云南省',
    children: [
      {
        value: '530100',
        label: '昆明市',
        children: [
          { value: '530101', label: '五华区' },
          { value: '530102', label: '盘龙区' },
          { value: '530103', label: '官渡区' },
          { value: '530104', label: '西山区' }
        ]
      },
      {
        value: '530200',
        label: '曲靖市',
        children: [
          { value: '530201', label: '麒麟区' },
          { value: '530202', label: '沾益区' },
          { value: '530203', label: '马龙区' }
        ]
      }
    ]
  }
])

// 企业备案表单
const registerForm = ref({
  region: [],
  orgCode: '',
  companyName: '',
  companyType: '',
  industry: '',
  business: '',
  contact: '',
  address: '',
  postalCode: '',
  phone: '',
  fax: '',
  email: ''
})

// 提交备案
const submitRegister = () => {
  // 模拟提交
  alert('备案信息已提交，等待审核')
}

// 重置表单
const resetForm = () => {
  registerForm.value = {
    region: [],
    orgCode: '',
    companyName: '',
    companyType: '',
    industry: '',
    business: '',
    contact: '',
    address: '',
    postalCode: '',
    phone: '',
    fax: '',
    email: ''
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

.register-form {
  max-width: 800px;
}
</style>