"use strict";

// had enabled by egg
// exports.static = true;

//校验参数
exports.validate = {
  enable: true,
  package: "egg-validate"
};

//跨域插件
exports.cors = {
  enable: true,
  package: "egg-cors"
};

//mysql数据库
exports.mysql = {
  enable: true,
  package: "egg-mysql"
};

//jwt
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};
