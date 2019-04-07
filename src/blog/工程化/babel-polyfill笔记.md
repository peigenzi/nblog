# babel-polyfill 笔记

Babel 处于构建时转译出来的结果在默认情况下并不包括 ES6 对运行时的扩展。

例如，builtins（内建，包括 Promise、Set、Map 等）、内建类型上的原型扩展（如 ES6 对 Array、Object、String 等内建类型原型上的扩展）以及 Regenerator（用于 generators / yield）等都不包括在内。

简单的说就是 babel 默认只转译 新语法，不转译新 api。

## core-js 标准库

这是所有 Babel polyfill 方案都需要依赖的开源库。它提供了 ES5、ES6 的 polyfills。

**如果使用了 babel-runtime、babel-plugin-transform-runtime 或者 babel-polyfill，你就间接的引入了 core-js 标准库。**

## regenerator 运行时库

这是 Facebook 提供的 facebook/regenerator 库，用来实现 ES6/ES7 中 generators、yield、async 及 await 等相关的 polyfills。

**如果使用了 babel-runtime、babel-plugin-transform-runtime 或者 babel-polyfill，你就间接的引入了 regenerator-runtime 运行时库（非必选）。**

## babel-runtime 库

这是由 Babel 提供的 polyfill 库，它本身就是由 core-js 与 regenerator-runtime 库组成，除了做简单的合并与映射外，并没有做任何额外的加工。

所以在使用时，需要自己去 require。由于使用方式十分繁琐，事实上严谨的使用还要配合 interopRequireDefault() 方法使用，所以 Babel 提供了一个插件，即 babel-plugin-transform-runtime。

## babel-plugin-transform-runtime 插件

这个插件让 Babel 发现代码中使用到 Symbol、Promise、Map 等新类型时，自动且按需进行 polyfill。

如果正在开发一个 library 的话，建议使用这种方案，因为没有全局变量和 prototype 污染。

### 全局变量污染

如果使用了 Symbol 和 Promise，这个插件不会在 Global 对象下挂在全局的 Symbol 和 Promise 变量。这样一来，如果引入的其他类库使用了 bluebird 之类的第三方 polyfill 也不会受此影响。

### prototype 污染

ES6 的 Array、String 等内建类型扩展了很多新方法，如 Array 原型上的 includes()、filter() 等新方法，babel-plugin-transform-runtime 插件是不会进行扩展修改的。**但 `Array.from` 等静态方法（也有人称类方法）还是会被插件 polyfill 的。**

#### es6 代码

```js
const sym = Symbol();

const promise = new Promise();

console.log(arr[Symbol.iterator]());
```

#### 转译后的代码

```js
'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var sym = (0, _symbol2.default)();

var promise = new _promise2.default();

console.log((0, _getIterator3.default)(arr));
```

## babel-polyfill

它的初衷是模拟（emulate）一整套 ES2015+ 运行时环境，所以它的确会以全局变量的形式 polyfill Map、Set、Promise 之类的类型，也的确会以类似 `Array.prototype.includes()` 的方式去注入污染原型。

使用方法很简单。将 babel-polyfill 一次性的引入到的工程中，通常是和其他的第三方类库（如 jQuery、React 等）一同打包在 vendor.js 中即可

## 总结

- babel-polyfill：需要在自己的代码中手工引入。存在全局污染、prototype 污染。适合于开发独立的业务应用。
- babel-plugin-transform-runtime：需要在 .babelrc 或 Babel 编译选项中将该插件添加到 plugins 中。插件只会 polyfill 用到的类或方法(即一些实例方法没法使用)。适合于开发第三方类库。
