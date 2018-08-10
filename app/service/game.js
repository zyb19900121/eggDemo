const Service = require('egg').Service;

class GameService extends Service {
	constructor(ctx) {
		super(ctx);
		// this.root = 'https://cnodejs.org/api/v1';
	}

	async index() {
		// 查询所有
		try {
			const results = await this.app.mysql.select('game');
			console.log('results: ', results);
			return results;
		} catch (err) {
			this.logger.error(err);
			return {err};
		}
	}
}

module.exports = GameService;