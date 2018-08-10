const Service = require('egg').Service;

class AppInfoService extends Service {
	constructor(ctx) {
		super(ctx);
	}

	async index() {
		// 查询所有
		try {
			const results = await this.app.mysql.select('app_info');
			console.log('results: ', results);
			return results;
		} catch (err) {
			this.logger.error(err);
			return {err};
		}
	}

	async show(id) {
		// 查询单条
		try {
			const results = await this.app.mysql.get('app_info', { id: id });
			console.log('results: ', results);
			return results;
		} catch (err) {
			this.logger.error(err);
			return {err};
		}
	}
}

module.exports = AppInfoService;