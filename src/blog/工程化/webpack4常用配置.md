# webpack4 常用配置

```js
module.exports = {
  mode: 'production', // production | development | none

  entry: './app/entry', // string | object | array

  output: {
    // 如何输出结果的相关选项

    path: path.resolve(__dirname, 'dist'), //string
    // 所有输出文件的目标路径
    // 必须是绝对路径

    filename: 'bundle.js', //string
    // 每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下

    publicPath: '/assets', //string
    // 输出解析文件的目录，url 现对于 html 页面

    library: 'mylib', //string
    // 导出库的名称

    libraryTarget: 'umd', //通用模块定义
    // 导出库的类型
    //配合 library 将产生以下输出
    // define("mylib", [], function() {
    //     return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
    // });

    chunkFilename: '[id].js',
    chunkFilename: '[chunkhash].js' //长效缓存
    // 这些文件名需要在 runtime 根据 chunk 发送的请求去生成。
  },

  module: {
    // 模块配置

    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, '/node_modules')],
        // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
        // test 和 include 具有相同的作用，都是必须匹配选项
        // exclude 是必不匹配选项（优先于 test 和 include）
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include

        enforce: 'pre',
        // 标识应用这些规则，即使规则覆盖

        loader: 'babel-loader',
        // 应该使用用的 loader，它相对上下文解析
        // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的

        options: {
          presets: ['es2015']
        }
        // loader 的可选项
      },

      {
        test: /\.html$/,

        use: [
          // 使用多个 loader
          'htmllint-loader',
          {
            loader: 'html-loader',
            options: {}
          }
        ]
      }
    ]
  },

  resolve: {
    // 解析模块请求的选项
    // （不适用于对 loader 解析）

    modules: ['node_modules', path.resolve(__dirname, 'src')],
    // 用于查找模块的目录

    extensions: ['.js', '.json', '.css'],
    // 自动解析确定的扩展

    alias: {
      // 模块别名列表，确保模块引入变得更简单

      vue: 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    }
  },

  performance: {
    // 如何展示性能提示
  },

  devtool: 'source-map', //string | false
  // 控制是否生成，以及如何生成 source map

  context: path.resolve(__dirname, 'src'), //string
  // 基础目录，用于从配置中解析入口起点(entry point)和 loader

  target: 'web',
  // 构建目标

  externals: {
    jquery: 'jQuery'
  },
  // 不要打包这些模块，而是在运行时从环境中请求他们

  stats: 'errros-only',
  // 精确控制要显示的 bundle 信息

  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },

    host: '0,0,0,0',

    port: '8888',

    contentBase: path.join(__dirname, 'public'),
    // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。默认情况下，将使用当前工作目录作为提供内容的目录。

    lazy: true,
    //dev-server 只有在请求时才编译包(bundle),默认开启

    historyApiFallback: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/views/landing.html' },
        { from: /^\/subpage/, to: '/views/subpage.html' },
        { from: /./, to: '/views/404.html' }
      ]
    },
    // 使用 rewrites 可进一步控制

    hot: true
    // 需要 HotModuleReplacementPlugin
  },

  plugins: [
    // webpack-dev-server 强化插件
    new DashboardPlugin(), //非自带
    new webpack.HotModuleReplacementPlugin() //自带
  ]
};
```
