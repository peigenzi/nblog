# 可从外部关闭下拉菜单的 Vue 指令

## 需求

点击下拉菜单以外的所有区域都要关闭下拉菜单

## 实现

在 `document` 上绑定事件，过滤出是否点击目标元素的内部元素。

- html

```html
<div v-clickoutside="handleClose">
  <div @click="show = !show">下拉菜单</div>
  <div v-show="show"><p>内容</p></div>
</div>
```

- index.js

```js
var app = new Vue({
  el: '#app',
  data: {
    show: false
  },
  methods: {
    handleClose() {
      this.show = false;
    }
  }
});
```

- clickoutside.js

```js
Vue.directive('clickoutside', {
  bind(el, binding, vnode) {
    function domHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }

      //关闭
      if (binding.expression) {
        binding.value(e);
      }
    }

    el.__vueClickOutside__ = domHandler;
    document.addEventListener('click', domHandler);
  },

  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
});
```

## 关键

`Node.contains()` 返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。

```js
//如果 otherNode 是 node 的后代节点或是 node 节点本身.则返回true , 否则返回 false.
node.contains(otherNode);
```
