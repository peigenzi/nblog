# 为原生 API 添加功能

## 需求

全局 loading；统计接口耗时；接口错误上报...

比较方便的方法是对 `XMLHttpRequest` 本身进行拓展。

## 原理

```js
// 原函数
let obj = {
  a: function(v) {
    this.v = v;
    console.log(this.v);
  }
};

// 创建一个变量保存原函数
let b = obj.a;

//覆写原函数,增加想要的扩展功能,通过apply方法保证原函数执行的时候有正确的this指向和参数传递
obj.a = function(v) {
  console.log(v + 1); //新功能
  let args = Array.from(arguments);
  b.apply(this, args); // 原函数功能, 需要重新绑定this;
};

obj.a(1); //2 1
```

## 示例

### 在 console.log 的同时进行 alert

```js
(function() {
  let a = console.log;

  console.log = function() {
    var args = Array.from(arguments);
    a.apply(this, args);
    alert(args[0]);
  };

  console.log(1); // 控制台输出1，弹窗1
})();
```
