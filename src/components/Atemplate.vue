<template>
    <div class="resource">
        <div class="con1">
            <div class="title">
                <h2>【{{name}}】简介:</h2>
            </div>
            <div class="content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{abstract}}</div>
            <div class="others">
                <Showtemplate :academic_id=academic_id :filename=name></Showtemplate>
                <h3>创建时间:{{ create_time }} 上传者:{{authors}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
import Showtemplate from './Showtemplate.vue'
export default {
  name: 'Atemplate',
  props: ['name', 'abstract', 'academic_id', 'create_time', 'authors'],
  components: {
    Showtemplate
  },
  data () {
    return {
      user_role: JSON.parse(sessionStorage.getItem('userinfo'))['user_role']
    }
  },
  methods: {
  }
}

</script>
<style scoped>
.resource{
    border: 2px solid #409EFF;
    width: 600px;
    height: 320px;
    margin:30px 0;
    display: flex;
    justify-content: flex-start;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.con1{
    width: 600px;
    height: 318px;
     /*实现垂直居中*/
    align-items: center;
  /*实现水平居中*/
    justify-content: center;
    position: relative;
    background-color: rgb(255, 255, 255);
}
.others{
    /* border: 1px solid rgb(224, 200, 232); */
    width: 600px;
    height: 80px;
     /*实现垂直居中*/
    align-items: center;
  /*实现水平居中*/
    justify-content: center;
    position: relative;
}
.others h3 {
  bottom: 0;
  font-size: smaller; /* or you can use a specific font size value, like 14px */
  color: gray;
  text-align: center;
}
.content{
    width: 600px;
    height: 200px;
    /* background-color: #c0ddf9; */
    text-align: left;
    font-size: 18px;
    font-family: "Kaiti";
    color: #369cfc;
}
.title{
    position: relative;
    width: 600px;
    height: 40px;
}
.title h2 {
  position: absolute;
  top: 0;
  left: 0;
  margin:2px
}
</style>
