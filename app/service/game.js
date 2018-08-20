const Service = require('egg').Service;

class GameService extends Service {
	constructor(ctx) {
		super(ctx);
		// this.root = 'https://cnodejs.org/api/v1';
	}

	async index(payload) {
		// 查询所有
		try {
			const result = await this.app.mysql.select('game', {
				where: {
					is_sold: payload.isSold //是否发售
				},
				columns: ['id', 'game_name', 'game_cover', 'game_desc', 'sale_date']
			});
			console.log('result: ', result);
			return result;
		} catch (err) {
			this.logger.error(err);
			return err.code;
		}
	}

	async show(id) {
		// 查询单条
		try {
			const result = await this.app.mysql.get('game', {
				id: id
			});
			console.log('result: ', result);
			return result;
		} catch (err) {
			this.logger.error(err);
			return err.code;
		}
	}
}

module.exports = GameService;