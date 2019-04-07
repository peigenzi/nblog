# jwt

最近几年 Restful API 及 SPA(单页面应用) 的盛行。前端越来越多得使用 jwt 来管理用户会话和授权。

jwt 两大使用场景：

- Authorization(授权)：jwt 将数据加密存储，分发给前端，前端将其放在特定的 header 字段中，服务器收到请求后，解析 jwt 判断用户身份，对用户请求进行限权。
- Information Exchange(数据交换): jwt 可以通过公钥和私钥对信息进行加密，双方通信后，互得数据。

## access_token 和 refresh_token

在一般 jwt 应用中，access_token 和 refresh_token 是一对相互帮助的好搭档，用户在前端登陆后，服务器会发送 access_token 和 refresh_token 给前端，前端在得到这两个 token 之后必须谨慎存储。

- access_token：用来用户鉴权，控制用户对接口，资源的访问。access_token 十分重要，它是服务器对前端有力控制的唯一途径，故一般其生存周期十分短，一般在 2 个小时左右，更有甚者，其生命周期只有 15 分钟。

- refresh_token：用户通过登陆后获得 access_token，而 access_token 的生命周期十分短暂，但是用户登陆太频繁会严重影响体验，因此需要一种**免登陆便能获取 access_token 的方式**。refresh_token 主要用来解决该问题，refresh_token 的生命周期较长，一般为 30 天左右，但 **refresh_token 不能被用来用户身份鉴权和获取资源，它只能被用来重新获取 access_token**。当前端发现 access_token 过期时，便应通过 refresh_token 重新获取 access_token。
