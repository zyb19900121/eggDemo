"use strict";

const Controller = require("egg").Controller;
class GameController extends Controller {
  async index() {
    const { ctx } = this;
    const payload = ctx.query;
    try {
      const result = await ctx.service.gameReact.index(payload);
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
    const result = await ctx.service.gameReact.show(id);
    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 200;
  }
  async create() {
    const { ctx, service } = this;

    this.ctx.validate({
      game_name: {
        type: "string",
        required: true
      }
    });

    let game = ctx.request.body;

    game.game_type = game.game_type && game.game_type.join(",");
    game.game_language = game.game_language && game.game_language.join(",");
    game.is_sold = game.is_sold ? "1" : "0";

    try {
      const result = await service.gameReact.create(game);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.toString() };
    }
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;

    if (ctx.request.body.game_name) {
      this.ctx.validate({
        game_name: {
          type: "string",
          required: true
        }
      });

      let game = ctx.request.body;

      game.game_type = game.game_type && game.game_type.join(",");
      game.game_language = game.game_language && game.game_language.join(",");
      game.is_sold = game.is_sold ? "1" : "0";

      try {
        const result = await service.gameReact.update(id, game);
        // 设置响应体和状态码
        ctx.body = result;
        ctx.status = 200;
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.toString() };
      }
    } else {
      try {
        const result = await service.gameReact.update(id);
        // 设置响应体和状态码
        ctx.body = result;
        ctx.status = 200;
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.toString() };
      }
    }
  }
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);
    try {
      const result = await service.gameReact.destroy(id);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }
}

module.exports = GameController;
