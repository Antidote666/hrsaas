<template>
  <UploadExcel :on-success="onSuccess" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async onSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = results.map(item => {
        const obj = {}
        Object.keys(item).forEach(key => {
          obj[userRelations[key]] = item[key]
        })
        return obj
      })
      console.log(arr)
      await importEmployee(arr)
      this.$message.success('上传成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
