# gulp 笔记

在 gulp 中，使用的是 Nodejs 中的 stream(流)，首先获取到需要的 stream，然后可以通过 stream 的 pipe() 方法把流导入到你想要的地方

使用 gulp 只需要知道 4 个 API。
`gulp.task()`, `gulp.src()`, `gulp.desc()`, `gulp.watch()`。

## gulp.src()

`gulp.src()` 方法正是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流(Vinyl files)，这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息。

```js
gulp.src(globs[, options])

//使用数组的方式来匹配多种文件
gulp.src(['js/*.js','css/*.css','*.html'])

gulp.src([*.js,'!b*.js']) //匹配所有js文件，但排除掉以b开头的js文件
gulp.src(['!b*.js',*.js]) //不会排除任何文件，因为排除模式不能出现在数组的第一个元素中
```

- globs 是文件的匹配模式(类似正则表达式)，当有多个匹配模式时，该参数可以为一个数组。
- options 为可选参数。通常情况下不需要用到。

## gulp.desc()

`gulp.dest()` 方法是用来写文件的。
gulp 的使用流程一般是这样子的：首先通过 gulp.src() 方法获取到我们想要处理的文件流，然后把文件流通过 pipe 方法导入到 gulp 的插件中，最后把经过插件处理后的流再通过 pipe 方法导入到 gulp.dest() 中，gulp.dest() 方法则把流中的内容写入到文件中。

```js
gulp.dest(path[,options])
```

- path 为要写入的文件
- options 为可选参数

`gulp.desc()` 传入的路径参数，只能用来指定要生成的文件的**目录**，而不能指定生成文件的文件名，它生成文件的文件名使用的是导入到它的文件流自身的文件名，所以生成的文件名是由导入到它的文件流决定的，即使我们给它传入一个带有文件名的路径参数，然后它也会把这个文件名当做是目录名。

```js
var gulp = require('gulp');
gulp.src('script/jquery.js').pipe(gulp.dest('dist/foo.js'));
//最终生成的文件路径为 dist/foo.js/jquery.js,而不是dist/foo.js
```

gulp.dest(path) 生成的文件路径是我们传入的 path 参数后面再加上 gulp.src() 中有通配符开始出现的那部分路径。

```js
var gulp = reruire('gulp');
//有通配符开始出现的那部分路径为 **/*.js
gulp.src('script/**/*.js').pipe(gulp.dest('dist')); //最后生成的文件路径为 dist/**/*.js
//如果 **/*.js 匹配到的文件为 jquery/jquery.js ,则生成的文件路径为 dist/jquery/jquery.js

gulp
  .src('script/avalon/avalon.js') //没有通配符出现的情况
  .pipe(gulp.dest('dist')); //最后生成的文件路径为 dist/avalon.js

//有通配符开始出现的那部分路径为 **/underscore.js
gulp
  .src('script/**/underscore.js')
  //假设匹配到的文件为script/util/underscore.js
  .pipe(gulp.dest('dist')); //则最后生成的文件路径为 dist/util/underscore.js

gulp
  .src('script/*') //有通配符出现的那部分路径为 *
  //假设匹配到的文件为script/zepto.js
  .pipe(gulp.dest('dist')); //则最后生成的文件路径为 dist/zepto.js
```

通过指定 gulp.src() 方法配置参数中的 base 属性，我们可以更灵活的来改变 gulp.dest() 生成的文件路径。

当我们没有在 gulp.src() 方法中配置 base 属性时，base 的默认值为通配符开始出现之前那部分路径。

```js
gulp.src(script/lib/*.js) //没有配置base参数，此时默认的base路径为script/lib
    //假设匹配到的文件为script/lib/jquery.js
    .pipe(gulp.dest('build')) //生成的文件路径为 build/jquery.js

gulp.src(script/lib/*.js, {base:'script'}) //配置了base参数，此时base路径为script
    //假设匹配到的文件为script/lib/jquery.js
    .pipe(gulp.dest('build')) //此时生成的文件路径为 build/lib/jquery.js
```

用 gulp.dest() 把文件流写入文件后，文件流仍然可以继续使用。

## gulp.task()

`gulp.task()` 方法用来定义任务。

```js
gulp.task(name[, deps], fn);
```

- name 为任务名
- deps 是当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数。
- fn 任务函数，我们把任务要执行的代码都写在里面。该参数也是可选的。

```js
gulp.task('mytask', ['one', 'two', 'three'], function() {
  //定义一个有依赖的任务
  // Do something
});
```

如果某个任务所依赖的任务是异步的，就要注意了，gulp 并不会等待那个所依赖的异步任务完成，而是会接着执行后续的任务。

```js
gulp.task('one', function() {
  //one是一个异步执行的任务
  setTimeout(function() {
    console.log('one is done');
  }, 5000);
});

//two任务虽然依赖于one任务,但并不会等到one任务中的异步操作完成后再执行
//two任务会在one任务中的异步操作完成之前就执行了。
gulp.task('two', ['one'], function() {
  console.log('two is done');
});
```

如果想等待异步任务中的异步操作完成后再执行后续的任务。
有三种方法可以实现。

```js
// 第一：在异步操作完成后执行一个回调函数来通知gulp这个异步任务已经完成,这个回调函数就是任务函数的第一个参数。
gulp.task('one', function(cb) {
  //cb为任务函数提供的回调，用来通知任务已经完成
  //one是一个异步执行的任务
  setTimeout(function() {
    console.log('one is done');
    cb(); //执行回调，表示这个异步任务已经完成
  }, 5000);
});

//这时two任务会在one任务中的异步操作完成后再执行
gulp.task('two', ['one'], function() {
  console.log('two is done');
});

// 第二：定义任务时返回一个流对象。适用于任务就是操作gulp.src获取到的流的情况。
gulp.task('one', function(cb) {
  var stream = gulp
    .src('client/**/*.js')
    .pipe(dosomething()) //dosomething()中有某些异步操作
    .pipe(gulp.dest('build'));
  return stream;
});

gulp.task('two', ['one'], function() {
  console.log('two is done');
});

// 第三：返回一个promise对象，例如
var Q = require('q'); //一个著名的异步处理的库 https://github.com/kriskowal/q
gulp.task('one', function(cb) {
  var deferred = Q.defer();
  // 做一些异步操作
  setTimeout(function() {
    deferred.resolve();
  }, 5000);
  return deferred.promise;
});

gulp.task('two', ['one'], function() {
  console.log('two is done');
});
```

## gulp.watch()

`gulp.watch()` 用来监听文件变化。

```js
gulp.watch(glob[, opts], tasks)
```

- glob 为要监视的文件的匹配模式
- opts 为一个可选的配置对象
- tasks 为文件变化后要执行的任务，为一个数组

```js
gulp.task('uglify', function() {
  //do something
});
gulp.task('reload', function() {
  //do something
});
gulp.watch('js/**/*.js', ['uglify', 'reload']);
```

另一种形式

```js
gulp.watch(glob[, opts, cb])
```

- cb 参数为一个函数。每当监视的文件发生变化时，就会调用这个函数,并且会给它传入一个对象，该对象包含了文件变化的一些信息，type 属性为变化的类型，可以是 added, changed, deleted；path 属性为发生变化的文件的路径。

```js
gulp.watch('js/**/*.js', function(event) {
  console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
  console.log(event.path); //变化的文件的路径
});
```

一个任务中可以多次运行 `gulp.watch` 监控不同的文件。

```js
gulp.task('auto', () => {
  gulp.wtach(['src/*.css', 'example/*.css'], ['css']);
  gulp.wtach('src/*.js', ['js']);
});
```
