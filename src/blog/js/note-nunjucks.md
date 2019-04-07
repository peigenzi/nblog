# nunjucks 笔记

## 文件拓展名

可用任意拓展名来命名 `Nunjucks` 模板或文件，但推荐使用 `.njk`

## 变量

可以像 `js` 一样获取变量属性

```njk
{{username}}
{{foo['bar']}}
```

变量的值为 `undefined` 或者 `null` 将不显示，对象也一样。

## 过滤器

过滤器是一些可以执行变量的函数，通过管道操作符 `|` 调用，并可以接受参数。

```njk
{{foo | title}}
{{foo | join(",")}}
{{foo | replace("foo", "bar") | capitalize}} //链式过滤器
```

可以自定义过滤器。

## 模板继承

写模板时可定义 `block` ，子模板可以覆盖他，同时支持多层继承。

```njk
//父 .parent.njk
{% block header %}
This is the default content
{% endblock %}

<section class="left">
    {% block left %}{% endblock %}
</section>

<section class="right">
    {% block right %}
    This is more content
    {% endblock %}
</section>

//子
{% extends "parent.njk" %}

{% block left %}
This is the left side
{% endblock %}

{% block right %}
This is the right side
{% endblock %}

//result
This is the header content

<section class="left">
    This is the left side
</section>

<section class="right">
    This is the right side
</section>
```

模板可以是一个变量，就可以动态指定继承的模板。

```njk
{% extends parentTpl %}
```

`extends` 可以接受任意表达式，只要它最终返回一个字符串或是模板所编译的对象。

```njk
{% extends name + ".html" %}
```

## super

可以调用 `super` 将父级区块中的内容渲染到子区块。

```njk
//如果前面的子模板是这样
{% block right %}
{{ super() }}
Right side
{% endblock %}

//result
This is more content
Right side
```

## 标签

标签是一些特殊的区块，可以对模板执行一些操作。可自定义标签

### if

```njk
{% if flag %}
    It is true
{% endif %}


{% if A % }
    a
{% elif B %}
    b
{% else %}
    c
{% endif %}
```

### for

可以遍历数组和对象

```njk
//js
var items = [{title: 'foo', id: 1}, {title: 'bar', id: 2}]

<h1>for</h1>
<ul>
{% for item in items %}
<li>{{item.title}}</li>
{% else %}
    <li>items</li>
{% endfor %}>
</ul>


//js Nunjucks 会将数组解开，数组内的值对应到变量
var points = [[0, 1, 2], [5, 6, 7], [12, 13, 14]];

{% for x, y, z in points %}
  Point: {{ x }}, {{ y }}, {{ z }}
{% endfor %}
```

在循环中可获取一些特殊的变量

-   `loop.index`: 当前循环数 (1 indexed)
-   `loop.index0`: 当前循环数 (0 indexed)
-   `loop.revindex`: 当前循环数，从后往前 (1 indexed)
-   `loop.revindex0`: 当前循环数，从后往前 (0 based)
-   `loop.first`: 是否第一个
-   `loop.last`: 是否最后一个
-   `loop.length`: 总数

### macro

定义可复用的内容，类似函数。

```njk
{% macro field(name, value='', type='text') %}
<div class="field">
  <input type="{{ type }}" name="{{ name }}"
         value="{{ value | escape }}" />
</div>
{% endmacro %}

//field 可当函数一样使用了
{{ field('user') }}
{{ field('pass', type='password') }}
```

还可以从其他模板 `import` 宏，可以使宏在整个项目中复用。

### set

用于设置和修改变量。

```njk
{{ username }}
{% set username = "joe" %}
{{ username }}
```

未完

### block

区块定义了模板片段并标识了一个名字，在模板中**继承**使用。父级模板可指定一个区块，子模板覆盖这个区块。

```njk
{% block css %}
<link rel="stylesheet" href="app.css" />
{% endblock %}

//在循环中定义块
{% for item in items %}
{% block item %}{{ item }}{% endblock %}
{% endfor %}
```

### include

用于引入其他模板，可在多模板之间共享一些小模板。

```njk
{% include "item.html" %}

//循环中引入模板
{% for item in items %}
{% include "item.html" %}
{% endfor %}

//可以接受任意表达式，只要它最终返回一个字符串或是模板所编译成的对象
{% include name + ".html" as obj %}

//希望模板文件不存在时不要抛出异常
{% include "missing.html" ignore missing %}
```

当我们需要改变页面时，我们可以渲染这些小部分的模板，而非一整个的大的模板。

### import

### raw

### filter

`filter` 区块允许我们使用区块中的内容来调用过滤器。不同于使用 `|` 语法，它会将区块渲染出的内容传递给过滤器。

```njk
{% filter title %}
may the force be with you
{% endfilter %}

{% filter replace("force", "forth") %}
may the force be with you
{% endfilter %}
```

**不能在这些区块中进行任何异步操作**

### call

`call` 区块允许你使用标签之间的内容来调用一个宏。这在你需要给宏传入大量内容时是十分有用的。在宏中，你可以通过 `caller()` 来获取这些内容。

```njk
{% macro add(x, y) %}
{{ caller() }}: {{ x + y }}
{% endmacro%}

{% call add(1, 2) -%}
The result is
{%- endcall %}

输出The result is: 3
```

## 关键字参数

```njk
{{ foo(1, 2, bar=3, baz=4) }}

//定义宏的时候也可以使用关键字参数，定义参数值时可设置默认值
{% macro foo(x, y, z=5, w=6) %}
{{ x }}, {{ y }}, {{ z }}, {{ w}}
{% endmacro %}

{{ foo(1, 2) }}        -> 1, 2, 5, 6
{{ foo(1, 2, w=10) }}  -> 1, 2, 5, 10
```

## 注释

```njk
{# Loop through all the users #}
{% for user in users %}...{% endfor %}
```

## 空白字符控制

模板在正常情况会将变量 (variable) 和标签区块 (tag blocks) 周围的空白字符完全输出。
可以在开始和结束区块 (start or end block tag) 添加 (-) 来去除前面和后面的空白字符。

```njk
{% for i in [1,2,3,4,5] -%}
  {{ i }}
{%- endfor %}
```

`-%}` 会去除标签右侧的空白字符，`{%-` 会去除标签之前的空白字符

## 自动转义

如果在环境变量中设置了 autoescaping，所有的输出都会自动转义，但可以使用 safe 过滤器，Nunjucks 就不会转义了。

```njk
{{ foo }}           // &lt;span%gt;
{{ foo | safe }}    // <span>
```

如果未开启 autoescaping，所有的输出都会如实输出，但可以使用 escape 过滤器来转义。

```njk
{{ foo }}           // <span>
{{ foo | escape }}  // &lt;span&gt;
```

## 全局函数

### range([start], stop, [step])

```njk
{% for i in range(0, 5) -%}
  {{ i }},
{%- endfor %}

0,1,2,3,4
```

### cycler(item1, item2, ...itemN)

可以循环调用你指定的一系列的值

```njk
{% set cls = cycler("odd", "even") %}
{% for row in rows %}
  <div class="{{ cls.next() }}">{{ row.name }}</div>
{% endfor %}

//奇数行的 class 为 "odd"，偶数行的 class 为 "even"。你可以使用current属性来获取当前项,在上面的例子中对应cls.current
```

### joiner([separator])

当合并多项的时候，希望在他们之间又分隔符 (像逗号)，但又不希望第一项也输出。joiner 将输出分割符 (默认为 ",") 除了第一次调用。

```njk
{% set comma = joiner() %}
{% for tag in tags -%}
  {{ comma() }} {{ tag }}
{%- endfor %}

//如果 tags 为 ["food", "beer", "dessert"], 上面将输出 food, beer, dessert
```
