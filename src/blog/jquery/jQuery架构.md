# jQuery 架构

理念：**选择元素，操作之。**

## 原型继承

```js
var $ = (jQuery = function() {});
// 别名
jQuery.fn = jQuery.prototype = {
  jquery: '1.3.2',
  size: function() {
    return this.length;
  }
};

var a = new $();
a.size(); //正确

// 方法和属性都绑定在原型上，没有绑定到自身，下面的使用方式会报错
$.size(); //错误
$().size(); //错误
```

## 返回原型

jq 的使用一般是 `$().size()`。即 `$()` 执行后返回了一个带有很多方法的对象。

```js
var $ = (jQuery = function() {
  return jQuery.fn;
});

jQuery.fn = jQuery.prototype = {
  jquery: '1.3.2',
  size: function() {
    return this.length;
  }
};

$().size();
```

## 获取元素

jQuery 的目的是为了获取元素，现在返回的却是一个对象，显然达不到需求。所以，jQuery.fn 应该提供一个获取元素的方法 init ，然后将获取到的元素返回。

```js
var $ = (jQuery = function(selector) {
  return jQuery.fn.init(selector); //init中，this指向jQuery.fn
});

jQuery.fn = jQuery.prototype = {
  init: function(selector) {
    return document.querySelector(selector);
  },
  jquery: '1.3.2',
  size: function() {
    return this.length;
  }
};
```

返回的结果还能够拥有 jQuery.fn 中的方法。init 方法中 this 就是 jQuery.fn，将 this 返回即可。但为了获得元素，可以通过 this 对象将元素设置为当前对象的一个属性。

```js
jQuery.fn = jQuery.prototype = {
  init: function(selector) {
    this[0] = document.querySelector(selector);
    this.length = 1;
    return this;
  },
  jquery: '1.3.2',
  size: function() {
    return this.length;
  }
};
```

## 分隔作用域

init() 返回 this 关键字，始终指向 jQuery.fn 这同一个对象。多次调用 `$()` 则会覆盖上次的结果。并且 init 中如果有和 jQuery.fn 中同名的属性，还会对 jQuery.fn 造成影响。

解决方法是实例化 init ，每次返回 init 的一个实例，分隔作用域。

```js
var $ = (jQuery = function() {
  return new jQuery.fn.init();
});
```

这又带来另一个问题，因为 init 的原型上并没那些方法，所以无法访问 jQuery.fn 对象的属性或方法了。

## 原型传递

`jQuery.fn.init.prototype = jQuery.fn` 使用 jQuery 的原型对象覆盖 init 的原型对象。使得 init 的实例能够访问 jQuery.fn 对象的属性和方法。

## 选择器

jQuery 返回的是一个类数组对象，有数组的长度和下标，但没有继承数组的方法。

jQuery() 函数包含两个参数 selector 和 context。分别表示选择器和选择的内容范围。

为了简化操作，假设选择器的类型仅限定为标签选择器。

```js
init: function(selector, context){
  selector = selector || document;
  context = context || document;

  // 如果选择符是节点对象
  if(selector.nodeType) {
    this[0] = selector;
    this.length = 1;
    this.context = selector;
    return this;
  }

  if(typeof selector === 'string') {
    var e = context.querySelector(selector);

    // 把选中的元素放到当前实例数组中
    for(var i = 0; i < e.length; i++) {
      this[i] = e[i]
    }
    this.length = e.length;
    this.context = context;
    return this;
  } else {
    this.length = 0;
    this.context = context;
    return this
  }
}
```

## 迭代器

jQuery 对象包含的数据是 DOM 元素，通过数组的形式存储。不允许直接操作，只有分别读取它包含的每一个 DOM 元素才能都实现各种操作。

jQuery 定义了一个工具函数 each()，利用它遍历对象中的所有元素，并把需要操作的内容封装到一个回调函数中，然后通过在每个 DOM 元素上调用这个回调函数即可。

```js
jQuery.fn = {
  each: function(cb, args) {
    return jQuery.each(this, cb, args);
  }
};

jQuery.extend({
  each: function(obj, cb, args) {
    var name,
      i = 0,
      length = obj.length;

    // 存在对调函数的参数数组
    if (args) {
      //obj不是jq对象
      if (length === undefined) {
        for (name in obj) if (cb.apply(obj[name], args) === false) break;
      } else {
        // 是jq对象
        // 遍历jq对象数组
        for (; i < length; ) if (cb.apply(obj[i++], args) === false) break;
      }
    } else {
      //没有参数数组
      if (length === undefined) {
        for (name in obj)
          if (cb.call(obj[name], name, obj[name]) === false) break;
      } else {
        for (
          var value = obj[0];
          i < length && cb.call(value, i, value) !== false;
          value = obj[++i]
        ) {}
      }
    }

    return obj;
  }
});
```

## 功能拓展

jQuery 是通过 extend() 函数来拓展功能的。

```js
jQuery.extend({});
jQuery.fn.extend({});
```

这样方便快速拓展框架功能，但不会破坏框架的原型结构，也方便管理。

```js
jQuery.extend = jQuery.fn.extend = function() {
  var target = argument[0] || {},
    i = 1,
    length = argument.length,
    deep = false,
    options;

  if (typeof target === 'boolean') {
    deep = target;
    target = argument[1] || {};
    i = 2;
  }

  // 如果第一个参数是字符串，则设置为空对象
  if (typeof target !== 'object' && !jQuery.isFunction(target)) {
    target = {};
  }

  // 如果只有一个参数，表示把参数对象的方法复制给当前对象
  if (length == i) {
    target = this;
    --i;
  }

  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (var name in options) {
        var src = target[name],
          copy = options[name];

        if (target === copy) {
          continue;
        }

        if (deep && copy && typeof copy === 'object' && !copy.nodeType)
          target[name] = jQuery.extend(
            deep,
            src || (copy.length != null ? [] : {}),
            copy
          );
        else if (copy !== undefined) target[name] = copy;
      }
      return target;
    }
  }
};
```
