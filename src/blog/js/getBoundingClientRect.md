# getBoundingClientRect

`Element.getBoundingClientRect()` 方法返回元素的大小及其相对于视口的位置。

除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。它们的值是相对于视口的，而不是绝对的。如果你需要获得相对于整个网页左上角定位的属性值，那么只要给 top、left 属性值加上当前的滚动位置（通过 window.scrollX 和 window.scrollY），这样就可以获取与当前的滚动位置无关的值。

<img src="https://mdn.mozillademos.org/files/15087/rect.png"/>

```js
{
    // 元素左上角相对于视口左上角的距离
    top: 0,
    left: 0,

    // 元素右下角相对于视口左上角的距离
    right: 0,
    bottom: 0,

    width: 0,
    height: 0,
    // edge,ie,safari不支持
    x: 0,
    y: 0
}
```

## 图片懒加载功能

```js
class LazyLoad {
  constructor(options) {
    this.scrollListenerFn = this.scrollListenerFn.bind(this);
    this.resizeListenerFn = this.resizeListenerFn.bind(this);
  }

  init(params) {
    this.initParams(params);
    if (!this.lazyImages) {
      return;
    }

    this.throttleTimer = null;
    this.defaultImg && this.addDefaultImg();
    this.resizeListenerFn();
    this.bindEvent();
  }

  // 初始化外部参数
  initParams(params) {
    let elements = params.elements;

    if (!elements.length) {
      return;
    }

    let imgs = Array.prototype.slice.call(elements, 0);
    let reg = /(^|\s)lazy-bg(\s|$)/;
    // let reg = new RegExp('(^|\\s)' + 'lazy-bg' + '(\\s|$)')

    imgs.forEach(img => {
      if (reg.test(img.className)) {
        img.isBg = true;
      }
    });

    // 再次调用init时，无需进行部分参数初始化
    if (this.lazyImages) {
      this.lazyImages.length !== 0 && this.removeEvent();
      this.lazyImages = this.lazyImages.concat(imgs);
      return;
    }

    // 需要懒加载的图片
    this.lazyImages = imgs;
    // 加载时显示的默认图
    this.defaultImg = params.defaultImg;
    // 视口提前距离
    this.distance = params.distance || 0;
    // 存储真实地址的标签
    this.tag = params.tag || 'data-src';
    // 节流间隔
    this.throttle = params.throttle || 200;
  }

  bindEvent() {
    document.addEventListener('scroll', this.scrollListenerFn);
    window.addEventListener('resize', this.resizeListenerFn);
    window.addEventListener('orientationchange', this.resizeListenerFn);
  }

  removeEvent() {
    document.removeEventListener('scroll', this.scrollListenerFn);
    window.removeEventListener('resize', this.resizeListenerFn);
    window.removeEventListener('orientationchange', this.removeEventListener);
  }

  getWH() {
    this.W = document.documentElement.clientWidth || window.innerWidth;
    this.H = document.documentElement.clientHeight || window.innerHeight;
  }

  scrollListenerFn() {
    if (this.throttleTimer) {
      return;
    }
    this.throttleTimer = setTimeout(() => {
      this.throttleTimer = null;
      this.lazyLoad();
    }, this.throttle);
  }

  //需要获取宽高
  resizeListenerFn() {
    if (this.throttleTimer) {
      return;
    }
    this.throttleTimer = setTimeout(() => {
      this.throttleTimer = null;
      this.getWH();
      this.lazyLoad();
    }, this.throttle);
  }

  isInView(image) {
    let top = image.getBoundingClientRect().top;
    let left = image.getBoundingClientRect().left;
    let right = image.getBoundingClientRect().right;
    let bottom = image.getBoundingClientRect().bottom;
    // console.log(left <= this.W + this.distance && right >= 0 - this.distance);
    if (getComputedStyle(image).display !== 'none') {
      if (
        top <= this.H + this.distance &&
        bottom >= 0 - this.distance &&
        (left <= this.W + this.distance && right >= 0 - this.distance)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  lazyLoad() {
    this.lazyImages.forEach(image => {
      if (this.isInView(image)) {
        this.loader(image);
      }
    });
  }

  loader(image) {
    let img = new Image();
    let imgUrl = image.getAttribute(this.tag);
    let self = this;

    img.onload = function(e) {
      self.succ(image, imgUrl);
    };
    img.src = imgUrl;
  }

  addDefaultImg() {
    this.lazyImages.forEach(image => {
      image.isBg
        ? (image.style.backgroundImage = `url('${this.defaultImg}')`)
        : image.setAttribute('src', this.defaultImg);
    });
  }

  succ(image, imgUrl) {
    image.isBg
      ? (image.style.backgroundImage = `url('${imgUrl}')`)
      : (image.src = imgUrl);
    this.lazyImages = this.lazyImages.filter(img => {
      return img !== image;
    });

    if (this.lazyImages.length === 0) {
      this.removeEvent();
    }
  }

  fail() {}

  _hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');

    return reg.test(el.className);
  }
}
```

使用

```js
let lazy = new LazyLoad();
lazy.init({
  elements: document.querySelectorAll('.lazy'),
  distance: 20,
  defaultImg: '//misc.360buyimg.com/mtd/pc/common/img/no_login.jpg',
  tag: 'data-src',
  throttle: 200
});
setTimeout(() => {
  lazy.init({ elements: document.querySelectorAll('.lazy-bg') });
}, 1000);
```
