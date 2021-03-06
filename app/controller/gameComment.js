"use strict";

const Controller = require("egg").Controller;
const utils = require("../utils/filterEmoji");

class GameCommentController extends Controller {
  async index() {
    // const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 user
    const { ctx, service } = this;
    // 组装参数
    try {
      const payload = ctx.query;
      const result = await service.gameComment.index(payload);
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
    console.log("ctx.params: ", ctx.params);
    const result = await ctx.service.gameComment.show(id);
    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 200;
  }

  async create() {
    const ctx = this.ctx;
    let newComment = {};

    //过滤emoji
    for (const key in ctx.request.body) {
      newComment[key] = utils.filterEmoji(ctx.request.body[key]);
    }
    console.log("newComment: ", newComment);
    try {
      const result = await ctx.service.gameComment.create(newComment);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.toString() };
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
      const result = await service.gameComment.destroy(ids);
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

module.exports = GameCommentController;
