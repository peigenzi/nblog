# css 技巧

## 图片占位

图片未加载出来之前浏览器是无法计算出图片实际尺寸的，所以会出现一个问题，页面刚打开各种元素会因为图片未完全加载而跳动/错位。

解决方法：通过图片宽高比例计算出图片所需占位空间，赋值于外容器，图片再绝对定位在等比缩放的容器当中。

```css
.placeholder {
    position: relative;
    overflow: hidden;
    width: 100%:
    height: 0;
    padding-top: 100%:
}
.placeholder img {
    display: block;
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
}
```

计算公式：
**padding-top = 图片高度(px)/图片宽度(px) * 100%**

比如：
1:1 比例的图片 padding-top: 100%;
2:1 比例的图片 padding-top: 50%;
