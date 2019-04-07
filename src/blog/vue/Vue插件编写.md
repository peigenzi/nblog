# Vue 插件编写

插件通常会为 Vue 添加全局功能。

```js
export default {
    install(Vue, options) {
        Vue.myGlobalMethod = function () {  // 1. 添加全局方法或属性，如:  vue-custom-element
            // 逻辑...
        }

        Vue.directive('my-directive', {  // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
            bind (el, binding, vnode, oldVnode) {
                // 逻辑...
            }
            ...
        })

        Vue.mixin({
            created: function () {  // 3. 通过全局 mixin方法添加一些组件选项，如: vuex
                // 逻辑...
            }
            ...
        })

        Vue.prototype.$myMethod = function (options) {  // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
            // 逻辑...
        }
    }
}
```

## 使用插件

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin);

new Vue({
    //... options
});

// 也可以传入一个选项对象
Vue.use(MyPlugin, { someOption: true });
```

## 开发插件

-   导出的是一个函数：第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。

-   导出的是一个对象：对象应该有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。

`Vue.use(MyPlugin)` 时会调用 `install` 方法，执行里面的逻辑。全局功能就是在这个时候被加上去的。

```html
<tempalte>
    <div class="loading-box" v-show="show">
        <div class="loading-mask"></div>
        <div class="loading-content">
            <div class="text">{{text}}</div>
        </div>
    </div>
</tempalte>

<script>
    export default {
        props: {
            show: Boolean,
            text: {
                type: String,
                default: '正在加载中...'
            }
        }
    };
</script>
```

```js
import loading from './loading';
let $vm;

export default {
    install(Vue, options) {
        if (!$vm) {
            const Load = Vue.extend(loading);

            $vm = new Load({
                el: document.createElement('div')
            });

            document.body.appendChild($vm.$el);
        }

        $vm.show = false;

        let loading = {
            show(text) {
                $vm.show = true;

                $vm.text = text;
            },
            hide() {
                $vm.show = false;
            }
        };

        Vue.prototype.$loading = loading;
    }
};
```
