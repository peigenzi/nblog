# webpack4 笔记

## 模式

`development` 模式下，默认开启了 `NamedChunksPlugin` 和 `NamedModulesPlugin`。提供了更完整的错误信息。

`production` 模式下，代码会自动分割、压缩，同时也会 `scope hoisting` 和 `tree-shaking`。

## 默认分包策略

webpack 4 最大的改动就是废除了 `CommonsChunkPlugin` 引入了 `optimization.splitChunks`。

它的默认分割策略如下：

- 新的 chunk 是否被共享或者是来自 node_modules 的模块
- 新的 chunk 体积在压缩之前是否大于 30kb
- 按需加载 chunk 的并发请求数量小于等于 5 个
- 页面初始加载时的并发请求数量小于等于 3 个

**不同的业务，优化的侧重点是不同的。**

## 优化分包策略

以后台管理系统为例，可以按照体积大小、共用率、更新频率重新划分包，使其尽可能的利用浏览器缓存。

| 类型          | 共用率 | 使用频率 | 更新频率 | 例子                   |
| :------------ | :----- | :------- | :------- | :--------------------- |
| 基础类库      | 高     | 高       | 低       | vue,axios              |
| ui 组件库     | 高     | 高       | 中       | element-ui             |
| 必要组件/函数 | 高     | 高       | 中       | Header 组件,utils 函数 |
| 低频组件      | 低     | 低       | 低       | 富文本,echarts         |
| 业务代码      | 低     | 高       | 高       | 业务页面               |

### 基础类库 chunk-libs

升级频率都不高，但每个页面都需要它们。

### ui 组件库 chunk-ui

比较大，并且不时的会升级 UI 组件库。

### 自定义组件/函数

- 必要：比如路由表、全局 state、全局侧边栏/Header/Footer 等组件，即入口文件中依赖的东西。都会默认打包到 app.js 中。
- 非必要：被大部分页面使用，但在入口文件 entry 中未被引入的模块。比如封装的 select 或者 table 组件。有十个页面引用了它，就会包重复打包十次。所以应该将那些被大量共用的组件单独打包成 chunk-commons

### 低频组件

只会在一些特定业务场景下使用。大于 30kb 时，webpack 4 会默认打包成一个独立的 bundle。也无需特别处理。小于 30kb 的情况下会被打包到具体使用它的页面 bundle 中。

### 业务代码

一般都是按照页面的划分来打包。

**配置**

```js
splitChunks: {
  chunks: "all",
  cacheGroups: {
    libs: {
      name: "chunk-libs",
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      chunks: "initial" // 只打包初始时依赖的第三方
    },
    elementUI: {
      name: "chunk-elementUI", // 单独将 elementUI 拆包
      priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
      test: /[\\/]node_modules[\\/]element-ui[\\/]/
    },
    commons: {
      name: "chunk-commons",
      test: resolve("src/components"), // 可自定义拓展你的规则
      minChunks: 2, // 最小共用次数
      priority: 5,
      reuseExistingChunk: true
    }
  }
};
```

## mini-css-extract-plugin

用于提取 css，并且在代码分割时会将原来内联写在每个 js chunk 中的 css 单独拆成一个个 css 文件。

它并没有帮我们做代码压缩，这时候需要使用 `optimize-css-assets-webpack-plugin` 这个插件。

## 几种 hash

- hash：和每次 `build` 有关，没有任何改变的情况下，每次编译出来的 `hash` 都是一样的，但改变了一点东西，它的 `hash` 就会发生改变。
- chunkhash：根据具体每个模块文件自己的内容包括它的依赖计算所得的，所以某个文件的改动只会影响它所在 chunk 的 hash。
- contenthash：它的出现主要是为了解决，让 css 文件不受 js 文件的影响。比如 foo.css 被 foo.js 引用了，所以它们共用相同的 chunkhash 值。但这样子是有问题的，如果 foo.js 修改了代码，css 文件就算内容没有任何改变，由于是该模块的 hash 发生了改变，其 css 文件的 hash 也会随之改变。
  contenthash 保证即使 css 文件所处的模块里有任何内容的改变，只要 css 文件内容不变，那么它的 hash 就不会发生变化。**可以简单理解为是 moduleId + content 所生成的 hash。**

## RuntimeChunk(manifest)

webpack 4 提供了 runtimeChunk 能让我们方便的提取 manifest。

```js
{
  runtimeChunk: true;
}
```

它的作用是将包含 chunks 映射关系的 list 单独从 app.js 里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，所以你每次改动都会影响它，如果不将它提取出来的话，等于 app.js 每次都会改变。缓存就失效了。

其实打包生成的 runtime.js 非常的小。所以建议不要将它单独拆包，而是将它内联到 index.html 之中(index.html 本来每次打包都会变)。

```js
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

// 注意一定要在HtmlWebpackPlugin之后引用
// inline 的 name 和你 runtimeChunk 的 name 保持一致
new ScriptExtHtmlWebpackPlugin({
  //`runtime` must same as runtimeChunk name. default is `runtime`
  inline: /runtime\..*\.js$/
});
```

## Module vs Chunk

- chunk：是指代码中引用的文件（如：js、css、图片等）会根据配置合并为一个或多个包，我们称一个包为 chunk。
- module：是指将代码按照功能拆分，分解成离散功能块。拆分后的代码块就叫做 module。可以简单的理解为一个 export/import 就是一个 module。

webpack 内部维护了一个自增的 id，每个 module 都有一个 id。所以当增加或者删除 module 的时候，id 就会变化，导致其它文件虽然没有变化，但由于 id 被强占，只能自增或者自减，导致整个 id 的顺序都错乱了。

**每个 chunk 包可含多个 module。**

## 持久化缓存

moduleId 顺序的错乱会导致所有 chunk 内容的变化。从而让 chunk 的缓存都失效。

解决方案：

- 内联 manifest
- 使用 `HashedModuleIdsPlugin` 固定 `moduleId`
- 使用 `NamedChunkPlugin` 结合自定义 nameResolver 来固定 `chunkId`

## speed-measure-webpack-plugin

可以监控每步操作耗时的插件。

## Tree-Shaking

这个功能是基于 `ES6 modules` 的静态特性检测。

ES6 module 特点：

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable 的

ES6 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础。

为了不影响功能，tree-shaking 只处理函数和顶层的 import/export 变量，不能把没用到的类的方法消除掉。

使用 babel 插件 `babel-preset-env` 时，它默认会将模块打包成 commonjs，这样就会让 tree-shaking 失效了。需要修改配置。

```json
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]
}
```
