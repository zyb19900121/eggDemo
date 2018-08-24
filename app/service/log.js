const Service = require("egg").Service;

class LogService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    // 查询所有
    try {
      const result = await this.app.mysql.select("log", {
        orders: [["visit_date", "desc"]] //排序
      });
      console.log("result: ", result);
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
      const result = await this.app.mysql.insert("log", params); // 在 user 表中，插入 user 的记录
      const insertSuccess = result.affectedRows === 1;
      if (!insertSuccess) throw new Error("添加失败");
      return { msg: "添加成功" };
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }
}

module.exports = LogService;
