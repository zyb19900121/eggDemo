const Service = require('egg').Service;

class AppInfoService extends Service {
	constructor(ctx) {
		super(ctx);
	}

	async index() {
		// 查询所有
		try {
			const result = await this.app.mysql.select('app_info');
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
			const result = await this.app.mysql.get('app_info', {
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

module.exports = AppInfoService;