# new

`new constructor[([arguments])]`

创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

## 创建用户自定义的对象

- 通过编写函数来定义对象类型

- 通过 new 来创建对象实例

## new Foo(...) 执行时发生的事情

1. 创建一个继承自 `Foo.prototype` 的新对象

2. 使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。`new Foo` 等同于 `new Foo()`，即没有指定参数列表，Foo 不带任何参数调用的情况。

3. 如果构造函数没有显式返回一个**对象**，则使用步骤 1 创建的对象(构造函数返回 null 时也使用 1 中的对象)。一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤。

## 模拟实现

```js
function myNew() {
  //获取构造函数
  var foo = [].shift.call(arugments);
  //创建新对象obj.__proto__ = foo.prototype
  var obj = Object.create(foo.prototype);
  //绑定this
  var ret = foo.apply(obj, arguments);

  return ret instanceof Object ? ret : obj;
}
```
