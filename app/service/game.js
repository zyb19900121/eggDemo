const Service = require('egg').Service;

class GameService extends Service {
	constructor(ctx) {
		super(ctx);
		// this.root = 'https://cnodejs.org/api/v1';
	}

	async index() {
		// 查询所有
		try {
			const result = await this.app.mysql.select('game', {
				columns: ['id', 'game_name', 'game_cover']
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