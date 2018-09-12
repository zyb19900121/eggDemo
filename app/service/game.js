const Service = require("egg").Service;

class GameService extends Service {
  constructor(ctx) {
    super(ctx);
    // this.root = 'https://cnodejs.org/api/v1';
  }

  async index(payload) {
    // 查询所有
    try {
      let result = {};
      let fields =
        "id, game_name, game_name_en, game_type, game_score, game_desc, game_cover, is_sold, sale_date";
      let condition = "1 = 1";
      let limit = payload.pageSize * 1;
      let offset = (payload.currentPage - 1) * payload.pageSize;
			let orderBy = "create_date";
			
			if(payload.keyword){
				condition = `game_name LIKE '%${payload.keyword}%' OR game_name_en LIKE '%${payload.keyword}%'`
			}

			if(payload.orderBy){
				orderBy = `${payload.orderBy}`
			}

      let sql = `select ${fields} from game where ${condition} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset}`;

      if (payload.isFilter) {
        //如果是筛选游戏的话，不用返回那么字段
        fields = ["id", "game_name"];
        sql = `select ${fields} from game`;
			}
			
			

      let countSql = `select count(*) as total from game where ${condition}`;

      result.list = await this.app.mysql.query(sql);

      let total = await this.app.mysql.query(countSql);
      result.total = total[0].total;
      //
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

      return result;
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }

  async create(game) {
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    // 插入;
    try {
      const result = await this.app.mysql.insert("game", game);
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

  async update(id, game) {
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    // 插入;
    const condition = {
      where: {
        id: id
      }
    };

    try {
      const result = await this.app.mysql.update("game", game, condition);
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
