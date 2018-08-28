const Service = require("egg").Service;

class GameCommentService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(payload) {
    console.log("payload: ", payload);
    // 查询所有
    try {
      let result = {};

      let condition = {};

      if (payload.gameId) {
        condition = {
          game_id: payload.gameId
        };
      }

      //查询结果的数组
      result.list = await this.app.mysql.select("game_comment", {
        where: condition,
        limit: payload.pageSize * 1, // 返回数据量
        offset: (payload.currentPage - 1) * payload.pageSize, // 数据偏移量
        orders: [["create_date", "desc"]] //排序
      });
      //查询结果的总数
      result.total = await this.app.mysql.count("game_comment", condition);
      console.log("result: ", result);
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
}

module.exports = GameCommentService;
