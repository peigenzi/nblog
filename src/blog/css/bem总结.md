# bem 总结

`Block__Element--Modifier`

## 子元素的处理

```css
.component .component__element//child
.component__element__element; //grandchild
```

子元素很多的时候导致类名很长。并且改变 html 结构时，要重名很多 css。

**没有必要在 css 中完全反映 html 结构**。更好的是只给子元素的一个双重的下划线符号加上不同的名字。

```html
<div class="el-color-picker">
    <div class="el-color-picker__mask"></div>
    <div class="el-color-picker__trigger">
        <span class="el-color-picker__color">
            <span class="el-color-picker__color-inner"></span>
        </span>
        <span class="el-color-picker__icon"></span>
    </div>
</div>
```

## bem 意义
提供一个清晰的命名空间来说明自身的作用。
它的强大之处在于重构。 当重构项目时，通常会在代码库的大部分内进行搜索，还有很多是跨越多文件进行搜索。举个例子：如果类命名为 `c-button--large`，如果想去除它，就可以在项目中包括javascript, html, css 中搜索使用到这个字符串的地方。如果单使用 `large`，很可能会查找到很多不相关的地方。
