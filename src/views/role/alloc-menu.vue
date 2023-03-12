<template>
  <div class="alloc-menu">
    <el-card>
      <el-tree
      ref="menu-tree"
      node-key="id"
      :data="menus"
      :props="defaultProps"
      :default-checked-keys="checkedKeys"
      @node-click="handleNodeClick"
      default-expand-all
      show-checkbox></el-tree>
      <div style="margin: 20px">
        <el-button @click="onReset">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
const data = [{
  name: '权限管理',
  subMenuList: [{
    name: '角色列表'
  }, {
    name: '菜单列表'
  }, {
    name: '资源列表'
  }]
}, {
  name: '课程管理',
  subMenuList: [{
    name: '课程详情页面'
  }, {
    name: '课程信息页面'
  }]
}]
export default {
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    // 加载所有的菜单信息（用于展示tree结构）
    this.loadMenus()
    // 加载当前角色已经分配的菜单信息
    this.loadRoleMenus()
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  methods: {
    onReset () {
      this.$refs['menu-tree'].setCheckedKeys([])
    },
    // 自己封装的用于数据筛选的方法（筛选出被选中菜单项的ID）
    getCheckedKeys (menus) {
      // 遍历数据（将所有存在子节点的node排除，对子节点进行筛选）
      menus.forEach(menu => {
        // 未选中，结束
        if (!menu.selected) {
          return
        }
        // 检测是否存在子节点
        if (menu.subMenuList) {
          // 对子节点进行选中状态检测
          return this.getCheckedKeys(menu.subMenuList)
        }
        // 说明为选中的叶子节点（不存在子节点的节点，存储ID）
        // 由于此方法this.checkedKeys.push(menu.id)会导致数据频繁更新，最终可能会导致视图渲染失败
        // 使用扩展运算符可以解决这一问题
        this.checkedKeys = [...this.checkedKeys, menu.id]
      })
    },
    async loadRoleMenus () {
      // const { data } = await getRoleMenus(this.roleId)
      // this.getCheckedKeys(data.data)
    },
    async onSave () {
      // 发送请求，传递角色ID和选中的菜单项ID
      // const { data } = await allocateRoleMenus({
      //   roleId: this.roleId,
      //   menuIdList: this.$refs['menu-tree'].getCheckedKeys()
      // })
      this.$message.success('分配菜单成功')
      this.$router.push({
        name: 'role'
      })
    },
    async loadMenus () {
      // const { data } = await getMenuNodeList()
      this.menus = data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
