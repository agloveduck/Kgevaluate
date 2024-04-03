<template>
    <div class="body">
        <div class="search">
            <h2 class="search_left">我的审核</h2>
            <div class="Home">
              <el-link icon="el-icon-s-home"  href="#/home" >主页</el-link>
              <el-link type="danger" :underline="false" @click="havent_review">未审阅</el-link>
              <el-link type="primary" :underline="false" @click="have_review">已审阅</el-link>
            </div>
            <div class="search_main">
                <el-input placeholder="请输入您要查询的内容" v-model="searchinput" >
                    <i slot="suffix" class="el-input__icon el-icon-search"  @click="searchclick"></i>
                </el-input>
            </div>
            <Ava></Ava>
        </div>
        <div class="main">
          <el-empty v-if="resouces.length === 0"  description="暂无需要您评阅的资源"></el-empty>
             <div v-for="(resouce,index) in displayedResources" :key="index">
                  <!-- temp=resouce.review_status?resouce.review_status:'未审阅' -->
                 <ReviewRes v-if="flag===0" :review_status="resouce.review_status?resouce.review_status:'未审阅' " :name="resouce.academic_name" :abstract="resouce.abstract" :subtitle="resouce.magazine" :academic_id="resouce._id" :create_time="resouce.create_time" :title="resouce.publish_category" :version="resouce.version_first+'.'+resouce.version_second" :authors="resouce.authors"></ReviewRes>
                 <ReviewRes v-if="flag===1" :review_status="resouce.review_status" :name="resouce.academic.academic_name" :abstract="resouce.academic.abstract" :subtitle="resouce.academic.magazine" :academic_id="resouce.academic._id" :create_time="resouce.create_time" :title="resouce.academic.publish_category" :version="resouce.academic.version_first+'.'+resouce.academic.version_second" :authors="resouce.academic.authors"></ReviewRes>
                </div>
             <el-pagination
      layout="prev, pager, next"
      :total=total
      :page-size=2
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
    </div>
    </div>
</template>

<script type="text/javascript">
import Ava from './Ava.vue'
import ReviewRes from './ReviewRes.vue'
export default {
  name: 'Review',
  data () {
    return {
      searchinput: '',
      resouces: [],
      currentPage: 1,
      total: 0,
      pageSize: 2,
      flag: 0
    }
  },
  components: {
    Ava,
    ReviewRes
  },
  created () {
    this.findall()
  },
  mounted () {
    this.flag = 0
    this.getReviews()
  },
  computed: {
    displayedResources () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.resouces.slice(start, end)
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    beforeRouteLeave (to, from, next) {
      sessionStorage.setItem('pageState', JSON.stringify(this.pageState))
      next()
    },
    beforeRouteEnter (to, from, next) {
      const pageState = JSON.parse(sessionStorage.getItem('pageState'))
      if (pageState) {
        this.pageState = pageState
      }
      next()
    },
    havent_review () {
      var formdata = new FormData()
      formdata.append('user_id', JSON.parse(sessionStorage.getItem('userinfo'))['_id'])
      // 发送axios请求
      this.$http.post('/api/find_review', formdata).then((res) => {
        console.log(res.data)
        this.resouces = res.data
        this.total = res.data.length
      }).catch(function (error) {
        console.log(error)
      })
      this.flag = 0
    },
    have_review () {
      this.flag = 1
      var formdata = new FormData()
      formdata.append('user_id', JSON.parse(sessionStorage.getItem('userinfo'))['_id'])
      // 发送axios请求
      this.$http.post('/api/reviewed', formdata).then((res) => {
        console.log(res.data)
        this.resouces = res.data
        this.total = res.data.length
      }).catch(function (error) {
        console.log(error)
      })
    },
    getReviews () {
      var formdata = new FormData()
      formdata.append('user_id', JSON.parse(sessionStorage.getItem('userinfo'))['_id'])
      // 发送axios请求
      this.$http.post('/api/all_review', formdata).then((res) => {
        console.log(res.data)
        this.resouces = res.data
        this.total = res.data.length
      }).catch(function (error) {
        console.log(error)
      })
    },
    findall () {
      this.$http.get('/api/find_user_public_category').then((res) => {
        let len = res.data.length
        for (let i = 0; i < len; i++) {
          let cat = {}
          cat.title = res.data[i].publish_category
          cat.subTitle = res.data[i].magazine
          this.categories.push(cat)
        }
        console.log(this.categories)
      })
    },
    searchclick () {
      alert('搜索内容为:' + this.searchinput)
    }
  }
}
</script>

<style scoped>
.body {
    height: 100vh;
    /* background-color: rgb(227, 75, 75); */
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
    background-color: rgb(255, 255, 255);
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
.addbtn{
  margin-left: 20px;
}

</style>
