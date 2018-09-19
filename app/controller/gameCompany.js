"use strict";

const Controller = require("egg").Controller;

class GameCompanyController extends Controller {
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);

    try {
      const result = await ctx.service.gameCompany.index(payload);

      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }

  async create() {
    const { ctx } = this;
    const result = await ctx.service.gameCompany.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    let ids = id.split(",");
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);
    try {
      const result = await service.gameCompany.destroy(ids);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }
}

module.exports = GameCompanyController;
