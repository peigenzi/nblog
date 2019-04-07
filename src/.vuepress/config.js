const path = require('path');

module.exports = {
  title: 'peigenzi的博客',
  description: '记录生活，记录成长',

  base: '/nblog/',
  dest: path.resolve(__dirname, '../../docs'),

  themeConfig: {
    docsDir: '/blog',
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'External',
        link: 'https://www.google.com'
      },
      {
        text: '关于',
        link: '/about'
      }
      // {
      //   text: 'Languages',
      //   items: [{
      //       text: 'Chinese',
      //       link: '/language/chinese'
      //     },
      //     {
      //       text: 'Japanese',
      //       link: '/language/japanese'
      //     }
      //   ]
      // }
    ],

    sidebar: [
      {
        title: 'JavaScript',
        collapsable: false,
        children: [
          '/blog/js/new',
          '/blog/js/instanceof',
          '/blog/js/defineProperty',
          '/blog/js/Event 自定义事件',
          '/blog/js/content-type',
          '/blog/js/FileReader',
          '/blog/js/formData',
          '/blog/js/元素的尺寸',
          '/blog/js/window的尺寸',
          '/blog/js/鼠标手指相关距离',
          '/blog/js/getBoundingClientRect',
          '/blog/js/reduce的使用',
          '/blog/js/Promise改造回调函数',
          '/blog/js/为原生API添加功能',
          '/blog/js/jwt',
          '/blog/js/监控长任务',
          // '/blog/js/axios封装',
          '/blog/js/note-nunjucks'
        ]
      },
      {
        title: 'CSS',
        collapsable: false,
        children: [
          '/blog/css/css技巧',
          '/blog/css/重置样式',
          '/blog/css/常用媒体查询',
          '/blog/css/bem总结',
          '/blog/css/css3动画',
          '/blog/css/scss快速上手',
          '/blog/css/scss常用函数',
          '/blog/css/栅格系统',
          '/blog/css/table总结'
        ]
      },
      {
        title: 'Underscore',
        collapsable: false,
        children: [
          '/blog/underscore/整体架构'
        ]
      },
      {
        title: 'jQuery',
        collapsable: false,
        children: [
          '/blog/jquery/jQuery架构',
          '/blog/jquery/jQuery deferred'
        ]
      },
      {
        title: 'Vue',
        collapsable: false,
        children: [
          '/blog/vue/Vue书写风格',
          '/blog/vue/Vue插件编写',
          'blog/vue/Vue动画效果',
          '/blog/vue/可从外部关闭下拉菜单的Vue指令',
          '/blog/vue/事件派发与广播',
          '/blog/vue/找到任意组件实例的方法'
        ]
      },
      {
        title: 'React',
        collapsable: false,
        children: ['/blog/react/React动画效果']
      },
      {
        title: '小程序',
        collapsable: false,
        children: ['/blog/小程序/小程序登录鉴权.md']
      },
      {
        title: '工程化',
        collapsable: false,
        children: [
          '/blog/工程化/gulp笔记',
          '/blog/工程化/babel笔记',
          '/blog/工程化/babel-polyfill笔记',
          '/blog/工程化/babel-preset-env常用配置',
          '/blog/工程化/webpack4常用配置',
          '/blog/工程化/webpack4笔记'
        ]
      },
      {
        title: 'Node.js',
        collapsable: false,
        children: [
          '/blog/node/模块导出'
        ]
      },
      {
        title: '性能',
        collapsable: false,
        children: ['/blog/performance/1使用 RAIL 模型评估性能']
      }
    ]

    // sidebar: {
    //   '/js/': [
    //     '',
    //     '1',
    //     'axios封装'
    //   ]
    // }
  }
};
