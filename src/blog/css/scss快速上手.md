# Scss 快速上手

## @mixin

`mixin` 是直接把代码编译到使用的地方。

```scss
@mixin clearfix() {
  &::after {
    display: table;
    clear: both;
    content: '';
  }
}

// a,b 分开，且都会包含 clearfix 的代码
.a {
  @include clearfix();
}
.b {
  @include clearfix();
}
```

## @extend

`extend` 会合并选择器，将使用到继承样式的选择器写到一起。

同一个选择器可以延伸给多个选择器，它所包含的属性将继承给所有被延伸的选择器。

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}

// 编译为
.error,
.seriousError {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```

::: tip 使用场景
**`extend` 可以编译出更小的代码，但场景更复杂或者需要变量来控制样式时更适合用 `mixin`**
:::

### 占位符选择器

有时，需要定义一套样式并不是给某个元素用，而是只通过 @extend 指令使用，可以使用占位符选择器。当它们单独使用时，不会被编译到 CSS 文件中。

```scss
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}

.notice {
  @extend %extreme;
}

// 编译为
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```

## 差值语句 #{}

通过 `#{}` 插值语句可以在选择器或属性名中使用变量。

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}

// 编译为
p.foo {
  border-color: blue;
}
```

## @each

指令格式是 `$var in <list>`。`$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。 `$var` 可以有多个。

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// 编译为
.puma-icon {
  background-image: url('/images/puma.png');
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
}
.egret-icon {
  background-image: url('/images/egret.png');
}
.salamander-icon {
  background-image: url('/images/salamander.png');
}

// --------------------------------
// 多个
@each $animal, $color, $cursor in (puma, black, default), (
    sea-slug,
    blue,
    pointer
  ), (egret, white, move)
{
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}

// 编译为
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default;
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer;
}
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move;
}

// --------------------------------
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
// 编译为
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
}
h3 {
  font-size: 1.2em;
}
```

## @for

`through` 与 `to` 的含义：当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值。
`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
// 编译为
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```
