# promise 改造回调函数

使用回调函数形式的接口时，要把回调作为参数要传入。

```js
this.$ajax.UserList({
	data: data_opt,
	success(res) {
	    console.log(res)
	},
	fail(err) {
		console.log(err);
	})
```

简单改写，外层包一层函数。写起来比较麻烦。

```js
function getUserList(){
    return new Promise((resolve, reject) => {
        this.$ajax.UserList({
	    data: data_opt,
	    success(res) {
	        resolve(res)
	    },
	    fail(err) {
		    reject(err);
	    })
    })
}
```

另一种方式是使用高阶函数，将异步函数作为参数传入。

```js
// fn 为异步函数，obj 为其参数
const fPromise = fn => obj => {
  return new Promise((resolve, reject) => {
    obj.success = res => {
      resolve(res);
    };
    obj.fail = err => {
      reject(err);
    };
    fn(obj);
  });
};

// 使用
fPromise(this.$ajax.UserList)({
  data: data_opt
})
  .then(res => {})
  .catch(err => {});
```
