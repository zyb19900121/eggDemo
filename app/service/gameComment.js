const Service = require('egg').Service;

class GameCommentService extends Service {
	constructor(ctx) {
		super(ctx);
	}

	async index(payload) {
		// 查询所有
		try {
			const result = await this.app.mysql.select('game_comment',{});
			console.log('result: ', result);
			return result;
		} catch (err) {
			this.logger.error(err);
			return err.code;
		}
	}

	async show(gameId) {
		// 根据游戏ID查询多条
		try {
			const result = await this.app.mysql.select('game_comment',{
				where:{ game_id: gameId}
			});
			console.log('result: ', result);
			return result;
		} catch (err) {
			this.logger.error(err);
			return err.code;
		}
	}

	async create(params) {
		// 检查调用是否成功，如果调用失败会抛出异常
		// this.checkSuccess(result);
		// 插入
		try {
			const result = await this.app.mysql.insert('game_comment', params);
			const insertSuccess = result.affectedRows === 1;
			if (!insertSuccess) throw new Error('添加失败');
			return {msg:'添加成功'};
		} catch (err) {
			this.logger.error(err);
			return err.code;
		}
	}

}

module.exports = GameCommentService;