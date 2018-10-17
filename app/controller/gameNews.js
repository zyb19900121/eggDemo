"use strict";

const Controller = require("egg").Controller;

class GameNewsController extends Controller {
  async index() {
    const { ctx, service } = this;
    // 组装参数
		const payload = ctx.query;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);

    try {
      const result = await ctx.service.gameNews.index(payload);
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
    let gameNews = {};
    gameNews.news_title = ctx.request.body.newsTitle;
    gameNews.news_content = ctx.request.body.newsContent;
    gameNews.news_thumbnail = ctx.request.body.newsThumbnail;
		gameNews.platform = ctx.request.body.platform;
		gameNews.game_id = ctx.request.body.gameId;
		gameNews.is_banner = ctx.request.body.isBanner;
		gameNews.views_count = ctx.request.body.viewsCount;
    try {
      const result = await ctx.service.gameNews.create(gameNews);
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
    let gameNews = {};
    gameNews.news_title = ctx.request.body.newsTitle;
    gameNews.news_content = ctx.request.body.newsContent;
    gameNews.news_thumbnail = ctx.request.body.newsThumbnail;
		gameNews.platform = ctx.request.body.platform;
		gameNews.game_id = ctx.request.body.gameId;
		gameNews.is_banner = ctx.request.body.isBanner;
		gameNews.views_count = ctx.request.body.viewsCount;
    try {
      const result = await ctx.service.gameNews.update(id, gameNews);
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
      const result = await ctx.service.gameNews.show(id);
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
      const result = await service.gameNews.destroy(ids);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }
}

module.exports = GameNewsController;
