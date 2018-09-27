const Service = require("egg").Service;

class GameTypeService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(payload) {
    // 查询所有

    try {
      let result = {};
      let condition = null;

      if (payload.isFilter) {
        //如果是筛选游戏的话，不用返回那么字段
        // fields = [ "company_name_en"];
        // sql = `select ${fields} from game`;
        result.list = await this.app.mysql.select("game_type", {
          columns: ["type_name_cn"] // 要查询的表字段
        });
      } else {
        // 查询结果的数组;
        result.list = await this.app.mysql.select("game_type", {
          where: condition,
          limit: payload.pageSize * 1, // 返回数据量
          offset: (payload.currentPage - 1) * payload.pageSize, // 数据偏移量
          orders: ["order"] //排序
        });
      }

      // 查询结果的总数;
      result.total = await this.app.mysql.count("game_type", condition);

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
      const result = await this.app.mysql.get("game_type", {
        id: id
      });
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
      const result = await this.app.mysql.insert("game_type", params); // 在 user 表中，插入 user 的记录
      const insertSuccess = result.affectedRows === 1;
      if (!insertSuccess) throw new Error("添加失败");
      return { msg: "添加成功" };
    } catch (err) {
			throw new Error(err);
      this.logger.error(err);
      return err.code;
    }
  }

  async update(id, gameType) {
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    // 插入;
    const condition = {
      where: {
        id: id
      }
    };

    try {
      const result = await this.app.mysql.update(
        "game_type",
        gameType,
        condition
      );
      const insertSuccess = result.affectedRows === 1;
      if (!insertSuccess) throw new Error("添加失败");
      return {
        msg: "修改成功"
      };
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  async destroy(ids) {
    try {
      const result = await Promise.all(
        ids.map(async id => {
          //删除数据
          let singleResult = await this.app.mysql.delete("game_type", {
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

module.exports = GameTypeService;
