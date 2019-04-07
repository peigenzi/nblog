# Event

## 使用 Event() 构造函数创建一个新的事件对象。

`event = new Event(type, eventInit)`

- type：所创建的事件的名称
- eventInit：字典类型。`bubbles`:默认 false,表示该事件是否冒泡；`cancelable`:默认 false,表示该事件能否被取消；`composed`:默认 false,事件是否会在影子 DOM 根节点之外触发侦听器。

```js
var ev = new Event('look', { bubbles: true });
myDiv.dispatchEvent(ev);
```

## CustomEvent

创建一个新的自定义事件对象。不支持 ie。

`new CustomEvent(type, customEventInit);`

- type：事件名
- customEventInit：字典类型。`detail`:可选的默认值是 null 的任意类型数据。其余字段同 eventInit 中的字段。

```js
obj.addEventListener('cat', function(e) {
  process(e.detail);
});

var event = new CustomEvent('cat', {
  deail: {
    a: 1
  },
  bubbles: true
});

obj.dispatchEvent(event);
```

## 兼容性比较好的写法

createEvent('CustomEvent') 使用 initCustomEvent() 初始化，可以传递 detail 数据。createEvent('Event') 使用 initEvent() 初始化，不能传递数据。

```js
function dispatchEvent(ele, name, type, bubbles, cancelable, detail) {
  type = type === undefined ? 'CustomEvent' : type;
  bubbles = bubbles === undefined ? true : bubbles;
  cancelable = cancelable === undefined ? true : cancelable;

  var e = document.createEvent(type);
  e.initCustomEvent(name, bubbles, cancelable, detail);
  ele.dispatchEvent(e);
}
```
