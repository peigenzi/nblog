# axios 封装

一般情况下，一个完整的前端 UI 交互到服务端处理的流程是这样的：

- UI 交互操作
- 调用 api 请求函数
- 获取服务端返回
- 更新 data

为了方便项目的管理维护，api 请求处理都会统一管理。一般是将请求放在 `@/src/api` 文件夹中，并按照 `model` 拆分。如：

```shell
|-- api
  |-- login.js
  |-- article.js
  ...
```

## request.js

`@/src/utils/request.js` 是基于 `axios` 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误处理等。对 `axios` 的封装主要包括全局 `request拦截器`、`response拦截器`、`统一错误处理`、`统一超时处理`、`baseURL设置`、`token设置`等。

```js
import { axios } from 'axios'

class HttpRequest {

  _getInsideConfig() {
    const config = {
      
    }

    return config
  }

  interceptore(instance) {
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })
  }
}
```
