const Service = require("egg").Service;

class GameCompanyService extends Service {
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
        result.list = await this.app.mysql.select("game_company", {
          columns: ["company_name_en"] // 要查询的表字段
        });
      } else {
        result.list = await this.app.mysql.select("game_company", {
          where: condition,
          limit: payload.pageSize * 1, // 返回数据量
          offset: (payload.current - 1) * payload.pageSize, // 数据偏移量
          orders: ["order"] //排序
        });
      }

      let total = await this.app.mysql.count("game_company", condition);
      result.pagination = {
        current: payload.current * 1,
        pageSize: payload.pageSize * 1,
        total: total
      };

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
      const result = await this.app.mysql.get("game_company", {
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
      const result = await this.app.mysql.insert("game_company", params); // 在 user 表中，插入 user 的记录
      const insertSuccess = result.affectedRows === 1;
      if (!insertSuccess) throw new Error("添加失败");
      return { msg: "添加成功" };
    } catch (err) {
      throw new Error(err);
      this.logger.error(err);
      return err.code;
    }
  }

  async update(id, gameCompany) {
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
        "game_company",
        gameCompany,
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
          let singleResult = await this.app.mysql.delete("game_company", {
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

module.exports = GameCompanyService;
