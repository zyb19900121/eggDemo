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
    let gameCompany = {};
    gameCompany.company_name_cn = ctx.request.body.companyNameCn;
    gameCompany.company_name_en = ctx.request.body.companyNameEn;
    gameCompany.company_desc = ctx.request.body.companyDesc;
    gameCompany.order = ctx.request.body.companyOrder;
    try {
      const result = await ctx.service.gameCompany.create(gameCompany);
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }

    // 设置响应体和状态码
  }

  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    let gameCompany = {};
    gameCompany.company_name_cn = ctx.request.body.companyNameCn;
    gameCompany.company_name_en = ctx.request.body.companyNameEn;
    gameCompany.company_desc = ctx.request.body.companyDesc;
    gameCompany.order = ctx.request.body.companyOrder;
    try {
      const result = await ctx.service.gameCompany.update(id, gameCompany);
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }

    // 设置响应体和状态码
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const result = await ctx.service.gameCompany.show(id);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
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
