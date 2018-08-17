'use strict';

const Controller = require('egg').Controller;

class GameCommentController extends Controller {
	async index() {
		// const ctx = this.ctx;
		// 校验 `ctx.request.body` 是否符合我们预期的格式
		// 如果参数校验未通过，将会抛出一个 status = 422 的异常
		// ctx.validate(createRule, ctx.request.body);
		// 调用 service 创建一个 user
		const {
			ctx,
			service
		} = this
		// 组装参数
		const payload = ctx.query
		const result = await service.gameComment.index(payload);
		// 设置响应体和状态码
		ctx.body = result;
		ctx.status = 200;
	}

	async show() {
		const {
			ctx
		} = this;
		const {
			id
		} = ctx.params
		console.log('ctx.params: ', ctx.params);
		const result = await ctx.service.gameComment.show(id);
		// 设置响应体和状态码
		ctx.body = result;
		ctx.status = 200;
	}

	async create() {
		const ctx = this.ctx;
		const result = await ctx.service.gameComment.create(ctx.request.body);
		// 设置响应体和状态码
		ctx.body = result;
		ctx.status = 200;
	}
}

module.exports = GameCommentController;