module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/_variable.scss";` //引入全局变量   
      }
    }
  }
}
