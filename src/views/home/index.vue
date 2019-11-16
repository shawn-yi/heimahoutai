<template>
  <el-container>

    <el-aside :width="zhedie? '65px': '200px'">
      <el-menu
        background-color="#323745"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="zhedie"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/home" :style="{width: zhedie? '65px': '200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :style="{width: zhedie? '65px': '200px'}">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
            <el-menu-item index="/articleadd">发布文章</el-menu-item>
            <el-menu-item index="/article">文章列表</el-menu-item>
            <el-menu-item index="2-3">评论列表</el-menu-item>
            <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" :style="{width: zhedie? '65px': '200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/account" :style="{width: zhedie? '65px': '200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>

      <el-header>

        <div class="lt">
          <span :class="zhedie? 'el-icon-s-unfold': 'el-icon-s-fold'" @click="zhedie = !zhedie"></span>
          <span>江苏传智播客教育科技股份有限公司</span>
        </div>

        <div class="rt">
          <el-input type="text" placeholder="请输入搜索文章的内容" style="width: 240px;"></el-input>
          <span style="margin:0 25px;">消息</span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img :src="photo" alt width="40" height="40" style="border-radius: 20px;">
              {{name}}
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>github地址</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-header>

      <el-main>

        <router-view></router-view>

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      zhedie: false
    }
  },
  computed: {
    name () {
      return JSON.parse(window.sessionStorage.getItem('token')).name
    },
    photo () {
      return JSON.parse(window.sessionStorage.getItem('token')).photo
    }
  },
  methods: {
    logout () {
      this.$confirm('是否确认退出', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: rgb(50, 55, 69);
  }
  .el-header {
    // background-color: #ccc;
    display: flex;
    justify-content: space-between;
    padding: 0 9px 0 10px;
    min-width: 800px;
    .lt {
      height: 100%;
      width: 40%;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    .rt {
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        justify-content: centent;
        align-items: center;
        img {
          margin-right: 10px;
        }
        i {
          margin-left: 10px;
        }
      }
    }
  }
  .el-main {
    background-color: rgb(242, 243, 245);
  }
}
</style>
