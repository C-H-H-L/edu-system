<template>
  <div class="course-image">
    <el-form-item :label="label">
      <el-progress
        v-if="isUploading"
        type="circle"
        :percentage="percentage"
        :width="178"
        :status="percentage === 100 ? 'success' : undefined">
      </el-progress>
      <el-upload
        v-else
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="handleUpload">
        <!-- img为预览图片的显示位置 -->
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
// import { uploadCourseImage } from '@/services/course'
const data = {
  name: '图片链接'
}
export default {
  name: 'CourseImage',
  props: {
    // v-model默认使用value来接收父组件值
    value: {
      type: String
    },
    label: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      // 用于保存上传状态
      isUploading: false,
      // 用于保存上传进度百分比
      percentage: 0
    }
  },
  methods: {
    // 图片上传处理函数
    // option为上传的相关信息
    // option.file为上传的文件信息
    async handleUpload (option) {
      this.isUploading = true
      // 使用FormData对象处理
      const fd = new FormData()
      fd.append('file', option.file)
      // 发送上传请求
      // const { data } = await uploadCourseImage(fd, event => {
      //   this.percentage = Math.floor(event.loaded / event.total * 100)
      // })
      // v-model默认使用input事件来触发向父组件传值
      this.$emit('input', data.name)
      this.isUploading = false
      this.percentage = 0
    },
    // 上传图片成功回调
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传前的回调
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
// 由于设置了scoped只能在当前组件作用域内生效，由此需要::v-deep深度选择器来处理
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
