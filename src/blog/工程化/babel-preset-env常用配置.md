# babel-preset-env 常用配置

官方说明中提到这是一款可以“自动”决定加载哪些插件和 polyfill 的 preset。

## targets 选项

指定需要兼容的浏览器类型和版本。

```json
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7"]
        }
      }
    ]
  ]
}

//开发 Node.js 应用，指定 node 版本
{
  "presets": [
    ["env", {
      "targets": {
        "node": "6.10"
      }
    }]
  ]
}
```

可以通过指定更高的浏览器版本来减少插件和 polyfill 的代码量，并且直接使用原生 ES6 的新特性，特别适合 Electron 及移动端 App 或者那些已指定了浏览器的内网应用程序。

## modules

指定模块化方式。

它默认会将模块打包成 commonjs。使用 es6 时推荐将 modules 设置为 false。可以通过 tree-shaking 减小打包后代码大小。

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

## useBuiltlns 与 Polyfill

这是一个关于 Polyfill 的选项。首先仍然需要额外安装 babel-polyfill。**babel7 中它可以有三个值**，**babel6 中它的值是 Boolean 类型的**。

使用时出现的问题。

```js
babel6 和 babel-polyfill 时，值为 true，会根据环境引入包。

babel7 和 babel-polyfill 时，usage 会按需引入，entry 只会 require('babel-polyfill')

babel7 和 @babel/polyfill 时， usage 会按需引入，entry 会根据环境引入包。
```

### false 默认

> to indicate no polyfill。

### usage 选项

> to import only used polyfills per file

当 useBuiltIns 设置为 usage 时，Babel 会在你使用到 ES2015+ 新特性时，自动添加 babel-polyfill 的引用，并且是 partial 级别的引用。

**这个时候应用中不需要手动引入 babel-polyfill。**

```json
{
  "presets": [
    [
      "env",
      {
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

in

```js
var a = new Promise();
var b = new Map();
```

out

```js
// 环境不支持
import 'core-js/modules/es6.promise';
import 'core-js/modules/es6.map';
var a = new Promise();
var b = new Map();

// 支持
var a = new Promise();
var b = new Map();
```

### entry 选项

> to indicate replacing the entry polyfill

一次性引入 babel-polyfill，但输出时 babel 会自动优化。**根据浏览器环境**

in

```js
// 整个应用中使用一次
import 'babel-polyfill';
```

out

```js
import 'core-js/modules/es7.string.pad-start';
import 'core-js/modules/es7.string.pad-end';
```
