const Service = require("egg").Service;

class LogService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(payload) {
    // 查询所有
    try {
      let result = {};

      let condition = "1 = 1";
      let limit = payload.pageSize * 1;
      let offset = (payload.currentPage - 1) * payload.pageSize;
      let orderBy = "visit_date DESC";

      if (payload.startDate && payload.endDate) {
        condition += ` AND visit_date BETWEEN '${payload.startDate}' AND '${
          payload.endDate
        }'`;
      }

      let sql = `select * from log where ${condition} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset}`;
      let countSql = `select count(*) as total from log where ${condition}`;

      // result.list = await this.app.mysql.select("log", {
      //   where: condition,
      //   limit: payload.pageSize * 1, // 返回数据量
      //   offset: (payload.currentPage - 1) * payload.pageSize, // 数据偏移量
      //   orders: [["visit_date", "desc"]] //排序
      // });
      //查询结果的数组
      result.list = await this.app.mysql.query(sql);

      //查询结果的总数
      let total = await this.app.mysql.query(countSql);
      result.total = total[0].total;
      return result;
    } catch (err) {
      throw new Error(err);
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

  async destroy(ids) {
    try {
      const result = await Promise.all(
        ids.map(async id => {
          //删除数据
          let singleResult = await this.app.mysql.delete("log", {
            id: id
          });
          const insertSuccess = singleResult.affectedRows === 1;

          if (!insertSuccess) throw new Error("删除失败");
        })
      );
      return result;
    } catch (error) {
      throw new Error(error);
      this.logger.error(error);
      return err.code;
    }
  }
}

module.exports = LogService;
