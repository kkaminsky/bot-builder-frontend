module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8085, // CHANGE YOUR PORT HERE!
    https: true,
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        changeOrigin: true,
        pathRewrite: {
          "/api": ""
        }
      }
    }
  }
}
