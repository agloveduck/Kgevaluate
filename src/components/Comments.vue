<!-- eslint-disable brace-style -->
<template>
    <div class="body">
        <div class="search">
            <h2 class="search_left">资源评论页</h2>
            <div class="Home">
              <el-link icon="el-icon-back"  @click="goBack">返回</el-link>
            </div>
            <div class="search_main">
                <el-input placeholder="请输入您要查询的内容" v-model="searchinput" >
                    <i slot="suffix" class="el-input__icon el-icon-search"  @click="searchclick"></i>
                </el-input>
            </div>
            <Ava></Ava>
        </div>
        <div class="main">
          <Comment :academic_id=academic_id></Comment>
    </div>
    </div>
</template>

<script>
import Ava from './Ava.vue'
import Comment from './Comment.vue'
export default {
  name: 'Comments',
  components: {
    Ava,
    Comment
  },
  data () {
    return {
      searchinput: '',
      academic_id: ''
    }
  },
  created () {
    console.log(this.$route.params.academic_id)
    this.academic_id = this.$route.params.academic_id
  },
  methods: {
    goBack () {
      this.$router.back()
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
.addbtn{
  margin-left: 20px;
}

</style>
