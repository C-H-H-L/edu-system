<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline" ref="form">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="资源名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder="资源路径" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="资源分类" clearable>
              <!-- 请求接口进行下拉菜单项设置 -->
              <el-option
              v-for="item in resourceCategories"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onReset">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resources"
        style="width: 100%"
        v-loading="isLoading">
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <!-- 设置过滤器需要使用作用域插槽获取数据 -->
        <el-table-column
          label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// import { getResourcePages, getResourceCategories } from '@/services/resource'
const data = [
  {
    name: '资源一',
    url: '/xxx/xxx',
    description: '描述一',
    createdTime: 'Thu Mar 09 2023 18:22:12 GMT+0800'
  },
  {
    name: '资源二',
    url: '/xxx/xxx',
    description: '描述二',
    createdTime: 'Thu Mar 09 2023 18:22:12 GMT+0800'
  },
  {
    name: '资源三',
    url: '/xxx/xxx',
    description: '描述三',
    createdTime: 'Thu Mar 09 2023 18:22:12 GMT+0800'
  }
]
const resourceCategories1 = [
  {
    id: 1,
    name: '角色管理'
  },
  {
    id: 2,
    name: '菜单管理'
  },
  {
    id: 3,
    name: '资源管理'
  }
]
export default {
  name: 'ResourceList',
  data () {
    return {
      resources: [],
      form: {
        // 当前显示的页号
        current: 1,
        // 每页显示的数据条数
        size: 10,
        // 资源名称
        name: '',
        // 资源路径
        url: '',
        // 资源分组ID
        categoryId: ''
      },
      // 数据总数
      totalCount: 0,
      // 存储资源分类信息
      resourceCategories: [],
      // 用于保存加载状态
      isLoading: false
    }
  },
  created () {
    // 加载资源数据
    this.loadResources()
    // 加载资源列表
    this.loadResourceCategories()
  },
  methods: {
    // 重置按钮
    onReset () {
      this.$refs.form.resetFields()
    },
    // 提交筛选按钮
    onSubmit () {
      // 请求数据前，将请求的当前页数设置为1
      this.form.current = 1
      this.loadResources()
    },
    // 加载资源列表
    async loadResourceCategories () {
      // const { data } = await getResourceCategories()
      this.resourceCategories = resourceCategories1
    },
    // 每页显示条数变化时触发
    handleSizeChange (val) {
      this.form.size = val
      // 由于修改了每页显示的条数，应当将当前页数恢复到初始值
      this.form.current = 1
      this.loadResources()
    },
    // 页号改变时触发
    handleCurrentChange (val) {
      this.form.current = val
      this.loadResources()
    },
    async loadResources () {
      // 开始加载数据
      this.isLoading = true
      // const { data } = await getResourcePages(this.form)
      this.totalCount = data.length
      this.resources = data
      this.isLoading = false
    },
    handleEdit () {

    },
    handleDelete () {

    }
  },
  filters: {
    // 日期过滤器
    dateFormat (date) {
      date = new Date(date)
      return `
        ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 
        ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
