<template>
  <div id="app">
    <!-- <a href="#/home">主页</a>
    <a href="#/JournalCenter">电子杂志中心</a>
    <a href="#/ElectronicJournalCenter">电子杂志管理中心</a> -->
  <!-- 用来展示路由 -->
    <router-view/>
  </div>
</template>

<script>
// woshishishssiizhedoumeiyis
export default { // es6语法 暴露组件对象
  name: 'App'

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
