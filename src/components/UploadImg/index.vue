<template>
  <div>
    <el-upload
      v-loading="loading"
      action="#"
      :file-list="fileList"
      :limit="1"
      class="UploadImage"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="httpRequest"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <img :src="url" alt="" style="width: 100%;">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDz5GWyW9oOmwsfFconYju9JIIafV1VwR0',
  SecretKey: 'TjjU2OXULRUNE3gkqpcCZloeQUO4bz94'
})
export default {
  props: {
    defaulturl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      url: '',
      loading: false
    }
  },
  watch: {
    defaulturl(val) {
      this.fileList.push({
        name: 'defalut', url: val
      })
    }
  },
  created() {
    cos.getBucket({
      Bucket: 'lin-1309796059', /* 填入您自己的存储桶，必须字段 */
      Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */
      // Prefix: 'a/' /* Prefix表示列出的object的key以prefix开始，非必须 */
    }, function(err, data) {
      console.log(err || data.Contents)
    })
  },
  methods: {
    onPreview(file, fileList) {
      console.log(file)
      this.dialogVisible = true
      this.url = file.url
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    httpRequest({ file }) {
      this.loading = true
      console.log(file)
      cos.putObject({
        Bucket: 'lin-1309796059', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: '/syx/' + file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传失败')
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location
        })
      })
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif']
      const ishas = types.includes(file.type)
      if (!ishas) {
        this.$message.error(`只能上传${types.join(',')}格式`)
        return false
      }
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('只能上传1mb大小')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.UploadImage{
  width: 148px;
  height: 148px;
  overflow: hidden;
}

</style>
