<template>
    <div class="body">
        <div class="search">
            <h2 class="search_left">电子杂志管理中心</h2>
            <div class="Home">
              <el-link icon="el-icon-s-home"  href="#/home" >主页</el-link>
              <div class="addbtn">
                <Addbig :privateflag="privateflag"></Addbig>
                <Addsmall :categories="categories" :privateflag="privateflag"></Addsmall>
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
            <el-col :span="12" class="leftBar">
                <el-menu default-active="2" class="el-menu-vertical-demo"
                    background-color="rgb(85, 94, 99)" text-color="#fff" active-text-color="#fff">

                    <el-submenu v-for="(category,index) in categories" :key="index" :index="index+''"  @open="handleOpen" @close="handleClose">
                        <span slot="title">{{category.title}}</span>
                        <el-menu-item v-for="(subTitle,subIndex) in category.subTitle" :key="subIndex" :index="`${index}-${subIndex}`" @click="()=>myclick(index, subIndex)">
                            {{subTitle}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <div class="content">
                {{categories[contentValue.index].title}}
                {{categories[contentValue.index].subTitle[contentValue.subIndex]}}
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Ava from './Ava.vue'
import Addbig from './Addbig'
import Addsmall from './Addsmall.vue'
export default {
  name: 'ElectronicJournalCenter',
  data () {
    return {
      privateflag: 0, // 0代表创建公有的
      categories: [
        // {title: 'ACM期刊', subTitle: ['KDD', 'SIGIR']},
        // {title: 'ACM会议', subTitle: ['TOIS', 'JACM']},
        // {title: 'IEEE期刊', subTitle: ['PAMI', 'TKDE']}
      ],
      contentValue: {
        index: '0',
        subIndex: '0'
      },
      searchinput: ''
    }
  },
  components: {
    Ava,
    Addbig,
    Addsmall
  },
  created () {
    this.findall()
  },
  methods: {
    findall () {
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
        console.log(this.categories)
      })
    },
    myclick (index, subIndex) {
    //   alert(`${index}+${subIndex}`)
      this.contentValue = {index, subIndex}
    //   console.log(this.contentValue)
    },
    searchclick () {
      // alert('搜索内容为:' + this.searchinput)
      this.showinfo()
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
  }
}
</script>

<style scoped>
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
    background-color:rgb(85, 94, 99);
}

.content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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
