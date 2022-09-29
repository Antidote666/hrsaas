<template>
  <el-dialog
    :title="title"
    width="30%"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="formData"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{
          required:true,messgae:'角色必填',trigger:'blur'
        }]"
      >
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button @click="submit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/setting.js'
export default {
  props: {
    visible: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
      this.$refs.roleDialogForm.resetFields()
      this.formData = {}
    },
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.formData.id ? await updateRole(this.formData) : await addRole(this.formData)
        this.$message.success(`${this.formData.id ? '编辑' : '新增'}角色成功`)
        this.$emit('getRoleList')
        this.handleClose()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
