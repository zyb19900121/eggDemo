# 项目介绍
本项目（目前开发进度0.01%）是基于[egg.js][egg]框架开发的专门为前端提供RESTful接口的后端项目。

写本项目的初衷就是想在工作生活的闲暇之余多学点东西，后端选择node也是想将本人弱掉渣的js能力提高一点，也为将来的全栈之路打上一点微薄的基础。

现在与之配合的前端实现是正在写的一个微信小程序（也纯为练手），日后计划再利用 [vue][vue] + [element-ui][element-ui] 写个后台管理系统。这一套具体啥时候能写完就不得而知了。

核心内容就不讲了（主要没啥可讲的，都是官方文档走的），反正也没人看。


重要更新（2018-08-21）：

	1.添加manage的接口和用户登录接口（用于后台管理项目，小程序调用的接口为api开头，后台管理系统的接口为manage开头）
	2.对manage和login接口进行token校验（利用egg-jwt）

最近工作有点忙，开发的进度比较慢。。。而且现在的开发重点在后端管理上面。。。 特别细小的改动就不记录了

小更新（2018-08-25）：

	1.对部分接口实现了分页查询
	2.对错误处理进行了优化
	
小更新（2018-08-26）：

	1.实现访问日志接口（log）的单条删除与多条删除 http://host/manage/log/1,2,3 请求方法是DELETE 
	  与get不同的是参数是以url/ids的形式发送到后台的，而不是url?querystring的方式（RESTful api的风格）。
	
更新（2018-08-30）：

	1.修改访问日志和评论的列表查询接口（优化了条件查询），将原有的方式（不支持between查询）改为了执行sql语句的方式，
	  但使用了拼接sql语句，这样可能会导致sql注入，后期将会优化。

更新（2018-09-01）：

	1.优化游戏列表接口（对需要根据游戏进行筛选的功能，修改了返回值）
	2.优化了评论列表接口（利用left join 将游戏名称添加到了返回值中）

重要更新（2018-09-03）：

	1.实现文件上传接口（/manage/fileUpload） 大体是跟着官方文档走的，
	  不同的是利用node的fs将文件保存到本地（目前是将文件保存到项目中，
	  后期优化会利用nginx起个静态资源服务与项目脱离），
	  实现中用了两个依赖 await-stream-ready 主要是方便的使用 await 进行文件上传，
	  而 stream-wormhole 是因为如果上传失败出现异常，那会导致浏览器响应崩溃，因此需要将 stream 消耗掉。

	
	
未完待续。。。




<!-- ## 快速入门

在此次添加使用文档 

如需进一步了解，参见 [egg 文档][egg]。 -->

### 本地开发

```bash
$ npm i
$ npm run dev
通过修改config/config.default.js来配置环变量
```

### 部署

```bash
$ npm start
$ npm stop
通过修改config/config.prod.js来配置环变量
```

<!-- ### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。
-->
[egg]: https://eggjs.org 
[vue]: https://cn.vuejs.org/v2/guide/
[element-ui]: http://element-cn.eleme.io/2.4/#/zh-CN/component/installation 
