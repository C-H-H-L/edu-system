<template>
    <el-card>
      <div slot="header">
        <el-form :inline="true" :model="filterParams" ref="filter-form">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="filterParams.phone"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="rangeDate">
              <el-date-picker
                v-model="filterParams.rangeDate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="isLoading" @click="handleReset">重置</el-button>
            <el-button type="primary" :disabled="isLoading" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="users"
        style="width: 100%"
        v-loading="isLoading">
        <el-table-column
          prop="id"
          label="用户ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="头像"
          width="100">
          <template slot-scope="scope">
            <img width="30px" :src="scope.row.portrait" />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-switch
            v-model="scope.row.status"
            active-value="ENABLE"
            inactive-value="DISABLE"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleForbidUser(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button
            type="text"
            @click="handleSelectRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 设置分配角色的Dialog组件 -->
      <el-dialog
        title="分配角色"
        :visible.sync="dialogVisible"
        width="50%">
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAllocRole">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
</template>

<script>
// import { getUserPages, forbidUser } from '@/services/user'
// import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role'
const data = [{
  id: 1,
  portrait: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  name: 'chhl',
  phone: 18888888888,
  createTime: '2023-3-11',
  status: 'ENABLE'
}]
const data2 = [{
  id: 1,
  name: '超级管理员'
}, {
  id: 2,
  name: '学员'
}, {
  id: 3,
  name: '讲师'
}]
const data3 = [1, 3]
export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      isLoading: true,
      // 用于控制分配角色对话框是否显示
      dialogVisible: false,
      // 分配角色中的下拉菜单数据
      roles: [],
      // 下拉列表选中选项的ID组成的数组
      roleIdList: [],
      // 当前要进行角色分配的用户ID
      currentRoleID: null
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    async handleAllocRole () {
      // const { data } = await allocateUserRoles({
      //   userId: this.currentRoleID,
      //   roleIdList: this.roleIdList
      // })
      this.$message.success('分配角色成功')
      this.dialogVisible = false
    },
    // 加载用户
    async loadUsers () {
      this.isLoading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      // const { data } = await getUserPages(this.filterParams)
      this.users = data
      this.isLoading = false
    },
    async handleForbidUser (user) {
      // const { data } = await forbidUser(user.id)
    },
    handleQuery () {
      this.filterParams.currentPage = 1
      this.loadUsers()
    },
    handleReset () {
      this.$refs['filter-form'].resetFields()
      this.loadUsers()
    },
    // 点击用户的分配角色按钮
    async handleSelectRole (userInfo) {
      this.currentRoleID = userInfo.id
      // 显示分配角色对话框
      this.dialogVisible = true
      // 请求所有角色列表数据
      // const { data } = await getAllRoles()
      this.roles = data2
      // 请求当前用户的已分配角色信息
      // const { data: data2 } = await getUserRoles(userInfo.id)
      this.roleIdList = data3
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
