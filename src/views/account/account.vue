<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账户管理</span>
    </div>
    <div class="text item carbody">
      <div class="lt">
        <el-form
          ref="accountFormRef"
          :model="accountForm"
          label-width="100px"
          :rules="accountFormRules"
        >
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="accountForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="mobile">
            <el-input v-model="accountForm.mobile" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="accountForm.email"></el-input>
          </el-form-item>
          <el-form-item label="简介：" prop="intro">
            <el-input type="textarea" v-model="accountForm.intro"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editAccount()">更新账户</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="rt">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="httpRequest"
        >
          <img v-if="accountForm.photo" :src="accountForm.photo" class="avatar" width="200" height="200"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </el-card>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
  data () {
    return {
      accountForm: {
        id: '',
        name: '',
        mobile: '',
        intro: '',
        email: ''
      },
      accountFormRules: {
        name: [
          { required: true, message: '名字必写' },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符' }
        ],
        email: [
          { required: true, message: '邮箱必写' },
          { type: 'email', message: '邮箱格式不正确' }
        ],
        intro: [{ required: true, message: '简介必写' }]
      }
    }
  },
  created () {
    this.getAccountForm()
  },
  methods: {
    httpRequest (file) {
    //   console.log(file)
      let fd = new FormData()
      fd.append('photo', file.file)
      let pro = this.$http.patch('/user/photo', fd)
      pro
        .then(result => {
        //   console.log(result)
          if (result.data.message === 'OK') {
            this.accountForm.photo = result.data.data.photo
            bus.$emit('jieshouphoto', result.data.data.photo)
            this.$message.success('头像修改成功')
          }
        })
        .catch(err => {
          return this.$message.error('头像修改错误' + err)
        })
    },
    editAccount () {
      this.$refs.accountFormRef.validate(valid => {
        if (valid) {
          let pro = this.$http.patch('/user/profile', this.accountForm)
          pro
            .then(result => {
              console.log(result)
              if (result.data.message === 'OK') {
                bus.$emit('jieshouname', result.data.data.name)
                return this.$message.success('用户更新成功')
              }
            })
            .catch(err => {
              return this.$message.error('用户更新失败' + err)
            })
        }
      })
    },
    getAccountForm () {
      let pro = this.$http.get('/user/profile')
      pro
        .then(result => {
        //   console.log(result)
          if (result.data.message === 'OK') {
            this.accountForm = result.data.data
          }
        })
        .catch(err => {
          return this.$message.error('获取用户信息错误', err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.carbody {
  display: flex;
  justify-content: space-around;
  .lt {
    width: 40%;
  }
  .rt {
    width: 30%;
    background-color: red;
  }
}
</style>
