const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: process.env.VUE_APP_CISM_API
  },
  css:                   {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/_variables.scss";',
      },
    },
  },
})
