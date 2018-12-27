(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{161:function(t,s,n){"use strict";n.r(s);var a=n(0),o=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"找到任意组件实例的方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#找到任意组件实例的方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 找到任意组件实例的方法")]),t._v(" "),n("p",[t._v("findComponents 系列方法最终都是返回组件的实例，进而可以调用或读取组件的方法和数据。")]),t._v(" "),n("h2",{attrs:{id:"使用场景："}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用场景：","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用场景：")]),t._v(" "),n("ul",[n("li",[t._v("由一个组件，向上找到最近的指定组件")]),t._v(" "),n("li",[t._v("由一个组件，向上找到所有指定的组件")]),t._v(" "),n("li",[t._v("由一个组件，向下找到最近的指定组件")]),t._v(" "),n("li",[t._v("由一个组件，向下找到所有指定的组件")]),t._v(" "),n("li",[t._v("由一个组件，找到指定组件的兄弟组件")])]),t._v(" "),n("h2",{attrs:{id:"实现"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#实现","aria-hidden":"true"}},[t._v("#")]),t._v(" 实现")]),t._v(" "),n("p",[n("strong",[t._v("通过递归、遍历，找到指定的组件 "),n("code",[t._v("name")]),t._v(" 选项匹配的组件实例并返回。")])]),t._v(" "),n("h2",{attrs:{id:"findcomponentupward-向上找最近"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#findcomponentupward-向上找最近","aria-hidden":"true"}},[t._v("#")]),t._v(" findComponentUpward 向上找最近")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("findComponentUpward")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" parent "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" name "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent "),n("span",{attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token operator"}},[t._v("!")]),t._v("name "),n("span",{attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("indexOf")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),n("span",{attrs:{class:"token number"}},[t._v("0")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    parent "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      name "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" comA "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("findComponentUpward")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token keyword"}},[t._v("this")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v('"componentA"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("comA"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  comA"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("say")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h2",{attrs:{id:"向上找到所以指定组件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#向上找到所以指定组件","aria-hidden":"true"}},[t._v("#")]),t._v(" 向上找到所以指定组件")]),t._v(" "),n("p",[t._v("一般用在递归组件的场景。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("findComponentsUpward")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" parents "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" parent "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),n("span",{attrs:{class:"token operator"}},[t._v("===")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      parents"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("push")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" parents"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("concat")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token function"}},[t._v("findComponentsUpward")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h2",{attrs:{id:"向下找到最近的指定组件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#向下找到最近的指定组件","aria-hidden":"true"}},[t._v("#")]),t._v(" 向下找到最近的指定组件")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("findComponetDownward")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" children "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$children"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" children "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token keyword"}},[t._v("null")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("childrens"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" child "),n("span",{attrs:{class:"token keyword"}},[t._v("of")]),t._v(" childrens"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" name "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" child"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n      "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name "),n("span",{attrs:{class:"token operator"}},[t._v("===")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        children "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" child"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{attrs:{class:"token keyword"}},[t._v("break")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        children "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("findComponentDownward")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("child"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("children"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" children"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h2",{attrs:{id:"向下找到所有指定的组件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#向下找到所有指定的组件","aria-hidden":"true"}},[t._v("#")]),t._v(" 向下找到所有指定的组件")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("findComponentsDownward")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$children"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("reduce")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("components"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" child"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("child"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),n("span",{attrs:{class:"token operator"}},[t._v("===")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      components"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("push")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("child"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" foundChilds "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("findComponentsDownward")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("child"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" components"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("concat")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("foundChilds"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h2",{attrs:{id:"找到指定组件的兄弟组件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#找到指定组件的兄弟组件","aria-hidden":"true"}},[t._v("#")]),t._v(" 找到指定组件的兄弟组件")]),t._v(" "),n("p",[t._v("通过组件的内置属性 "),n("code",[t._v("_uid")]),t._v(" 把自己排除。")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token function"}},[t._v("findBrothersComponents")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" exceptMe "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token boolean"}},[t._v("true")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" res "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$parent"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$children"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("filter")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("item "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" item"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),n("span",{attrs:{class:"token operator"}},[t._v("===")]),t._v(" componentName"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" idx "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" res"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("findIndex")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("item "),n("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" item"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_uid "),n("span",{attrs:{class:"token operator"}},[t._v("===")]),t._v(" ctx"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_uid"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("exceptMe"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    res"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("splice")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("idx"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token number"}},[t._v("1")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" res"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}],!1,null,null,null);o.options.__file="找到任意组件实例的方法.md";s.default=o.exports}}]);