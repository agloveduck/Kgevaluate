<template>
  <div>
    <h1>I'm JournalCenter components</h1>
    <el-table
    :data="mydata"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="_id"
      label="ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="category_des"
      label="出版物描述"
      width="150">
    </el-table-column>
    <el-table-column
      prop="category_name"
      label="出版物分类名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="create_id"
      label="创建人ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="updata_time"
      label="更新时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="is_delete"
      label="是否删除"
      width="300">
    </el-table-column>
    <el-table-column
      prop="is_private"
      label="是否私有"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <a href="#/JournalCenter/Add">添加</a>
  <router-view></router-view>
    <Addbig></Addbig>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './Footer.vue'
import Addbig from './Addbig'
export default {
  name: 'JournalCenter',
  data () {
    return {
      // eslint-disable-next-line no-undef
      mydata: []
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    findall () {
      this.$http.get('/api/user_find_public_publishcategory').then((res) => {
        console.log(res.data)
        this.mydata = res.data
      })
    }

  },
  components: {
    Footer,
    Addbig
  },
  created () {
    this.findall()
  },
  watch: {// 用来监听
    $route: {
      handler (val, oldval) {
        console.log(val)// 新路由信息
        // console.log(oldval)// 老路由信息
        if (val.path === '/JournalCenter') {
          this.findall()
        }
      },
      // 深度观察监听
      deep: true
    }
  }

}
</script>

<style>

</style>
