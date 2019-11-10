<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <img src="./logo_index.png">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入校验码"></el-input>
        </el-form-item>
        <el-form-item prop="xieyi" style="text-align: left;">
          <el-checkbox v-model="loginForm.xieyi" style="margin-right: 10px;"></el-checkbox>
          <span>我已阅读并同意用户协议和隐私条款</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var xieyirule = function (rule, value, callback) {
      value ? callback() : callback(new Error('请勾选遵守规则'))
    }
    return {
      loginRules: {
        mobile: [
          { required: true, message: '必须填写手机号码' },
          { pattern: /^1[35789]\d{9}$/, message: '请正确填写手机号码' }
        ],
        code: [
          { required: true, mseeage: '必须填写校验码' }
        ],
        xieyi: [
          { validator: xieyirule }
        ]
      },
      loginForm: {
        mobile: '',
        code: '',
        xieyi: true
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate((vilid) => {
        if (vilid) {
          let pro = this.$http.post('/authorizations', this.loginForm)
          pro
            .then(result => {
              if (result.status === 201) {
                window.sessionStorage.setItem('token', JSON.stringify(result.data.data))
                this.$router.push({ name: 'home' })
              }
            })
            .catch(err => {
              this.$message({ type: 'error', message: '错误是' + err, showClose: true })
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #ccc;
  background-image: url('./login_bg.jpg');
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    background: white;
    width: 400px;
    height: 340px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    img {
      width: 50%;
      margin: 20px auto;
    }
    .el-form {
      width: 75%;
    }
  }
}
</style>
