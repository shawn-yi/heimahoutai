<template>
  <el-select v-model="chid" placeholder="请选择" clearable>
    <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      chid: '',
      channelList: []
    }
  },
  props: {
    cid: {
      default: 0
    }
  },
  created () {
    this.getChannleList()
  },
  watch: {
    chid: function (newv, oldv) {
      this.$emit('slt', newv)
    },
    cid: function (newv, oldv) {
      this.chid = newv
    }
  },
  methods: {
    getChannleList () {
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
  }
}
</script>

<style lang="less" scoped>
</style>
