# 使用 RAIL 模型评估性能

`RAIL` 是 `response`, `animation`, `idle`, `loading` 的缩写。
RAIL 是一种以用户为中心的性能模型。每个网络应用均具有与其生命周期有关的四个不同方面，且这些方面以不同的方式影响着性能。

## 几个实践

- 以用户为中心；最终目标不是让您的网站在任何特定设备上都能运行很快，而是使用户满意。
- 立即响应用户；在 **100 毫秒**以内确认用户输入。
- 设置动画或滚动时，在 **10 毫秒**以内生成帧。
- 最大程度增加主线程的空闲时间。
- 持续吸引用户；在 **1000 毫秒**以内呈现交互内容。

## 以用户为中心

用户如何评价性能延迟:

- 0 - 16 毫秒：用户可以感知每秒渲染 60 帧的平滑动画转场。也就是每帧 16 毫秒（包括浏览器将新帧绘制到屏幕上所需的时间），留给应用大约 10 毫秒的时间来生成一帧。
- 0 - 100 毫秒：在此时间窗口内响应用户操作，他们会觉得可以立即获得结果。时间再长，操作与反应之间的连接就会中断。
- 100 - 300 毫秒：用户会遇到轻微可觉察的延迟。
- 300 - 1000 毫秒：在此窗口内，延迟感觉像是任务自然和持续发展的一部分。对于网络上的大多数用户，加载页面或更改视图代表着一个任务。
- 1000+ 毫秒：用户的注意力将离开他们正在执行的任务。
- 10,000+ 毫秒：用户感到失望，可能会放弃任务。

## 响应：在 100 毫秒以内响应

这适用于大多数输入，不管他们是在点击按钮、切换表单控件还是启动动画。但不适用于触摸拖动或滚动。

使用此 100 毫秒窗口执行其他开销大的工作时，需要谨慎，以免妨碍用户。如果可能，请在后台执行工作。

对于需要超过 **500 毫秒**才能完成的操作，请始终提供反馈。

## 动画：在 10 毫秒内生成一帧

目标就是每秒生成 60 帧，每一帧必须完成以下所有步骤：`js->style->layout->paint->composite`

因为浏览器需要花费时间将新帧绘制到屏幕上，大约只有 10 毫秒来执行代码。

## 空闲：最大程度增加空闲时间

利用空闲时间完成推迟的工作。例如，尽可能减少预加载数据，以便您的应用快速加载，并利用空闲时间加载剩余数据。

推迟的工作应分成每个耗时约 **50 毫秒**的多个块。如果用户开始交互，优先级最高的事项是响应用户。

要实现小于 100 毫秒的响应，应用必须在每 50 毫秒内将控制返回给主线程，这样应用就可以执行其像素管道、对用户输入作出反应，等等。

## 加载：在 1000 毫秒以内呈现内容

在 1 秒钟内加载您的网站。否则，用户的注意力会分散，他们处理任务的感觉会中断。

但无需在 1 秒内加载所有内容以产生完整加载的感觉。启用渐进式渲染和在后台执行一些工作。

| RAIL 步骤 | 关键指标 | 用户操作|
|-----------|----------|---------|
| 响应 | 100ms | 点击按钮 |
| 动画 | 10ms | 用户滚动页面，拖动手指（例如，打开菜单）或看到动画。 拖动时，应用的响应与手指位置有关（例如，拉动刷新、滑动轮播）。 此指标仅适用于拖动的持续阶段，不适用于开始阶段。|
| 空闲 | 50ms | 用户没有与页面交互，但主线程应足够用于处理下一个用户输入。|
| 加载 | 1000ms | 用户加载页面并看到关键路径内容。|