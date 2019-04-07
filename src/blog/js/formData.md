# FormData 对象

FormData 对象主要有两个用途：

-   将 form 表单元素的 name 与 value 进行组合，实现表单数据的序列化，从而减少表单元素的拼接
-   异步上传文件

## 创建 formData 对象

纯 js 方式

```js
var formData = new FormData();

formData.append('username', 'Groucho');
formData.append('accountnum', 123456); //数字123456会被立即转换成字符串 "123456"

// HTML 文件类型input，由用户选择
formData.append('userfile', fileInputElement.files[0]);

// JavaScript file-like 对象
var content = '<a id="a"><b id="b">hey!</b></a>'; // 新文件的正文..
var blob = new Blob([content], { type: 'text/xml' });

formData.append('webmasterfile', blob);
```

html 方式

```html
<form id="advForm">
    <p>广告名称：<input type="text" name="advName" value="xixi" /></p>
    <p>
        广告类别：<select name="advType">
            <option value="1">轮播图</option>
            <option value="2">轮播图底部广告</option>
            <option value="3">热门回收广告</option>
            <option value="4">优品精选广告</option>
        </select>
    </p>
    <p><input type="button" id="btn" value="添加" /></p>
</form>
```

通过表单元素作为参数，实现对 formData 的初始化

```js
var form = document.querySelector('#advForm');
//将获得的表单元素作为参数，对formData进行初始化
var formdata = new FormData(form);
```

## 操作方法

### 通过 get(key) 和 getAll(key) 获取对应的值

```js
// 获取key为age的第一个值
formdata.get('age');
// 获取key为age的所有值，返回值为数组类型
formdata.getAll('age');
```

### 通过 append 追加数据

```js
//通过FormData构造函数创建一个空对象
var formdata = new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append('name', 'laoliu');
//通过append()方法在末尾追加key为name值为laoli的数据
formdata.append('name', 'laoli');
//通过append()方法在末尾追加key为name值为laotie的数据
formdata.append('name', 'laotie');
//通过get方法读取key为name的第一个值
console.log(formdata.get('name')); //laoliu
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll('name')); //["laoliu", "laoli", "laotie"]
```

### 通过 set(key, value) 来设置修改数据

```js
//如果key的值不存在会为数据添加一个key为name值为laoliu的数据
formdata.set('name', 'laoli');
```

### 通过 has(key) 来判断是否存在对应的 key 值

```js
formdata.append('name', 'laoliu');
//判断是否包含key为name的数据
console.log(formdata.has('name')); //true
//判断是否包含key为age的数据
console.log(formdata.has('age')); //false
```

### 通过 delete(key) 可以删除数据

```js
formdata.append('name', 'laoliu');
console.log(formdata.get('name')); //laoliu
//删除key为name的值
formdata.delete('name');
console.log(formdata.get('name')); //null
```

## 使用 fromData 发送文件

```html
<form enctype="multipart/form-data" method="post" name="fileinfo">
    <label>Your email address:</label>
    <input
        type="email"
        autocomplete="on"
        autofocus
        name="userid"
        placeholder="email"
        required
        size="32"
        maxlength="64"
    /><br />
    <label>Custom file label:</label>
    <input type="text" name="filelabel" size="12" maxlength="32" /><br />
    <label>File to stash:</label>
    <input type="file" name="file" required />
    <input type="submit" value="Stash the file!" />
</form>
<div></div>
```

js 代码

```js
var form = document.forms.namedItem('fileinfo');
form.addEventListener(
    'submit',
    function(ev) {
        ev.preventDefault();
        var oOutput = document.querySelector('div'),
            oData = new FormData(form);

        oData.append('CustomField', 'This is some extra data');

        var oReq = new XMLHttpRequest();
        oReq.open('POST', 'stash.php', true);
        oReq.onload = function(oEvent) {
            if (oReq.status == 200) {
                oOutput.innerHTML = 'Uploaded!';
            } else {
                oOutput.innerHTML =
                    'Error ' +
                    oReq.status +
                    ' occurred when trying to upload your file.<br />';
            }
        };

        oReq.send(oData);
    },
    false
);
```

直接向 FormData 对象附加 File 或 Blob 类型的文件。通过第三个可选参数设置发送请求的头 Content-Disposition 指定文件名。如果不指定文件名（或者不支持该参数时），将使用名字“blob”。

```js
//name, value, filename
data.append('myfile', myBlob, 'filename.txt');
```

## 和 jq 一起使用

```js
var fd = new FormData(document.querySelector('form'));
fd.append('CustomField', 'This is some extra data');
$.ajax({
    url: 'stash.php',
    type: 'POST',
    data: fd,
    processData: false, // 不处理数据
    contentType: false // 不设置内容类型
});
```
