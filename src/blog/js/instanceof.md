# instanceof

用于测试构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。即对象是否为某个构造函数的实例。

`object instanceof constructor`

要检测的对象 instanceof 某个构造函数。

## 测试对象是否不是特定构造函数的实例

```js
if (!(mycar instanceof Car)) {
  // Do something, like mycar = new Car(mycar)
}

// 这将永远是假的（!mycar将在instanceof之前被处理，所以总是验证布尔值是否是Car的一个实例
if (!mycar instanceof Car)
```

## 多个 true

由于 instanceof 检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回 true

```js
var d = new Date();
d instanceof Date; // true
d instanceof Object; // true
```

## 特殊情况

```js
var obj = Object.create(null); //原型是null
typeof obj; // "object"
Object.create(null) instanceof Object; // false

undefined instanceof Object; // false
null instanceof Object; // false
```

## 无 new 构造

```js
function fn(name, age) {
    if (this instanceof fn) {
        this.name = name;
        this.age = age;
    } else {
        return new fn(name, age);
    }
}
```
