# window 的尺寸和距离

## scrollX and scrollY

**只读**。返回文档/页面水平/垂直方向滚动的像素值。

pageXOffset/pageYOffset 属性是 scrollX/scrollY 属性的别名

```js
var x = window.scrollX;

// 如果 scrollX 大于 400，则把文档重新滚动到左上角。
if (window.scrollX > 400) {
  window.scroll(0, 0);
}
```

## innerHeight and innerWidth

**只读**。返回浏览器窗口的视口（viewport）尺寸（以像素为单位）；如果有滚动条，也包括滚动条尺寸。

## outerHeight and outerWidth

**只读**。返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。

<img src="https://developer.mozilla.org/@api/deki/files/213/=FirefoxInnerVsOuterHeight2.png" />

## screenX and screenY

**只读**。返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。
