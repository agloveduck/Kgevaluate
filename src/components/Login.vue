<template>
    <div>
        <!-- <el-button :plain="true" @click="open4">错误</el-button> -->
        <div class="intro-container">
  <h2 class="intro-title"> 图谱质量评估系统</h2>
  <p class="intro-content"><span class="intro-quote">“</span>我们的图谱质量评估系统旨在为用户提供一个可靠的平台，帮助他们评估、改进和维护他们的知识图谱数据的质量。作为一个基于上传实体关系三元组文件的平台，我们提供了一个简单易用的界面，让用户能够轻松地上传他们的数据，并且经过专家审核后进行修改或删除。这一审核过程确保了图谱数据的准确性和可信度。<span class="intro-quote">“</span></p>
       </div>
        <div class="login-wrap">
      <el-form  v-if="showLoginPanel" class="login-container">
        <h1 class="title">User Login</h1>
        <el-form-item >
          <el-input type="text" v-model="usernameinput"  placeholder="Username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input type="password" v-model="passwordinput" placeholder="Password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doLogin" style="width: 100%;">Login</el-button>
        </el-form-item>
        <el-row style="text-align: center;margin-top: -10px;">
            <el-link type="primary"  @click="showRegisterPanel = true,showLoginPanel=false">注册账号</el-link>
        </el-row>
      </el-form>
      <el-form v-if="showRegisterPanel" class="login-container">
  <h1 class="title">User Register</h1>
  <el-form-item >
    <el-input type="text" v-model="username"  placeholder="Username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input type="text" v-model="login_name"  placeholder="Login Name" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input type="text" v-model="email"  placeholder="Email" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input type="password" v-model="password" placeholder="Password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="doRegister">Register</el-button>
  </el-form-item>
  <el-row style="text-align: center;margin-top: -10px;">
            <el-link type="primary"  @click="showRegisterPanel = false,showLoginPanel=true">已有账号,去登录</el-link>
        </el-row>
</el-form>

      </div>
  </div>
  </template>

<script>

export default { // es6语法 暴露组件对象
  name: 'Login',
  data () {
    return {
      usernameinput: '',
      passwordinput: '',
      showRegisterPanel: false,
      showLoginPanel: true,
      username: '',
      login_name: '',
      email: '',
      password: '',
      user_role: '普通用户'
    }
  },
  methods: {
    erroropen () {
      this.$message({
        showClose: true,
        message: '用户名或密码错误',
        type: 'error'
      })
    },
    successopen () {
      this.$message({
        message: '登录成功',
        type: 'success'
      })
    },
    doLogin () {
      console.log('用户名:' + this.usernameinput + '密码:' + this.passwordinput)
      var formdata = new FormData()
      formdata.append('login_name', this.usernameinput)
      formdata.append('password', this.passwordinput)
      // 发送axios请求
      this.$http.post('/api/login', formdata).then((res) => {
        console.log(res.data)
        if (res.data === '用户名或密码错误') {
          this.erroropen()
        } else {
          this.$http.get('/api/get_user').then((res) => {
            sessionStorage.clear()// 清除sessionStorage
            sessionStorage.setItem('userinfo', JSON.stringify(res.data[0]))
            console.log(sessionStorage.getItem('userinfo'))
            this.successopen() // 显示登录成功
            this.$router.push('/Home')// 切换路由
          })
        }
      })
    },
    doRegister () {
      const formdata = new FormData()
      formdata.append('user_name', this.username)
      formdata.append('login_name', this.login_name)
      formdata.append('email', this.email)
      formdata.append('password', this.password)
      formdata.append('user_role', this.user_role)

      this.$http.post('/api/create_user', formdata)
        .then(() => {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.showRegisterPanel = false // 隐藏注册面板
        })
        .catch(() => {
          this.$message({
            message: '注册失败',
            type: 'error'
          })
        })
      var formdata2 = new FormData()
      formdata2.append('login_name', this.login_name)
      formdata2.append('password', this.password)
      // 发送axios请求
      this.$http.post('/api/login', formdata2).then((res) => {
        this.$http.get('/api/get_user').then((res) => {
          sessionStorage.clear()// 清除sessionStorage
          sessionStorage.setItem('userinfo', JSON.stringify(res.data[0]))
          console.log(sessionStorage.getItem('userinfo'))
          this.successopen() // 显示登录成功
          this.$router.push('/Home')// 切换路由
        })
      })
    }

  }

}
</script>

<style scoped>
.intro-container {
  margin: 20px;
  text-align: justify;
}

.intro-title {
  text-align: center;
}

.intro-content {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 0;
  line-height: 1.8;
}

.intro-quote {
  display: inline-block;
  margin-right: 10px;
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
}

.login-wrap {
    background-image: url('../assets/bk.jpeg'); /* Change the path to your image */
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover; /* Ensure the background image covers the entire screen */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh; /* Set the height to 100% of the viewport height */
}

.login-container {
    border-radius: 10px;
    margin: 0px auto;
    width: 50%;
    padding: 2.5em;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
    margin-top: 0;
    margin-bottom: 1em;
    text-align: center;
    color: #505458;
    font-size: 2em;
    line-height: 1;
}

.el-input {
    margin-bottom: 1.5em;
}

.el-button {
    width: 100%;
}
</style>
