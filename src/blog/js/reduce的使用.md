# reduce 的使用

reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素。

```js
arr.reduce(callback,[initialValue])

callback （执行数组中每个值的函数，包含四个参数）

    1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    2、currentValue （数组中当前被处理的元素）
    3、index （当前元素在数组中的索引）
    4、array （调用 reduce 的数组）

initialValue （作为第一次调用 callback 的第一个参数。）
```

## 初始值

没有初始值时

```js
var arr = [1,2,3,4];
var sum = arr.reduce((prev, cur, idx,arr) => {
  console.log(prev, cur, idx);
  return prev + cur;
});

//结果
1 2 1
3 3 2
6 4 3
```

index 是从 1 开始的，第一次的 prev 的值是数组的第一个值。数组长度是 4，但是 reduce 函数循环 3 次

有初始值时

```js
var arr = [1,2,3,4];
var sum = arr.reduce((prev, cur, idx,arr) => {
  console.log(prev, cur, idx);
  return prev + cur;
}, 0);

//结果
0 1 0
1 2 1
3 3 2
6 4 3
```

index 是从 0 开始的，第一次的 prev 的值是我们设置的初始值 0，数组长度是 4，reduce 函数循环 4 次

**如果没有提供 initialValue，reduce 会从索引 1 的地方开始执行 callback 方法，跳过第一个索引。如果提供 initialValue，从索引 0 开始**。并且数组为空时，没有初始值会报错，有则不会。

## 用法

### 求和求积

```js
var arr = [1, 2, 3];
var sum = arr.reduce((x, y) => x + y);
var mul = arr.reduce((x, y) => x * y);
```

### 计算每个元素出现的次数

```js
var names = ['a', 'b', 'c', 'b'];
var nameNum = names.reduce((prev, cur) => {
  prev[cur] ? prev[cur]++ : (prev[cur] = 1);
  return prev;
}, {});
//{a:1,b:2,c:1}
```

### 数值去重

```js
var arr = [1, 2, 3, 2];
var newArr = arr.reduce((prev, cur) => {
  if (!prev.includes(cur)) {
    return prev.concat(cur);
  } else {
    return prev;
  }
}, []);
```

### 二维及多维数组变一维

```js
var arr = [[0, 1], [2, 3]];
var newArr = arr.reduce((prev, cur) => {
  return prev.concat(cur);
}, []);

// 多维数组转化为一维
var newArr = function(arr) {
  return arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? newArr(cur) : cur),
    []
  );
};
```

### 对象中属性求和

```js
var result = [{ name: 'a', score: 20 }, { name: 'b', score: 30 }];

var sum = result.reduce((prev, cur) => cur.score + prev, 0);
```

### promise 队列

让多个 promise 串行执行

```js
function pPromiseQueue(parr) {
  return parr.reduce((prev, cur) => prev.then(() => cur()), Promise.resolve());
}

// Reduce 的作用就是在内存中生成这个队列
// new Promise((resolve, reject) => {
//     // Promise #1

//     resolve();
//   })     //prev.then()
//     .then(result => {
//       // Promise #2

//       return cur()
//     })
//     .then(result => {
//       // Promise #3

//       return cur();
//     });

// async function runPromiseByQueue(myPromises) {
//     for (let value of myPromises) {
//         await value();
//     }
// }
// 利用 reduce 的函数整体是个同步函数，自己先执行完毕构造 Promise 队列，然后在内存异步执行；而利用 async/await 的函数是利用将自己改造为一个异步函数，等待每一个 Promise 执行完毕

const createPromise = (time, id) => () =>
  new Promise((solve, reject) =>
    setTimeout(() => {
      if (id == 2) {
        reject(id);
        return;
      }
      console.log('promise', id);
      solve();
    }, time)
  );

pPromiseQueue([
  createPromise(500, 1),
  createPromise(500, 2),
  createPromise(500, 3)
]).catch(err => {
  console.log(`err id: ${err}`);
});
```
