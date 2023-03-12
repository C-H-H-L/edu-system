<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoginLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入封装的接口功能组件
// import { login } from '@/services/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 存储表单数据
      form: {
        phone: '11111111111',
        password: '111111'
      },
      // 用于设置表单校验规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入6-18位的密码', trigger: 'blur' }
        ]
      },
      // 用于保存加载状态
      isLoginLoading: false
    }
  },
  methods: {
    // 登录功能
    async onSubmit () {
      try {
        /* validate,对整个表单进行校验的方法，参数为一个回调函数。
        该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。
        若不传入回调函数，则会返回一个 promise */
        /* await 后面放置的就是返回promise对象的一个表达式,
        等后面的promise对象执行完毕，然后拿到promise resolve 的值并进行返回 */
        await this.$refs.form.validate()
        this.isLoginLoading = true
        // console.log('验证通过')
        const validate = true
        // 发送请求，通过接口文档进行书写相关内容（项目开发过程中前后端工程师有一个统一的文件进行沟通交流开发）
        // { data }解构操作，直接取出返回值中的data属性值
        /* const { data } = await login(this.form) */
        this.isLoginLoading = false
        // 响应处理
        /* if (data.state === 1) {
          this.$message.success('登录成功')
          // 将用户信息存储到Vuex中
          this.$store.commit('setUser', data.content)
          // 根据路由守卫中的redirect数据进行跳转设置
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          this.$message.error('登录失败')
        } */
        if (validate) {
          this.$router.push(this.$route.query.redirect || '/')
        }
      } catch (error) {
        console.log('验证失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-form{
    background-color: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;
  }
  .el-button{
    width: 100%;
  }
</style>
