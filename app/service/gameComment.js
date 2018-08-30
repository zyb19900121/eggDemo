const Service = require("egg").Service;

class GameCommentService extends Service {
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
      let orderBy = "create_date DESC";

      if (payload.gameId) {
        condition += ` AND game_id = ${payload.gameId}`;
      }

      if (payload.startDate && payload.endDate) {
        condition += ` AND create_date BETWEEN '${payload.startDate}' AND '${
          payload.endDate
        }'`;
      }

      let sql = `select * from game_comment where ${condition} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset}`;
      let countSql = `select count(*) as total from game_comment where ${condition}`;
      //查询结果的数组
      // result.list = await this.app.mysql.select("game_comment", {
      //   where: condition,
      //   limit: payload.pageSize * 1, // 返回数据量
      //   offset: (payload.currentPage - 1) * payload.pageSize, // 数据偏移量
      //   orders: [["create_date", "desc"]] //排序
      // });
      //查询结果的总数
      // result.total = await this.app.mysql.count("game_comment", condition);

      //查询结果的数组
      result.list = await this.app.mysql.query(sql);

      //查询结果的总数
      let total = await this.app.mysql.query(countSql);
      result.total = total[0].total
      return result;
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }

  async show(id) {
    // 查询单条
    try {
      const result = await this.app.mysql.get("game_comment", {
        id: id
      });
      
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
      const result = await this.app.mysql.insert("game_comment", params);
      const insertSuccess = result.affectedRows === 1;

      if (!insertSuccess) throw new Error("添加失败");
      return {
        msg: "添加成功"
      };
    } catch (err) {
      // this.logger.error(err);
      throw new Error(err);
    }
  }

  async destroy(ids) {
    
    try {
      const result = await Promise.all(
        ids.map(async id => {
          //删除数据
          let singleResult = await this.app.mysql.delete("game_comment", {
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

module.exports = GameCommentService;
