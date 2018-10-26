const Service = require("egg").Service;

class GameGalleryService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(payload) {
    // 查询所有
    try {
      let result = {};
      let fields =
        "game_gallery.id, game_gallery.image_src, game_gallery.create_date, game_gallery.game_id, game.game_name";
      let condition = "1 = 1";
      let limit = payload.pageSize * 1;
      let offset = (payload.currentPage - 1) * payload.pageSize;
      let orderBy = "create_date DESC";

      if (payload.gameId) {
        condition += ` AND game_id = ${payload.gameId}`;
      }

      let sql = `select ${fields} from game_gallery LEFT JOIN game ON game_gallery.game_id = game.id where ${condition} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset}`;

      let countSql = `select count(*) as total from game_comment where ${condition}`;
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

  async show(id) {
    // 查询单条
    try {
      const result = await this.app.mysql.get("game_gallery", {
        id: id
      });
      return result;
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }

  async create(payload) {
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    // 插入
    try {
      const result = await Promise.all(
        payload.imageList.map(async item => {
          let singleResult = await this.app.mysql.insert("game_gallery", {
            game_id: payload.gameId,
            image_src: item.realUrl
          });
          const insertSuccess = singleResult.affectedRows === 1;

          if (!insertSuccess) throw new Error("删除失败");
        })
      );
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
        "game_gallery",
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

  async destroy(id) {
    try {
      let result = await this.app.mysql.delete("game_gallery", {
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

module.exports = GameGalleryService;
