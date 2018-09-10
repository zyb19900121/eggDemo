const Service = require("egg").Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = "https://cnodejs.org/api/v1";
  }

  async login(user) {
    console.log("user: ", user);
    // 查询单条
    try {
      const result = await this.app.mysql.get("user", {
        username: user.username,
        password: user.password
      });
      let userInfo = {
        username: result.username,
        isAdmin: result.is_admin
      };
      return userInfo;
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
      const result = await this.app.mysql.insert("user", params); // 在 user 表中，插入 user 的记录
      const insertSuccess = result.affectedRows === 1;
      if (!insertSuccess) throw new Error("添加失败");
      return {
        msg: "添加成功"
      };
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg =
        result.data && result.data.error_msg
          ? result.data.error_msg
          : "unknown error";
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, "remote response error", {
        data: result.data
      });
    }
  }
}

module.exports = UserService;
