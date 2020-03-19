/* eslint-disable no-irregular-whitespace */
// 打包去掉console
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  //https://github.com/vuejs/vue-cli/tree/dev/docs/zh/config
  // 项目部署的基础路径,我们默认假设你的应用将会部署在域名的根部，比如 https://www.my-app.com/
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist", //Default: 'dist'
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "./assets", //Default: ''
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: "index.html", //Default: 'index.html'
  filenameHashing: true, //Default: true
  // 是否在保存的时候使用 eslint-loader 进行检查。
  // 有效的值：true | false | "error"设置为 "error" 时，检查出的错误会触发编译失败。
  lintOnSave: false, //Default: true
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右
  runtimeCompiler: true, //Default: false
  //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [
    /* string or RegExp */
  ], //Default: []
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false, //Default: true
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  crossorigin: "", //Default: undefined
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false, //Default: false
  // 对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
  },
  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。Type: Object | Function
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      return {
        // 打包去掉console 必须引入TerserPlugin
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        },
        // 关闭 webpack 的性能提示
        performance: {
          hints: false
        }
      };
    } else {
      // 为开发环境修改配置...
      return;
    }
  },
  // / 构建多页时使用Default: undefined
  pages: undefined,
  // CSS 相关选项
  css: {
    // 项目package.json查看@vue/cli-service版本号进行配置
    // v3用modules v4用requireModuleExtension
    //https://github.com/vuejs/vue-cli/blob/dev/docs/zh/guide/css.md#css-modules
    // 如果你想去掉文件名中的 .module，可以设置 vue.config.js 中的 css.requireModuleExtension 为 false
    requireModuleExtension: true,
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    extract: true, //Default: 生产环境下是 true，开发环境下是 false
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`,
      }
    } //Default: {}
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
  },
  // 配置 webpack-dev-server。
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8088,
    https: false,
    hotOnly: true,
    proxy: null // 设置代理 string | Object
    // proxy: {
    // "/api": {
    // // 目标:指向网络地址
    // target: "https://api.douban.com",
    // // webpack属性，映射一个host
    // changeOrigin: true,
    // pathRewrite: {
    // "/api": ""
    // }
    // }
    // },
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require("os").cpus().length > 1, //Default: require('os').cpus().length > 1
  // PWA插件传递选项。
  // https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {
    // 配置页面icon 默认值
    // iconPaths: {
    // favicon32: 'img/icons/favicon-32x32.png',
    // favicon16: 'img/icons/favicon-16x16.png',
    // appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
    // maskIcon: 'img/icons/safari-pinned-tab.svg',
    // msTileImage: 'img/icons/msapplication-icon-144x144.png'
    // }
  },
  // 三方插件的选项
  pluginOptions: {
    // ...
  }
};
