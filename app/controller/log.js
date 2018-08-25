"use strict";

const Controller = require("egg").Controller;

class LogController extends Controller {
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);

    try {
      const result = await ctx.service.log.index(payload);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = {err:'系统错误'};
      ctx.status = 500;
    }
  }

  async create() {
    const { ctx } = this;
    const result = await ctx.service.log.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = LogController;
