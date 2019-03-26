"use strict";

const Controller = require("egg").Controller;
class GameController extends Controller {
  async index() {
    const { ctx } = this;
    const payload = ctx.query;
    try {
      const result = await ctx.service.game.index(payload);
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
    const result = await ctx.service.game.show(id);
    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 200;
  }
  async create() {
    const { ctx, service } = this;

    this.ctx.validate({
      gameName: {
        type: "string",
        required: true
      }
    });

    let game = {};
    game.game_name = ctx.request.body.gameName;
    game.game_name_en = ctx.request.body.gameNameEn;
    game.game_type = ctx.request.body.gameType.join(",");
    game.game_language = ctx.request.body.gameLanguage.join(",");
    game.game_score = ctx.request.body.gameScore;
    game.game_cover = ctx.request.body.gameCover;
    game.game_developers = ctx.request.body.gameDevelopers;
    game.game_publisher = ctx.request.body.gamePublisher;
    game.platform = ctx.request.body.platform;
    game.is_sold = ctx.request.body.isSold;
    game.sale_date = ctx.request.body.saleDate;
    game.game_desc = ctx.request.body.gameDesc;

    try {
      const result = await service.game.create(game);
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

    console.log("ctx.request.body: ", Boolean(ctx.request.body.gameName));

    if (ctx.request.body.gameName) {
      this.ctx.validate({
        gameName: {
          type: "string",
          required: true
        }
      });

      let game = {};
      game.game_name = ctx.request.body.gameName;
      game.game_name_en = ctx.request.body.gameNameEn;
      game.game_score = ctx.request.body.gameScore;
      game.game_type = ctx.request.body.gameType.join(",");
      game.game_language = ctx.request.body.gameLanguage.join(",");
      game.game_cover = ctx.request.body.gameCover;
      game.game_developers = ctx.request.body.gameDevelopers;
      game.game_publisher = ctx.request.body.gamePublisher;
      game.platform = ctx.request.body.platform;
      game.is_sold = ctx.request.body.isSold;
      game.sale_date = ctx.request.body.saleDate;
      game.game_desc = ctx.request.body.gameDesc;

      try {
        const result = await service.game.update(id, game);
        // 设置响应体和状态码
        ctx.body = result;
        ctx.status = 200;
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.toString() };
      }
    } else {
      try {
        const result = await service.game.update(id);
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
      const result = await service.game.destroy(id);
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
