# 常见 Content-type

HTTP 协议规定 POST 提交的数据必须放在消息主体中，但并没有规定数据必须使用何种编码方式。而服务端通常是根据请求头（headers）中的 Content-Type 字段来获知请求中的消息主体是用何种方式编码，再对主体进行解析。POST 提交数据方案，包含了 Content-Type 和消息主体编码方式两部分。

## application/x-www-form-urlencoded

最常见的提交方式。浏览器的 form 表单，如果不设置 enctype 属性，最终就会以这种方式提交数据。

所有数据会变成键值对的形式 `key1=value1&key2=value2` 的形式，并且特殊字符需要转义成 utf-8 编号，如空格会变成 %20;如果请求类型 type 是 GET 的话，那么格式化的字符串将直接拼接在 url 后发送到服务端；如果请求类型是 POST, 那么格式化的字符串将放在 http body 的 Form Data 中发送

```html
<form action="http://www.example.com" method="POST">
    <p>username: <input type="text" name="fname" /></p>
    <p>age: <input type="text" name="age" /></p>
    <input type="submit" value="提交" />
</form>
```

form 表单会有默认事件。如果要阻止，就直接在 form 表单上加 `onsubmit="return false;"`。或者也可以直接不用 form 标签。

js 方式

```js
let data =
    'username=' +
    document.getElementById('username').value +
    '&pwd=' +
    document.getElementById('psw').value;

let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
        } else {
        }
    }
};

xhr.open('POST', '/test');
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.send(data);
```

jq 方式

```js
$.ajax({
    url: '/test',
    type: 'post',
    data:{
        username: $('#username').val(),
        pwd: $('#psw').val()
    }，
    dataType: 'JSON',
    success:function(){},
    error:function(){},
})
```

## multipart/from-data

使用表单上传文件时，必须指定表单的 enctype 属性值为 `multipart/form-data`。消息主体里按照字段个数又分为多个结构类似的部分，每部分都是以 --boundary 开始，紧接着内容描述信息，然后是回车，最后是字段具体内容（文本或二进制）。如果传输的是文件，还要包含文件名和文件类型信息。消息主体最后以 --boundary-- 标示结束。

```html
<form
    action="http://www.example.com"
    method="POST"
    enctype="multipart/form-data"
>
    <p>username: <input type="text" name="fname" /></p>
    <p>age: <input type="text" name="age" /></p>
    <input type="submit" value="提交" />
</form>
```

js 方式

```html
<form name="form1" id="form1">
    <input type="file" name="imgFile" />
    <input type="text" name="name1" />
    <input type="text" name="name2" />

    <div id="uploadImg">上传图片</div>
</form>
```

```js
let form = document.getElementById('form1');
let formData = new FormData(form);

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            console.log(xhr.responseText);
        } else {
            alert('Response was unsuccessful:' + xhr.status);
        }
    }
};

xhr.open('post', '/test', true);
xhr.setRequestHeader('Content-Type', 'multipart/form-data');
xhr.send(formData);
```

jq 方式

```js
var data = new FormData($('#form1')[0]);
$.ajax({
    url: '/test',
    type: 'POST',
    data: data,
    dataType: 'JSON',
    cache: false,
    // 必须false才会避开jQuery对 formdata 的默认处理,XMLHttpRequest会对 formdata 进行正确的处理
    processData: false,
    // 必须false才会自动加上正确的Content-Type
    contentType: false
});
```

## appliction/json

它告诉服务端消息主体是**序列化后**的 JSON 字符串。这种方式适合传一个复杂的 json 对象。

js 方式

```js
var request = new XMLHttpRequest();
request.open('POST', '/test');
var data = {
    username: document.getElementById('username').value,
    pwd: document.getElementById('psw').value
};
data = JSON.stringify(data);

request.onreadystatechange = function() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            if (data.id) {
                console.log(data.msg);
            } else {
                console.log('出现错误：' + data.msg);
            }
        } else {
            alert('发生错误：' + request.status);
        }
    }
};

request.setRequestHeader('Content-type', 'application/json');
request.send(data);
```

jq 方式

```js
data = JSON.stringify(data);
$.ajax({
    type: 'POST',
    url: '/test',
    data: data,
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
        if (data.id) {
            console.log(data.msg);
        } else {
            console.log('出现错误：' + data.msg);
        }
    },
    error: function(jqXHR) {
        alert('发生错误：' + jqXHR.status);
    }
});
```
