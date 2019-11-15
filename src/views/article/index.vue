<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <div class="text item">
        <el-form ref="searchFormRef" :model="searchForm" label-width="100px">
          <el-form-item label="文章状态：">
            <el-radio-group v-model="searchForm.status" @change="getArticleList()">
              <el-radio label>全部</el-radio>
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">待审核</el-radio>
              <el-radio label="2">审核通过</el-radio>
              <el-radio label="3">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表：">
            <el-select
              v-model="searchForm.channel_id"
              placeholder="请选择"
              clearable
              @change="getArticleList()"
            >
              <el-option
                v-for="item in channelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择：">
            <el-date-picker
              v-model="timetotime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{ tot }}条符合条件的内容</span>
      </div>
      <div class="text item">
        <el-table :data="articleList" style="width: 100%">
          <el-table-column label="图标">
            <img
              :src="stData.row.cover.images[0]"
              alt="没有图标"
              slot-scope="stData"
              width="150"
              height="100"
            />
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.status === 0">草稿</el-tag>
              <el-tag v-else-if="stData.row.status === 1" type="success">待审核</el-tag>
              <el-tag v-else-if="stData.row.status === 2" type="info">审核通过</el-tag>
              <el-tag v-else-if="stData.row.status === 3" type="warning">审核失败</el-tag>
              <el-tag v-else type="danger">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发表时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="stData">
              <el-button type="primary" size="mini">修改</el-button>
              <el-button type="danger" size="mini" @click="del(stData.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="text item">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="searchForm.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tot"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  watch: {
    timetotime: function (newv, oldv) {
      if (newv) {
        this.searchForm.begin_pubdate = newv[0]
        this.searchForm.end_pubdate = newv[1]
        // console.log(this.searchForm.begin_pubdate)
      } else {
        this.searchForm.begin_pubdate = ''
        this.searchForm.end_pubdate = ''
      }
      this.getArticleList()
    }
  },
  // watch: {
  //   searchForm: {
  //     handler: function (newv, oldv) {
  //       this.getArticleList()
  //     },
  //     deep: true
  //   }
  // },
  created () {
    this.getChannelList()
    this.getArticleList()
  },
  methods: {
    del (id) {
      this.$confirm('是否确认删除', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let pro = this.$http.delete(`/articles/${id}`)
        pro
          .then(result => {
            this.$message.success('删除成功')
            this.getArticleList()
          })
          .catch(err => {
            this.$message.error('删除失败' + err)
          })
      }).catch(() => {})
    },
    handleSizeChange (val) {
      this.searchForm.per_page = val
      this.getArticleList()
    },
    handleCurrentChange (val) {
      this.searchForm.page = val
      this.getArticleList()
    },
    getArticleList () {
      let searchData = {}
      for (var i in this.searchForm) {
        if (this.searchForm[i]) {
          searchData[i] = this.searchForm[i]
        }
      }
      let pro = this.$http.get('/articles', { params: searchData })
      pro
        .then(result => {
          //   console.log(result)
          if (result.data.message === 'OK') {
            this.articleList = result.data.data.results
            this.tot = result.data.data.total_count
            // console.log(this.articleList)
          }
        })
        .catch(err => {
          this.$message.error('获取文章列表错误' + err)
        })
    },
    getChannelList () {
      let pro = this.$http.get('/channels')
      pro
        .then(result => {
          if (result.data.message === 'OK') {
            this.channelList = result.data.data.channels
          }
        })
        .catch(err => {
          this.$message.error('获取频道错误' + err)
        })
    }
  },
  data () {
    return {
      articleList: [],
      timetotime: [],
      tot: 0,
      searchForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 10
      },
      channelList: []
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 15px;
}
.el-pagination {
  margin: 10px auto 0;
}
</style>
