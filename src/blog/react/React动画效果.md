# React 动画效果

## 简单的动画

一些简单动画可以通过添加对应的类实现。

jsx

```jsx
render() {
    return (
      <Fragment>
        <div className={this.state.show ? "show" : "hide"}>home</div>
        <button onClick={this.handleToggle}>toggle</button>
      </Fragment>
    );
  }
```

css

transiton 和 animation

```css
.show {
  /* opacity: 1;
  transition: all 1s ease-out; */

  animation: show-item 2s ease-in forwards;
}

.hide {
  /* opacity: 1;
  transition: all 1s ease-in; */

  animation: hide-item 2s ease-in forwards;
}

@keyframes show-item {
  0% {
    opacity: 0;
    color: red;
  }
  50% {
    opacity: 0.5;
    color: green;
  }
  100% {
    opacity: 1;
    color: blue;
  }
}

@keyframes hide-item {
  0% {
    opacity: 1;
    color: red;
  }
  50% {
    opacity: 0.5;
    color: green;
  }
  100% {
    opacity: 0;
    color: blue;
  }
}
```

## 使用 react-transition-group 实现动画

CSSTransition 针对单个组件或元素。

### CSSTransition 组件

```jsx
import { CSSTransition } from 'react-transition-group';
<CSSTransition
  in={state === 'entered'}
  timeout={300}
  classNames="my" //样式名前缀
  unmountOnExit //移除对应的dom
  appear={true} //第一次出现时也需要动画效果
  onEntered={el => (el.style.color = 'blue')} //回调
>
  <div className="star">⭐</div>
</CSSTransition>;
```

组件会在不同的时刻添加不同的样式名，`classNames="fade"` 适用于 `fade-appear，fade-appear-active，fade-enter，fade-enter-active，fade-enter-done， fade-exit，fade-exit-active，fade-exit-done`

也可单独指定

```jsx
classNames={{
 appear: 'my-appear',
 appearActive: 'my-active-appear',
 enter: 'my-enter',
 enterActive: 'my-active-enter',
 enterDone: 'my-done-enter',
 exit: 'my-exit',
 exitActive: 'my-active-exit',
 exitDone: 'my-done-exit,
}}
```

例如

```css
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 1s ease-in;
}
.fade-enter-done {
  opacity: 1;
}
```

### TransitionGroup 组件

TransitionGroup 针对一组元素或组件，内部的单个元素或组件仍要使用 CSSTransition

```jsx
import { CSSTransition, TransitionGroup } from 'react-transition-group';

<TransitionGroup className="todo-list">
  {items.map(({ id, text }) => (
    <CSSTransition key={id} timeout={500} classNames="fade">
      <ListGroupItem>
        <Button
          className="remove-btn"
          type="button"
          bsStyle="danger"
          bsSize="xs"
          onClick={() => {
            this.setState(state => ({
              items: state.items.filter(item => item.id !== id)
            }));
          }}
        >
          &times;
        </Button>
        {text}
      </ListGroupItem>
    </CSSTransition>
  ))}
</TransitionGroup>;
```
