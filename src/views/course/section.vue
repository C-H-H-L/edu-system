<template>
  <div class="course-section">
    <el-card>
      <el-tree
        v-loading="isLoading"
        :data="sections"
        :props="defaultProps"
        draggable
        :allow-drop="handleAllowDrop"
        @node-drop="handleNodeDrop">
        <div class="inner" slot-scope="{ node, data }">
          <!-- 内容设置 -->
          <span>{{ node.label }}</span>
          <!-- 后续按钮结构 -->
          <span v-if="data.sectionName" class="action">
            <el-button>编辑</el-button>
            <el-button>添加课时</el-button>
            <el-button>状态</el-button>
          </span>
          <span v-else class="action">
            <el-button>编辑</el-button>
            <el-button
              @click="$router.push({
                name: 'course-video',
                params: {
                  courseId
                },
                query: {
                  lessonId: data.id
                }
              })"
            >上传视频</el-button>
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
// import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLesson } from '@/services/course-section'
const data = [{
  sectionName: '章节一',
  lessonDTOS: [{
    theme: '课时一',
    sectionId: 1
  }, {
    theme: '课时二',
    sectionId: 1
  }]
}, {
  sectionName: '章节二',
  lessonDTOS: [{
    theme: '课时一',
    sectionId: 2
  }, {
    theme: '课时二',
    sectionId: 2
  }]
}, {
  sectionName: '章节三',
  lessonDTOS: [{
    theme: '课时一',
    sectionId: 3
  }, {
    theme: '课时二',
    sectionId: 3
  }]
}, {
  sectionName: '章节四',
  lessonDTOS: [{
    theme: '课时一',
    sectionId: 4
  }]
}]
export default {
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.loadSection()
  },
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data) {
          // data是章节或课时的时候，label的属性名不同，需要检测后使用
          return data.sectionName || data.theme
        }
      },
      isLoading: false
    }
  },
  methods: {
    // 节点拖拽完毕后的处理函数
    async handleNodeDrop (draggingNode, dropNode, type, event) {
      this.isLoading = true
      try {
        // 由于有很多章节与课时，需要给每个章节与课时都进行最新的排序顺序的请求
        // promise.all()用于批量异步操作的处理，将多个Promise实例,包装成一个新的Promise实例
        await Promise.all(dropNode.parent.childNodes.map((item, index) => {
          // 判断当前是章节还是课时，再给对应接口发送请求即可
          if (draggingNode.data.sectionId) {
            // 课时接口处理
            // return saveOrUpdateSection({
            //   id: item.data.id,
            //   orderNum: index
            // })
            return true
          } else {
            // 章节接口处理
            // return saveOrUpdateLesson({
            //   id: item.data.id,
            //   orderNum: index
            // })
            return true
          }
        }))
        this.$message.success('数据更新成功')
      } catch (err) {
        this.$message.error('数据更新失败', err)
      }
      this.isLoading = false
    },
    // 节点拖拽处理函数
    handleAllowDrop (draggingNode, dropNode, type) {
      // 规则一：只能同级移动，type不能为'inner'
      // 规则二：课时不能移动到其他章节中
      return type !== 'inner' && draggingNode.data.sectionId === dropNode.data.sectionId
    },
    async loadSection () {
      // const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data
    }
  }
}
</script>

<style lang="scss" scoped>
.inner {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}
::v-deep .el-tree-node__content {
  height: auto;
}
</style>
