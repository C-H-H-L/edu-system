<template>
  <div class="course-create-or-edit">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <!-- el-step中的点击事件应该是原生事件，不应该是自定义事件 -->
          <el-step
          v-for="(item, i) in steps"
          :key="item.id"
          :title="item.title"
          :icon="item.icon"
          @click.native="activeStep = i">
          </el-step>
        </el-steps>
      </div>
      <el-form label-width="80px">
        <!-- 步骤对应的表单结构 -->
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              v-model="course.previewFirstField"
              placeholder="概述1"
              style="width: 49%; min-width: 300px; margin-right: 15px;">
              <template slot="append">{{ course.previewFirstField.length }}/20</template>
            </el-input>
            <el-input
            v-model="course.previewSecondField"
            placeholder="概述2"
            style="width: 49%; min-width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
            v-model="course.sortNum"
            label="描述文字"
            controls-position="right">
          </el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          <course-image
          v-model="courseListImg"
          label="课程封面"
          :limit="3"></course-image>
          <course-image
          v-model="courseImgUrl"
          label="解锁封面"></course-image>
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input
              v-model="course.discounts"
              type="number"
              :min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input
              v-model="course.price"
              type="number"
              :min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input
              v-model="course.sales"
              type="number"
              :min="0">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input
              v-model="course.discountsTag"></el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀开关" label-width="120px">
            <el-switch
            v-model="course.activityCourse"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="course.activityCourseDTO.beginTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="course.activityCourseDTO.endTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input
                v-model="course.activityCourseDTO.amount"
                type="number"
                :min="0">
                <template slot="append">
                  元
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="库存">
              <el-input
              v-model="course.activityCourseDTO.stock"
              type="number"
              :min="0">
                <template slot="append">
                  个
                </template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-switch
              v-model="course.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSave">
              保存
            </el-button>
          </el-form-item>
        </div>
        <!-- 设置下一步按钮 -->
        <el-form-item v-if="activeStep !== steps.length - 1">
          <el-button
          @click="activeStep++">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import CourseImage from './CourseImage'
// import { saveOrUpdateCourse, getCourseById } from '@/services/course'
import TextEditor from '@/components/TextEditor/index'
const data = {
  activityCourse: false
}
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [String, Number]
    }
  },
  name: 'CourseCreateOrEdit',
  created () {
    // 检测当前是否为编辑功能，如果是，根据courseId请求课程数据
    if (this.isEdit) {
      this.loadCourse()
    }
  },
  data () {
    return {
      // 步骤的进度
      activeStep: 0,
      // 步骤条的相关信息
      steps: [
        { id: 1, title: '基本信息', icon: 'el-icon-edit' },
        { id: 2, title: '课程封面', icon: 'el-icon-edit' },
        { id: 3, title: '销售信息', icon: 'el-icon-edit' },
        { id: 4, title: '秒杀信息', icon: 'el-icon-edit' },
        { id: 5, title: '课程详情', icon: 'el-icon-edit' }
      ],
      // 本地预览图片地址
      imageUrl: '',
      // 添加课程的相关信息
      course: {
        courseName: '',
        brief: '',
        teacherDTO: {
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        previewFirstField: '',
        previewSecondField: '',
        sortNum: 0,
        courseListImg: '',
        courseImgUrl: '',
        discounts: '',
        price: '',
        sales: '',
        discountsTag: '',
        activityCourse: false,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        courseDescriptionMarkDown: '<h3>默认值</h3>',
        // 0代表不上架，1代表上架
        status: 0
      }
    }
  },
  components: {
    CourseImage,
    TextEditor
  },
  methods: {
    // 编辑功能根据ID加载课程信息
    async loadCourse () {
      // const { data } = await getCourseById(this.courseId)
      // 判断当前课程是否为开启秒杀的状态，如果未开启秒杀，需要初始化数据
      if (!data.activityCourse) {
        data.activityCourseDTO = {
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        }
      }
      this.course = data
    },
    // 保存功能
    async handleSave () {
      // const { data } = await saveOrUpdateCourse(this.course)
      this.$message.success(`${this.isEdit ? '编辑' : '添加'}课程成功`)
      this.$router.push({
        name: 'course'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
