<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <!-- 放置页签 -->
        <el-tab-pane label="角色管理">
          <!-- 新增角色按钮 -->
          <el-row style="height:60px">
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="dialogVisible = true"
            >新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table v-loading="loading" border="" :data="formData">
            <el-table-column type="index" label="序号" width="120" />
            <el-table-column prop="name" label="角色名称" width="240" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(scope)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRole(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row type="flex" justify="center" align="middle" style="height: 60px">
            <!-- 分页组件 -->
            <el-pagination
              v-if="total>0"
              layout="prev,pager,next,sizes"
              :total="total"
              :current-page.sync="pageForm.page"
              :page-sizes="[2,5,10,20]"
              :page-size.sync="pageForm.pagesize"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="formData.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formData.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <role-dialog ref="roleRef" :visible.sync="dialogVisible" @getRoleList="getRoleList" />
  </div>
</template>

<script>
import RoleDialog from './components/roleDialog.vue'
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  components: {
    RoleDialog
  },
  data() {
    return {
      pageForm: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      formData: [],
      loading: false,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      this.loading = true
      const { rows, total } = await getRoleList(this.pageForm)
      this.loading = false
      this.formData = rows
      this.total = total
      if (total > 0 && rows.length === 0) {
        this.pageForm.page--
        this.getRoleList()
      }
    },
    editRole({ row }) {
      console.log(row)
      this.dialogVisible = true
      this.$refs.roleRef.formData = { ...row }
    },
    async  delRole(id) {
      try {
        await this.$confirm('确认删除吗', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
        console.log('成功')
      } catch (error) {
        console.log(error)
      }
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    }
  }
}
</script>

<style>

</style>
