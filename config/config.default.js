"use strict";

module.exports = appInfo => {
  const config = (exports = {});

  exports.cluster = {
    listen: {
      port: 3000,
      hostname: "127.0.0.1"
    }
  };

  config.cors = {
    // 所有域名可以访问
    origin: "*",
    // 跨域可支持的方法
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
    credentials: true
  };

  //修改post请求参数的大小限制
  exports.bodyParser = {
    jsonLimit: "10mb",
    formLimit: "10mb"
  };

  //mysql数据库基本信息
  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: "localhost",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "19900121",
      // 数据库名
      database: "joyzone"

      // charset : 'utf8mb4' 识别emoji
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  // 关闭csrf安全机制(前后端分离作用不大)
  exports.security = {
    csrf: false,
    // 跨域白名单
    domainWhiteList: ["http://localhost:9000"]
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1533605945307_6780";

  // add your config here
  config.middleware = [];

  //jwt相关配置
  exports.jwt = {
    secret: "zhangyanbin"
  };

  //jwt相关配置
  config.jwt = {
    secret: "Great4-M",
    enable: true, // default is false
    match: ["/manage"] // 需要认证的接口
  };

  return config;
};
