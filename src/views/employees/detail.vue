<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登陆账户设置" name="first">
            <el-form ref="formDataRef" :model="formData" label-width="80px" :rules="formDataRules">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveEmployeeBasicInformation">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情" name="second"><job-info /></el-tab-pane>
          <el-tab-pane lazy label="岗位信息" name="third"><user-info /></el-tab-pane>
        </el-tabs>
      </el-card>

    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveEmployeeBasicInformation } from '@/api/user'
import JobInfo from './components/job-info.vue'
import UserInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    JobInfo,
    UserInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      formData: {},
      formDataRules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '2-6位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '不少于6位', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.formData = await getUserDetailById(this.$route.params.id)
    },
    async saveEmployeeBasicInformation() {
      try {
        await this.$refs.formDataRef.validate()
        await saveEmployeeBasicInformation(this.formData)
        this.$message.success('修改成功')
        // this.getUserDetailById()
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
