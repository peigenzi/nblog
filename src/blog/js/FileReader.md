# FileReader

ie10 可兼容。

`FileReader` 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容。

其中 File 对象可以是来自用户在一个 `<input>` 元素上选择文件后返回的 `FileList` 对象,也可以来自拖放操作生成的 `DataTransfer` 对象,还可以是来自在一个 HTMLCanvasElement 上执行 mozGetAsFile()方法后返回结果。

## 属性

### FileReader.error

读取文件时发生错误。

### FileReader.readyState

-   EMPTY(0)：还没有加载任何数据
-   LOADING(1)：数据正在被加载
-   DONE(2)：已完成全部读取请求

### FileReader.result

文件的内容，数据的格式取决于使用何种方法启动读取操作。

## 重要事件

### FileReader.onload

读取操作完成时触发

### FileReader.onerror

读取操作错误时触发

## 方法

### FileReader.abort()

### FileReader.readAsArrayBuffer()

开始读取指定的 Blob 中的内容，完成后 result 属性中保存的是被读取文件的 ArrayBuffer 数据对象。

### FileReader.readAsBinaryString()

**非标准方法**

开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含所读取文件的原始二进制数据。

### FileReader.readAsDataURL()

开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个 data: URL 格式的字符串以表示所读取文件的内容。

### FileReader.readAsText()

开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个字符串以表示所读取的文件内容。字符串类型的编码可选，如缺省，则默认为“utf-8”类型

```html
<input type="file" onchange="previewFile()" />
<img src="" height="200" alt="Image preview..." />
```

```js
function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener('laod', () => {
        preview.src = reader.result;
    });

    if (file) {
        reader.readAsDataURL(file);
    }
}
```
