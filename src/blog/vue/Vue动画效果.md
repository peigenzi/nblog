# Vue 动画效果

## css 过渡

```html
<transition name="fade">
  <p v-if="show">hello</p>
</transition>
```

`v-enter-active 和 v-leave-active` 在整个状态中都存在，所以在里面设置 `transition` 或 `animation` 属性。

```css
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, //从初始属性变为下面设置的属性，下一帧后移除类名，属性又变化
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
```

## css 动画

用法同过渡

```html
<transition name="bounce">
  <p v-if="show">hello</p>
</transition>
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

## 自定义过渡类名

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)
- move-class

结合使用其他第三方库很有用。

```html
<transition
  name="custom-classes-transition"
  appear
  appear-active-class="animated tada" //初始渲染时也有动画
  enter-active-class="animated tada"
  leave-active-class="animated bounceOutRight"
>
  <p v-if="show">hello</p>
</transition>
```

## 同时使用过渡和动画及显性过渡持续时间

Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是 transitionend 或 animationend

如果同一个元素同时设置两种过渡动效，就需要使用 type 特性并设置 animation 或 transition 来明确声明你需要 Vue 监听的类型。

事件发生后会移除响应的类名，。2.2.0 后还支持自定义持续时间，即时间到了后再移除类名，与动画持续时间无关。

```html
<transition :duration="1000">...</transition>
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

## js 钩子

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

```js
methods: {
  // --------
  // 进入中
  // --------
  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  //done 后会调用afterEnter
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // --------
  // 离开时
  // --------
  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

### 结合 velocity.js

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:leave="leave"
  v-bind:css="false"
>
  <p v-if="show">
    Demo
  </p>
</transition>
```

```js
methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }
  }
```

## 多个元素或多个组件的过渡

当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记

```html
<transition>
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>
```

多个组件的过渡简单很多，不需要使用 key 特性。相反，我们只需要使用动态组件

```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```

## 过渡模式

-in-out：新元素先进行过渡，完成之后当前元素过渡离开

- out-in：当前元素先进行过渡，完成之后新元素过渡进入

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

## 列表过渡

```html
<transition-group name="list" tag="p">
  <span v-for="item in items" v-bind:key="item" class="list-item">
    {{ item }}
  </span>
</transition-group>
```

```css
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
```

## 列表排序时的过渡

`<transition-group>` 组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。要使用这个新功能只需了解新增的 `v-move` 特性，它会在元素的改变定位的过程中应用。

```html
<transition-group name="flip-list" tag="ul">
  <li class="flip-list-item" v-for="item in items" v-bind:key="item">
    {{ item }}
  </li>
</transition-group>
```

```css
.flip-list-move {
  transition: transform 1s;
}

//给 li 设置类也可实现
.flip-list-item {
  transition: all 1s;
}
```
