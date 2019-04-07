# jQuery deferred

deferred 对象是 jQuery 的回调函数解决方案。

```js
$.ajax('/test/')
  .done(function() {})
  .fail(function() {})
  .done(function() {});
```

回调函数可以添加任意多个，它们按照添加顺序执行。

## 为多个操作指定回调函数

需要用到 `$.when()`。它的参数只能是 deferred 对象。

```js
$.when($.ajax('/test1'), $.ajax('/test2'))
  .done(function() {})
  .fail(function() {});
```

如果都成功了，就运行 done() 指定的回调函数，否则执行 fail() 指定的回调函数。

## 普通操作的回调函数接口

deferred 对象的最大优点，是它可拓展到所有操作，不管是异步还是同步操作。

```js
var dtd = $.Deferred(); //新建一个deferred对象
var wait = function(dtd) {
  var task = function() {
    dtd.resolve(); //改变dtd对象状态
  };

  setTimeout(task, 5000);

  return dtd;
};

$.when(wait(dtd))
  .done()
  .fail();
```

## resolve() 和 reject()

改变 deferred 对象的状态(未完成，已完成，已失败)。

改为已完成状态会触发 done() 方法，已失败状态会触发 fail() 方法。

## promise()

在原来的 deferred 对象上返回另一个 deferred 对象，后者只开放与改变状态无关的方法。

```js
var dtd = $.Deferred(); // 新建一个Deferred对象，也可以在函数内部新建

var wait = function(dtd) {
  var tasks = function() {
    alert('执行完毕！');

    dtd.resolve(); // 改变Deferred对象的执行状态
  };

  setTimeout(tasks, 5000);

  return dtd.promise(); // 返回promise对象
};

var d = wait(dtd); // 新建一个d对象，改为对这个对象进行操作

$.when(d)
  .done(function() {
    alert('哈哈，成功了！');
  })
  .fail(function() {
    alert('出错啦！');
  });

d.resolve(); // 此时，这个语句是无效的

//另一种防止状态被外部改变的方法
$.Deferred(wait)
  .done(function() {
    alert('哈哈，成功了！');
  })
  .fail(function() {
    alert('出错啦！');
  });
```

$.Deferred() 可以接受一个函数名（注意，是函数名）作为参数，$.Deferred() 所生成的 deferred 对象将作为这个函数的默认参数。

直接在 wait 对象上部署 deferred 接口。

```js
var dtd = $.Deferred(); // 生成Deferred对象

var wait = function(dtd) {
  var tasks = function() {
    alert('执行完毕！');

    dtd.resolve(); // 改变Deferred对象的执行状态
  };

  setTimeout(tasks, 5000);
};

dtd.promise(wait);

wait
  .done(function() {
    alert('哈哈，成功了！');
  })

  .fail(function() {
    alert('出错啦！');
  });

wait(dtd);
```

## then() 和 always()

可以把 done()和 fail()合在一起写，这就是 then()方法。

```js
$.when($.ajax('/main.php')).then(successFunc, failureFunc);
```

always 作用是，不管调用的是 deferred.resolve()还是 deferred.reject()，最后总是执行。

```js
$.ajax('test.html')
.always(function() {
  alert('已执行！');
});
```
