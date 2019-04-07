# table 总结

`table` 设置 `border: 1px solid #000` 时，整个表格外面会有边框。

`th`, `td` 设置 `border: 1px solid #000` 时，单元格周围会出现边框。默认有一定的间距。


`table` 的 `border-collapse` 设置表格的边框是否被合并为一个单一的边框。

`border-collapse` 的值
- separate：不合并
- collapse：合并，即相邻单元格之间共享边框
- inherit：继承

`th` 和 `td` 有独立的边框，`tr `并无边框。设置 `border-collapse` 合并后才可以对 `tr` 设置边框。

`table` 的 `border-spacing` 设置两个单元格之间空间的大小。 `0px` 是边框挨在一起，显得很粗。

`border-spacing:10px 50px;` 分别设置水平和垂直间距。**`border-collapse` 不为 `separate` 时忽略这个属性。**

`table` 没有设置宽度时，`th` 或 `td` 的宽度可以生效，设置了宽度则采用 `table` 的宽度。