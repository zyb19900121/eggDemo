'use strict';

const Controller = require('egg').Controller;

class GameController extends Controller {
	async index() {
		const ctx = this.ctx;
		// 校验 `ctx.request.body` 是否符合我们预期的格式
		// 如果参数校验未通过，将会抛出一个 status = 422 的异常
		// ctx.validate(createRule, ctx.request.body);
		// 调用 service 创建一个 user
		const result = await ctx.service.game.index();
		// 设置响应体和状态码
		ctx.body = result;
		ctx.status = 200;
	}

	async show() {
		const ctx = this.ctx;
		const id = ctx.params.id
		const result = await ctx.service.game.show(id);
		// 设置响应体和状态码
		ctx.body = result;
		ctx.status = 200;
	}
}

module.exports = GameController;