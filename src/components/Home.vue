<template>
  <div>
    <div class="body">
        <div class="search">
            <h2 class="search_left">我的资源</h2>
            <div class="others" style="white-space: nowrap;">
              <el-link icon="el-icon-reading" href="#/ElectronicJournalCenter"  v-show="isShow" >杂志管理中心</el-link>
              <el-link icon="el-icon-message" href="#/Review" >我的评阅</el-link>
              <el-link icon="el-icon-position" href="#/SubmissionGuide">投稿指南</el-link>
              <el-link icon="el-icon-notebook-1"  href="#/Template" >模板库</el-link>
              <!-- <el-link icon="el-icon-edit"  href="#/Editor" >在线编辑</el-link> -->
              <div class="addbtn">
                <Addresource :categories="categories" :privateflag="privateflag"></Addresource>
              </div>
            </div>
            <div class="search_main">
                <el-input placeholder="请输入您要查询的内容" v-model="searchinput" style="width: 400px;">
                    <i slot="suffix" class="el-input__icon el-icon-search"  @click="searchclick"></i>
                </el-input>
            </div>
           <Ava></Ava>
        </div>
        <div class="main">
            <el-col :span="12" class="leftBar" :style="{width: isCollapse ? '60px' : '300px'}">
                <el-menu default-active="2" class="el-menu-vertical-demo"
                    background-color="rgb(85, 94, 99)" text-color="#fff" active-text-color="#fff">

                    <el-submenu v-for="(category,index) in categories" :key="index" :index="index+''"  @open="handleOpen" @close="handleClose">
                        <span slot="title">{{category.title}}</span>
                        <el-menu-item v-for="(subTitle,subIndex) in category.subTitle" :key="subIndex" :index="`${index}-${subIndex}`" @click="myclick(index, subIndex)">
                            {{subTitle}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
                <!-- <el-button type="text" @click="addclick">新增</el-button> -->
                <Addbig v-on:update-data="findall" :privateflag="privateflag"></Addbig>
                <Addsmall v-on:update-data="findall"  :categories="categories" :privateflag="privateflag"></Addsmall>
            </el-col>
            <div class="content">
                <el-empty v-if="resouces.length === 0"  description="您还没有创建过此分类资源，来上传您的资源吧！"></el-empty>
                <Resoucelist :resouces="this.resouces" :total="this.resouces.length"></Resoucelist>
            </div>
        </div>
    <!-- 使用组件 -->
  </div>
</div>
</template>

<script>
import Addbig from './Addbig'
import Addsmall from './Addsmall'
import Ava from './Ava.vue'
import Resoucelist from './Resoucelist'
import Addresource from './Addresource'
import Review from './Review'
import Template from './Template'
import SubmissionGuide from './SubmissionGuide'
export default {
  name: 'Home',
  data () {
    return {
      // eslint-disable-next-line no-undef
      user_id: JSON.parse(sessionStorage.getItem('userinfo'))['_id'],
      privateflag: 1, // 1代表可选择公有 私有的
      name: JSON.parse(sessionStorage.getItem('userinfo'))['user_name'],
      user_role: JSON.parse(sessionStorage.getItem('userinfo'))['user_role'],
      searchinput: '',
      isShow: !(JSON.parse(sessionStorage.getItem('userinfo'))['user_role'] === '普通用户'),
      categories: [],
      contentValue: {
        index: '0',
        subIndex: '0'
      },
      resouces: [],
      $route: this.$route

    }
  },
  components: {
    Ava,
    Addbig,
    Addsmall,
    Resoucelist,
    Addresource,
    Review,
    Template,
    SubmissionGuide
  },
  methods: {// 定义方法
    // 选择哪个列表 展示相应资源
    myclick (index, subIndex) {
    //   alert(`${index}+${subIndex}`)
      this.contentValue = {index, subIndex}
      // alert('big:' + this.categories[index].title + ' small' + this.categories[index].subTitle[subIndex])
      var formdata = new FormData()
      formdata.append('publish_category', this.categories[index].title)
      formdata.append('magazine', this.categories[index].subTitle[subIndex])
      formdata.append('user_id', this.user_id)
      this.$http.post('/api/myacademic', formdata).then((res) => {
        // console.log(res.data)
        this.resouces = res.data
        console.log(this.resouces)
      })
        .catch(error => {
          console.log(error)
        })
    },

    findall () { // 查找公共大类别 小类别
      this.categories.splice(0, this.categories.length)
      var formdata1 = new FormData()
      formdata1.append('user_id', this.user_id)
      this.$http.post('/api/find_user_public_category', formdata1).then((res) => {
        let len = res.data.length
        for (let i = 0; i < len; i++) {
          let cat = {}
          cat.title = res.data[i].publish_category
          cat.subTitle = res.data[i].magazine
          this.categories.push(cat)
        }
      })
      // 查找个人大类别 小类别
      var formdata = new FormData()
      formdata.append('user_id', this.user_id)
      this.$http.post('/api/find_category', formdata).then((res) => {
        let len = res.data.length
        for (let i = 0; i < len; i++) {
          let cat = {}
          cat.title = res.data[i].category
          cat.subTitle = res.data[i].magazine
          this.categories.push(cat)
        }
      })
      console.log(this.categories)
    },
    searchclick () {
      alert('搜索内容为:' + this.searchinput)
    },
    exitclick () {
      this.$http.get('/api/logout').then((res) => {
        sessionStorage.clear()// 清除sessionStorage
        console.log('退出')
      })
    },
    addclick () {
      alert('此处预留新增接口')
    },
    handleCommand (command) { // 扩充用
      if (command === 'exit') {
        this.exitclick()
      } else {
        alert('下次再补充新的功能')
      }
    },
    handleOpen (key, keyPath) {
      alert(0)
    },
    handleClose (key, keyPath) {
      alert(0)
    },
    handleSelect (a, b) {
      alert(0)
    }
  },
  watch: {// 用来监听
    $route: {
      handler (val, oldval) {
        console.log('New:' + val)// 新路由信息
        console.log('Old' + oldval)// 老路由信息
        if (val.path === '/Home') {
          this.findall()
          // alert('渲染首页')
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  // created () {
  //   this.findall()
  // },
  mounted () {
    console.log('session:' + sessionStorage.getItem('userinfo'))
    this.findall()
    // 默认情况下加载第一个
    var formdata = new FormData()
    formdata.append('publish_category', 'ACM会议')
    formdata.append('magazine', 'KDD')
    formdata.append('user_id', this.user_id)
    this.$http.post('/api/myacademic', formdata).then((res) => {
      console.log('lllllll:' + res.data)
      this.resouces = res.data
      console.log(this.resouces)
    })
      .catch(error => {
        console.log(error)
      })
  }

}
</script>

<style scoped>
/* .body {
    height: 100vh;
    background-color: rgb(95, 75, 227);
} */
.body {
    height: 100vh;
}

.search {
    height: 10%;
    border-bottom: 2px solid gray;
    border-top: 2px solid gray;
    display: flex;
    flex-direction: row;
}

.search_left{
    width: 300px;
    margin-left: 20px;
    margin-top: 10px;
}

.search_main {
    flex: 1 1 auto;
    margin: 20px 200px;
    font-size: 16px;
    line-height: 1.5;
}
.main {
    height: 100%;
    display: flex;
    flex-direction: row;
}

.leftBar {
    width: 300px;
    flex: 0 0 auto;
    overflow-y: auto;
    height: 100%;
    background-color:rgb(85, 94, 99);
}

.content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    background-color: rgb(255, 255, 255);
}
.others{
  /* height: 100px; */
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
.addbtn{
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
}

</style>
