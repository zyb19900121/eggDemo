"use strict";

const Controller = require("egg").Controller;

class GameTypeController extends Controller {
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);

    try {
      const result = await ctx.service.gameTypeReact.index(payload);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const result = await ctx.service.gameTypeReact.show(id);
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
    let gameType = {};
    gameType.type_name_cn = ctx.request.body.typeNameCn;
    gameType.type_name_en = ctx.request.body.typeNameEn;
    gameType.type_desc = ctx.request.body.typeDesc;
    gameType.order = ctx.request.body.typeOrder;
    try {
      const result = await ctx.service.gameTypeReact.create(gameType);
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }

  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    let gameType = {};
    gameType.type_name_cn = ctx.request.body.typeNameCn;
    gameType.type_name_en = ctx.request.body.typeNameEn;
    gameType.type_desc = ctx.request.body.typeDesc;
    gameType.order = ctx.request.body.typeOrder;
    try {
      const result = await ctx.service.gameTypeReact.update(id, gameType);
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
      const result = await service.gameTypeReact.destroy(ids);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      console.log("error: ", error);
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }
}

module.exports = GameTypeController;
