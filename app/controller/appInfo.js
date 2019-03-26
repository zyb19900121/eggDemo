"use strict";

const Controller = require("egg").Controller;

class AppInfoController extends Controller {
  async index() {
    const { ctx } = this;
		// const payload = ctx.query;
		
    const result = await ctx.service.appInfo.index();
    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.appInfo.show(id);
    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = AppInfoController;
