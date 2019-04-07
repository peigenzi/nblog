# Object.defineProperty()

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

```js
Object.defineProperty(obj, prop, desc);
```

-   obj：要修改的对象
-   prop：要定义或修改的属性名称
-   desc：要定义或修改的属性描述符

通过赋值操作添加的普通属性是可枚举的，能够在属性枚举期间呈现出来（`for...in` 或 `Object.keys` 方法）， 这些属性的值可以被改变，也可以被删除。但是，默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可修改的。

## 属性描述符

目前有两种属性描述符：**数据描述符**和**存取描述符**。**数据描述符**是一个具有值的属性，该值可能是可写的，也可能不是可写的。**存取描述符**是由 getter-setter 函数对描述的属性。**描述符必须是这两种形式之一；不能同时是两者**。

都可选的键值：

-   configurable：对象的属性是否可以被删除，以及除 writable 特性外的其他特性是否可以被修改。**默认 false**。一旦被设为 false，描述符则不能改变，也不能被重新设为 true（除了单向改变 writable 为 false）
-   enumerable：属性是否可枚举，**默认 false**

数据描述符可选的键值：

-   value：属性对应的值，**默认 undefined**
-   writable：value 是否可以被赋值运算符改变，**默认 false**

存取描述符可选的键值：

-   get：一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象），**默认为 undefined**
-   set：一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。**默认为 undefined**

只指定 setter 函数的属性不能读，只指定 getter 函数的属性不能写。

```js
// 通过赋值操作添加，可配置，可枚举
var obj = {a: 1}
Object.getOwnPropertyDescriptor(obj, 'a')
{value: 1, writable: true, enumerable: true, configurable: true}

// 修改get
Object.defineProperty(obj, 'a', {get: undefined})
Object.getOwnPropertyDescriptor(obj, 'a')
{get: undefined, set: undefined, enumerable: true, configurable: true}

Object.defineProperty(obj, 'a', {get: function(){return 1}})
Object.getOwnPropertyDescriptor(obj, 'a')
{get: ƒ, set: undefined, enumerable: true, configurable: true}

// 修改value
Object.defineProperty(obj, 'a', {value: 1})
Object.getOwnPropertyDescriptor(obj, 'a')
{value: 1, writable: false, enumerable: true, configurable: true}   //writeable 默认 false
```

**如果一个描述符不具有 value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符**

```js
// 显式
Object.defineProperty(obj, 'key', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: 'static'
});

// 循环使用同一对象
function withValue(value) {
    var d =
        withValue.d ||
        (withValue.d = {
            enumerable: false,
            writable: false,
            configurable: false,
            value: null
        });
    d.value = value;
    return d;
}
// ... 并且 ...
Object.defineProperty(obj, 'key', withValue('static'));
```

## 创建属性

如果对象中不存在指定的属性，Object.defineProperty() 就创建这个属性。当描述符中省略某些字段时，这些字段将使用它们的默认值。拥有布尔值的字段的默认值都是 false。value，get 和 set 字段的默认值为 undefined。一个没有 get/set/value/writable 定义的属性被称为“通用的”，并被“键入”为一个数据描述符。

```js
// 在对象中添加一个属性与存取描述符的示例
var bValue;
Object.defineProperty(o, 'b', {
    get: function() {
        return bValue;
    },
    set: function(newValue) {
        bValue = newValue;
    },
    enumerable: true,
    configurable: true
});
```

## 修改属性

当属性不可配置时，不能在数据和访问器属性类型之间切换。

当试图改变不可配置属性的属性描述符（除了 writable 属性之外）的值时会抛出 TypeError，除非当前值和新值相同。

当 writable 属性设置为 false 时，该属性被称为“不可写”。

```js
// strict mode 此模式下会报错
(function() {
    'use strict';
    var o = {};
    Object.defineProperty(o, 'b', {
        value: 2,
        writable: false
    });
    o.b = 3; // throws TypeError: "b" is read-only
    return o.b; // returns 2 without the line above
})();
```

## getters 和 setters

```js
function Archiver() {
    var temperature = null;
    var archive = [];

    Object.defineProperty(this, 'temperature', {
        get: function() {
            console.log('get!');
            return temperature;
        },
        set: function(value) {
            temperature = value;
            archive.push({ val: temperature });
        }
    });

    this.getArchive = function() {
        return archive;
    };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]

//或者
var pattern = {
    get: function () {
        return 'I alway return this string,whatever you have assigned';
    },
    set: function () {
        this.myname = 'this is my name string';
    }
};
function TestDefineSetAndGet() {
    Object.defineProperty(this, 'myproperty', pattern);
}
var instance = new TestDefineSetAndGet();
instance.myproperty = 'test';

// 'I alway return this string,whatever you have assigned'
console.log(instance.myproperty);
// 'this is my name string'
console.log(instance.myname);
```

## 继承属性

如果访问者的属性是被继承的，它的 get 和 set 方法会在子对象的属性被访问或者修改时被调用。如果这些方法用一个变量存值，该值会被所有对象共享。

```js
//将值存储在另一个属性中固定
function myclass() {
}
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return this.stored_x;   //this 指向某个被访问和修改属性的对象。
  },
  set(x) {
    this.stored_x = x;
  }
});
var a = new myclass(); //a本身有一个x，原型上也有x
var b = new myclass();
a.x = 1;
console.log(b.x); // undefined

//不可写的属性被继承，它仍然可以防止修改对象的属性
function myclass() {
}
myclass.prototype.x = 1;
Object.defineProperty(myclass.prototype, "y", {
  writable: false,
  value: 1
});
var a = new myclass();
a.x = 2;    //a自身上增加属性
console.log(a.x); // 2
console.log(myclass.prototype.x); // 1
a.y = 2; // Ignored, throws in strict mode
console.log(a.y); // 1
console.log(myclass.prototype.y); // 1
```

## 定义多个属性

```js
var book = {};

Object.defineProperties(book, {
    _year: {
        value: 2019
    },

    edition: {
        value: 1
    },

    year: {
        get: function() {
            return this._year;
        },

        set: function(val) {
            this._year = val;
        }
    }
})
```