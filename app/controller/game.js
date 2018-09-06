"use strict";

const Controller = require("egg").Controller;

class GameController extends Controller {
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    console.log("payload: ", payload);
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 user
    const result = await ctx.service.game.index(payload);
    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 200;
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
    const { ctx } = this;
    console.log("ctx.request.body: ", ctx.request.body);
    this.ctx.validate({
      gameName: {
        type: "string",
        required: true
      }
    });

    let newGame = {};
    newGame.game_name = ctx.request.body.gameName;
    newGame.game_name_en = ctx.request.body.gameNameEn;
    newGame.game_type = ctx.request.body.gameType.join(',');
    newGame.game_cover = ctx.request.body.gameCover;
    newGame.is_sold = ctx.request.body.isSold;
    newGame.sale_date = ctx.request.body.saleDate;
    newGame.game_desc = ctx.request.body.gameDesc;

    try {
      const result = await ctx.service.game.create(newGame);
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
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);
    try {
      const result = await service.game.destroy(id);
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

module.exports = GameController;
