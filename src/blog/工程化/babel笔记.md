# babel 笔记

## 几种配置方式

### babel.config.js

```js
module.exports = function () {
  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

### .babelrc

```json
{
  "presets": [...],
  "plugins": [...]
}
```

### package.json

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```

### .babelrc.js

```js
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
```

## 配置项

- plugins: babel 的插件，在 6.x 版本之后 babel 必需要配合插件来进行工作
- presets: babel 插件集合的预设，包含某一部分的插件 plugin

### 运行顺序

- plugins 会运行在 Preset 之前
- plugins 会从第一个开始顺序执行
- presets 的顺序则刚好相反(从最后一个逆序执行)

## babel 7 与 babel 6

babel 7 移除了 `stage-x` 插件。stage-x 插件原本是对应于 ECMA Script 提案中的不同阶段，每个阶段有不同特性。

经常看到的 babel-preset-stage-0，其实就是这样的：

```js
module.exports = {
  presets: [require('babel-preset-stage-1')],
  plugins: [
    require('babel-plugin-transform-do-expressions'),
    require('babel-plugin-transform-function-bind')
  ]
};
```

每个 stage 插件都会包含下一阶段的所有插件，这就导致大家为了能用上大多数特性，纷纷采用了 babel-preset-stage-0，React 项目中，经常看到的 babelrc 配置是这样的：

```json
{
  "presets": ["es2015", "react", "stage-0"]
}
```

然而，提案一直在变，如今是 stage 0 的特性，可能之后就进入到了 stage 1，也可能之后直接被否决抛弃掉，并不会进入到 ES 规范中。那么 babel 是不是应该更新这些 stage 插件呢？如果更新了，现阶段大量前端项目会不会突然发现就编译不了某个特性了呢？

所以 babel 7 中废弃了 stage-x。需要开发者自己加上需要的插件，每个插件对应一个提案中的特性，这样项目中的配置也能更清晰。

## 配置升级

项目中 babel 配置升级的方案就是把之前的 `es2015` 换成 `env`，`stage-x` 换成各种 `proposal-xxx`。
例如一个 React 项目：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": ["@babel/proposal-class-properties"] //箭头函数被当作成class的属性来看待
  //插件在原来是包含在stage-3里面的，现在，就需要单独引入。
}
```
