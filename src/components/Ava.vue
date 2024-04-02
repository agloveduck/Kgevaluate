<template>
     <div class="ava">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <div style="white-space: nowrap;">
                     {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="exit">退出</el-dropdown-item>
                <el-dropdown-item command="b">其它功能</el-dropdown-item>
                 </el-dropdown-menu>
              </el-dropdown>
            </div>
</template>
<script>
export default {
  name: 'Ava',
  data () {
    return {
      // eslint-disable-next-line no-undef
      name: JSON.parse(sessionStorage.getItem('userinfo'))['user_name']
    }
  },
  components: {
  },
  methods: {// 定义方法
    exitclick () {
      this.$http.get('/api/logout').then((res) => {
        sessionStorage.clear()// 清除sessionStorage
        console.log('退出')
        this.$router.push('/Login')// 切换路由
      })
    },
    handleCommand (command) { // 扩充用
      if (command === 'exit') {
        this.exitclick()
      } else {
        alert(this.name)
      }
    }
  }
}
</script>
<style scoped>
.ava{
  /* height: 100px; */
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
