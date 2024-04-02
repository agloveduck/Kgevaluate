module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Acadamic Online v1.0.0' // 修改页面标题
      args[0].hash = true // 添加hash值到文件名中
      return args
    })
  },
  outputDir: 'dist-v1.0.0' // 修改输出目录名
}

