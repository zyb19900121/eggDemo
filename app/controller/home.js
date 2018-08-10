'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '服务已启动';
	}
	async test() {
    this.ctx.body = '测试已启动';
  }
}

module.exports = HomeController;
