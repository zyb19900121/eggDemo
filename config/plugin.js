'use strict';

// had enabled by egg
// exports.static = true;

//跨域插件
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

//mysql数据库
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};