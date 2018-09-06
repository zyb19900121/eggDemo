const Service = require("egg").Service;

class GameService extends Service {
  constructor(ctx) {
    super(ctx);
    // this.root = 'https://cnodejs.org/api/v1';
  }

  async index(payload) {
    console.log("payload: ", payload);
    // 查询所有
    try {
      let condition = {};
      let columns = ["id", "game_name", "game_cover", "game_desc", "sale_date"];
      if (payload.isSold) {
        Object.assign(condition, { is_sold: payload.isSold });
      }
      if (payload.isFilter) {
        //如果是筛选游戏的话，不用返回那么字段
        columns = ["id", "game_name"];
      }
      const result = await this.app.mysql.select("game", {
        where: condition,
        columns: columns
      });
      console.log("result: ", result);
      return result;
    } catch (err) {
      throw new Error(err);
      this.logger.error(err);
      return err.code;
    }
  }

  async show(id) {
    // 查询单条
    try {
      const result = await this.app.mysql.get("game", {
        id: id
      });
      console.log("result: ", result);
      return result;
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }

  async create(newGame) {
    console.log("newGame: ", newGame);
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    // 插入;
    try {
      const result = await this.app.mysql.insert("game", newGame);
      const insertSuccess = result.affectedRows === 1;
      if (!insertSuccess) throw new Error("添加失败");
      return {
        msg: "添加成功"
      };
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  async destroy(id) {
    try {
      let result = await this.app.mysql.delete("game", {
        id: id
      });
      const insertSuccess = result.affectedRows === 1;
      if (!insertSuccess) throw new Error("删除失败");
      return result;
    } catch (error) {
      throw new Error(error);
      this.logger.error(error);
      return err.code;
    }
  }
}

module.exports = GameService;
