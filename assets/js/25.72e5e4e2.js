(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{152:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"babel-polyfill-笔记"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#babel-polyfill-笔记","aria-hidden":"true"}},[t._v("#")]),t._v(" babel-polyfill 笔记")]),t._v(" "),s("p",[t._v("Babel 处于构建时转译出来的结果在默认情况下并不包括 ES6 对运行时的扩展。")]),t._v(" "),s("p",[t._v("例如，builtins（内建，包括 Promise、Set、Map 等）、内建类型上的原型扩展（如 ES6 对 Array、Object、String 等内建类型原型上的扩展）以及 Regenerator（用于 generators / yield）等都不包括在内。")]),t._v(" "),s("p",[t._v("简单的说就是 babel 默认只转译 新语法，不转译新 api。")]),t._v(" "),s("h2",{attrs:{id:"core-js-标准库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#core-js-标准库","aria-hidden":"true"}},[t._v("#")]),t._v(" core-js 标准库")]),t._v(" "),s("p",[t._v("这是所有 Babel polyfill 方案都需要依赖的开源库。它提供了 ES5、ES6 的 polyfills。")]),t._v(" "),s("p",[s("strong",[t._v("如果使用了 babel-runtime、babel-plugin-transform-runtime 或者 babel-polyfill，你就间接的引入了 core-js 标准库。")])]),t._v(" "),s("h2",{attrs:{id:"regenerator-运行时库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#regenerator-运行时库","aria-hidden":"true"}},[t._v("#")]),t._v(" regenerator 运行时库")]),t._v(" "),s("p",[t._v("这是 Facebook 提供的 facebook/regenerator 库，用来实现 ES6/ES7 中 generators、yield、async 及 await 等相关的 polyfills。")]),t._v(" "),s("p",[s("strong",[t._v("如果使用了 babel-runtime、babel-plugin-transform-runtime 或者 babel-polyfill，你就间接的引入了 regenerator-runtime 运行时库（非必选）。")])]),t._v(" "),s("h2",{attrs:{id:"babel-runtime-库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#babel-runtime-库","aria-hidden":"true"}},[t._v("#")]),t._v(" babel-runtime 库")]),t._v(" "),s("p",[t._v("这是由 Babel 提供的 polyfill 库，它本身就是由 core-js 与 regenerator-runtime 库组成，除了做简单的合并与映射外，并没有做任何额外的加工。")]),t._v(" "),s("p",[t._v("所以在使用时，需要自己去 require。由于使用方式十分繁琐，事实上严谨的使用还要配合 interopRequireDefault() 方法使用，所以 Babel 提供了一个插件，即 babel-plugin-transform-runtime。")]),t._v(" "),s("h2",{attrs:{id:"babel-plugin-transform-runtime-插件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#babel-plugin-transform-runtime-插件","aria-hidden":"true"}},[t._v("#")]),t._v(" babel-plugin-transform-runtime 插件")]),t._v(" "),s("p",[t._v("这个插件让 Babel 发现代码中使用到 Symbol、Promise、Map 等新类型时，自动且按需进行 polyfill。")]),t._v(" "),s("p",[t._v("如果正在开发一个 library 的话，建议使用这种方案，因为没有全局变量和 prototype 污染。")]),t._v(" "),s("h3",{attrs:{id:"全局变量污染"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局变量污染","aria-hidden":"true"}},[t._v("#")]),t._v(" 全局变量污染")]),t._v(" "),s("p",[t._v("如果使用了 Symbol 和 Promise，这个插件不会在 Global 对象下挂在全局的 Symbol 和 Promise 变量。这样一来，如果引入的其他类库使用了 bluebird 之类的第三方 polyfill 也不会受此影响。")]),t._v(" "),s("h3",{attrs:{id:"prototype-污染"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prototype-污染","aria-hidden":"true"}},[t._v("#")]),t._v(" prototype 污染")]),t._v(" "),s("p",[t._v("ES6 的 Array、String 等内建类型扩展了很多新方法，如 Array 原型上的 includes()、filter() 等新方法，babel-plugin-transform-runtime 插件是不会进行扩展修改的。"),s("strong",[t._v("但 "),s("code",[t._v("Array.from")]),t._v(" 等静态方法（也有人称类方法）还是会被插件 polyfill 的。")])]),t._v(" "),s("h4",{attrs:{id:"es6-代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es6-代码","aria-hidden":"true"}},[t._v("#")]),t._v(" es6 代码")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" sym "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("Symbol")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" promise "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{attrs:{class:"token class-name"}},[t._v("Promise")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nconsole"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("log")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Symbol"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("iterator"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h4",{attrs:{id:"转译后的代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#转译后的代码","aria-hidden":"true"}},[t._v("#")]),t._v(" 转译后的代码")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token string"}},[t._v("'use strict'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" _getIterator2 "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("require")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'babel-runtime/core-js/get-iterator'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" _getIterator3 "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("_interopRequireDefault")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("_getIterator2"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" _promise "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("require")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'babel-runtime/core-js/promise'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" _promise2 "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("_interopRequireDefault")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("_promise"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" _symbol "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("require")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'babel-runtime/core-js/symbol'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" _symbol2 "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("_interopRequireDefault")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("_symbol"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("_interopRequireDefault")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" obj "),s("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" obj"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("__esModule "),s("span",{attrs:{class:"token operator"}},[t._v("?")]),t._v(" obj "),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("default")]),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" obj "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" sym "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token number"}},[t._v("0")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" _symbol2"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token keyword"}},[t._v("default")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" promise "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{attrs:{class:"token class-name"}},[t._v("_promise2"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nconsole"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("log")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token number"}},[t._v("0")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" _getIterator3"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token keyword"}},[t._v("default")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"babel-polyfill"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#babel-polyfill","aria-hidden":"true"}},[t._v("#")]),t._v(" babel-polyfill")]),t._v(" "),s("p",[t._v("它的初衷是模拟（emulate）一整套 ES2015+ 运行时环境，所以它的确会以全局变量的形式 polyfill Map、Set、Promise 之类的类型，也的确会以类似 "),s("code",[t._v("Array.prototype.includes()")]),t._v(" 的方式去注入污染原型。")]),t._v(" "),s("p",[t._v("使用方法很简单。将 babel-polyfill 一次性的引入到的工程中，通常是和其他的第三方类库（如 jQuery、React 等）一同打包在 vendor.js 中即可")]),t._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("ul",[s("li",[t._v("babel-polyfill：需要在自己的代码中手工引入。存在全局污染、prototype 污染。适合于开发独立的业务应用。")]),t._v(" "),s("li",[t._v("babel-plugin-transform-runtime：需要在 .babelrc 或 Babel 编译选项中将该插件添加到 plugins 中。插件只会 polyfill 用到的类或方法。适合于开发第三方类库。")])])])}],!1,null,null,null);e.options.__file="babel-polyfill笔记.md";a.default=e.exports}}]);