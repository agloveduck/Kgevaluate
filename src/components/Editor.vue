<template>
  <div class="body">
        <div class="search">
            <h2 class="search_left">在线编辑</h2>
            <div class="Home">
              <el-link icon="el-icon-s-home"  href="#/home" >主页</el-link>
              <div class="addbtn">
                <el-button icon="el-icon-finished">保存</el-button>
              </div>
            </div>
            <div class="search_main">
            <Ava></Ava>
            </div>
        </div>
        <div class="main">
          <vue-editor v-model="content"
          @focus="onEditorFocus"
          @blur="onEditorBlur"
          @selection-change="onSelectionChange"
          />
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import Ava from './Ava.vue'
export default {
  components: { Ava,
    VueEditor},

  data: () => ({
    content: '<h1>Some initial content</h1>'
  }),
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },

    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },

    onSelectionChange (range) {
      console.log('selection change!', range)
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

.addbtn{
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
}
</style>
