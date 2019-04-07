# css3 动画

css3 动画分为两种。`过渡动画` 和 `关键帧动画`。

## 过渡动画

`transition` ， 就是从初始状态过渡到结束状态的过程中产生的动画。状态就是指大小、位置、颜色、变形等属性。过渡动画只能定义首尾两个状态。

要想使一个元素产生过渡动画，首先要在这个元素上用 `transition` 属性定义动画的各种参数，然后再改变元素的状态。

### 参数

- transition-property：规定对哪个属性进行过渡

- transition-duration：定义过渡的时间，默认是 0

- transition-timing-function：定义过渡动画的缓动效果，如淡入、淡出等，默认是 ease

- transition-delay：规定过渡效果的延迟时间，即在过了这个时间后才开始动画，默认是 0

```css
div {
  width: 200px;
  /* transition-property: width;
  transition-duration: 1s;
  transition-timing-function: ease;
  transition-delay: 1s; */

  transition: width 1s ease 1s;

  /* 多个过渡属性时用逗号隔开 */
  /* transition: width 1s, height:2s; */
}

div.on {
  width: 300px;
}
```

## 关键帧动画

关键帧动画则可以定义任意多的关键帧，因而能实现更复杂的动画效果。

```css
@keyframes 动画名称{

      时间点 {元素状态}

      时间点 {元素状态}

      …

}
```

时间点之后的花括号里则是元素的状态属性集合，描述了这个元素在这个时间点的状态。一般来说，0%和 100%这两个关键帧是必须要定义的。

要想使一个元素产生帧动画，这个动画名绑定到某个要进行动画的元素的 `animation` 上就行了。

### 参数

- animation-name：关键帧名称
- animation-duration：动画完成时间，默认 0
- animation-timing-function：动画缓动效果，默认 'ease'
- animation-delay：动画延迟，默认 0
- animation-iteration-count：动画播放次数，默认 1
- animation-direction：动画是否在下一周期逆向播放，默认 'normal'
- animation-play-state：动画是否正在运行或暂停，默认 'running'
- animation-fill-mode：动画时间之外的状态，即动画不播放时，要应用到元素的样式。

animation 可以属性简写到一个 animation 中，使用默认值的也可以省略掉。**但 animation-play-state 属性不能简写到 animation 中**。

`animation-fill-mode` 是当前元素的状态是否保留动画最后一帧的状态或者未开始之前使用第一帧的样式。这个属性默认是不保留状态，也就是说开始之前是原始状态，开始之后才开始转换样式，结束之后会立刻切换至原始状态，仿佛这个动画不曾存在过。`forwards` 表示当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。`backwards` 表示在 `animation-delay` 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。`both` 表示动画遵循 forwards 和 backwards 的规则。

```css
@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

div {
  animation: fade 1s;
}
```
