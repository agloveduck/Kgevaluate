<template>
    <div class="body">
        <div class="search">
            <h2 class="search_left">模板库</h2>
            <div class="Home">
              <el-link icon="el-icon-s-home"  href="#/home" >主页</el-link>
              <div class="addbtn">
                 <Addtemplate v-on:update-data="getTemplates"></Addtemplate>
              </div>
            </div>
            <div class="search_main">
                <el-input placeholder="请输入您要查询的内容" v-model="searchinput" >
                    <i slot="suffix" class="el-input__icon el-icon-search"  @click="searchclick"></i>
                </el-input>
            </div>
            <Ava></Ava>
        </div>
        <div class="main">
            <el-empty v-if="myTemplates.length === 0"  description="暂无模板文件"></el-empty>
            <div class="list-container">
                  <div v-for="(myTemplate,index) in displayedResources" :key="index">
                    <Atemplate :authors="myTemplate.authors" :name="myTemplate.academic_name" :abstract="myTemplate.abstract" :academic_id="myTemplate._id"  :create_time="myTemplate.create_time"></Atemplate>
                  </div>
              </div>
              <el-pagination
      layout="prev, pager, next"
      :total=total
      :page-size=pageSize
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
        </div>
    </div>
</template>
<script>
import Ava from './Ava.vue'
import Atemplate from './Atemplate.vue'
import Addtemplate from './Addtemplate.vue'
export default {
  name: 'Template',
  components: {
    Ava,
    Atemplate,
    Addtemplate
  },
  data () {
    return {
      searchinput: '',
      myTemplates: [],
      currentPage: 1,
      total: 0,
      pageSize: 2
    }
  },
  mounted () {
    this.getTemplates()
  },
  computed: {
    displayedResources () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.myTemplates.slice(start, end)
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    getTemplates () {
      // 发送axios请求
      this.$http.post('/api/find_all_template').then((res) => {
        this.myTemplates = res.data
        this.total = res.data.length
        console.log(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    searchclick () {
      // alert('搜索内容为:' + this.searchinput)
      var formdata = new FormData()
      formdata.append('search_content', this.searchinput)
      this.$http.post('/api/search_template', formdata).then((res) => {
        this.myTemplates = res.data
        console.log(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }

}
</script>
<style scoped>
.body {
    height: 100vh;
    background-color: rgb(255, 255, 255);
    /* color: aquamarine; */
}

.search {
    height: 10%;
    border-bottom: 2px solid gray;
    border-top: 2px solid gray;
    display: flex;
    flex-direction: row;
    /* padding: 0px 50px; */
    /* background-color: rgb(203, 236, 173); */
}
.search_left{
    width: 300px;
}
.search_main{
    flex: 1 1 auto;
    margin: 20px 200px;
}
.main {
    /* height: 90%;
    display: flex;
    flex-direction: row; */
    position: relative;
    background-color: rgb(244, 244, 245);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: scroll;
    height:100%;
}

.leftBar {
    width: 300px;
    flex: 0 0 auto;
    height: 100%;
    overflow-y: auto;
    background-color:rgb(85, 94, 99);
}

.content {
    flex: 1 1 auto;
    background-color: rgb(255, 255, 255);
}
.Home,.addbtn{
  /* height: 100px; */
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}

.list-container {
  /* set the list container's width, height, and other styles as needed */
  margin: 20px; /* add some margin to the list container */
}
.el-button {
  width: 60px;
  height: 50px;
}
.addbtn{
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
}
</style>
