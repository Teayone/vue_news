const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  productionSourceMap: false,
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:7000",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        },
      },
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
