# Scss 常用函数

## 颜色函数

### lighten($color,$amount)

让颜色变亮。

```scss
lighten(#f36,50%) //把#f36颜色亮度提高50%
```

### darken($color,$amount)

让颜色变暗。

```scss
darken(#f36,50%) //把#f36颜色亮度降低50%
```

## 字符串函数

### unquote()

删除字符串最前和最后的引号引号。如果这个字符串没有带有引号，将返回原始的字符串。

```scss
.test1 {
  content: unquote('Hello Scss!');
}

// 编译为
.test1 {
  content: Hello Scss!;
}
```

## 数字函数

### percentage()

将一个不带单位的数字转换成百分比形式。

### round()

将一个数四舍五入为一个最接近的整数。

### ceil()

将一个数转换成最接近于自己的整数。

### floor()

一个数去除其小数部分，并且不做任何的进位。

### abs()

返回一个数的绝对值。
