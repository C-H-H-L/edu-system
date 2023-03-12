<template>
  <div class="app-header">
    <!-- 左侧 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            <el-avatar :size="30" :src="userInfo.portrait"></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
            <!-- click.native将点击事件设置给<el-dropdown-item>组件的根元素事件才会生效 -->
            <el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 引入用户信息接口功能
// import { getUserInfo } from '@/services/user'
const data = {
  portrait: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  userName: 'CHHL'
}
export default {
  name: 'AppHeader',
  // 在created钩子中请求组件页面需要的数据最合适
  created () {
    // 加载用户信息（created内部不建议直接书写业务代码逻辑）
    this.loadUserInfo()
  },
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  methods: {
    // 加载用户信息功能
    async loadUserInfo () {
      // const { data } = await getUserInfo()
      this.userInfo = data
    },
    // 退出功能
    handleLogout () {
      this.$confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除store中的用户信息
        this.$store.commit('setUser', null)
        // 页面跳转
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .app-header{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
 }
 .el-dropdown-link{
    display: flex;
    align-items: center;
 }
</style>
