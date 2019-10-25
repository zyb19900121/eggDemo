const Service = require("egg").Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = "https://cnodejs.org/api/v1";
  }

  async index(payload) {
    try {
      let result = {};
      let condition = {
        is_show: 1
      };

      // 查询结果的数组;
      result.list = await this.app.mysql.select("user", {
        where: condition,
        limit: payload.pageSize * 1, // 返回数据量
        offset: (payload.currentPage - 1) * payload.pageSize // 数据偏移量
      });

      // 查询结果的总数;
      result.total = await this.app.mysql.count("user", condition);

      return result;
    } catch (err) {
      
      throw new Error(err);
    }
  }

  async login(user) {
    // 查询单条
    try {
      const result = await this.app.mysql.get("user", {
        username: user.username,
        password: user.password
      });

      let userInfo = null;
      if (result) {
        userInfo = {
          username: result.username,
          isAdmin: result.is_admin,
          name: result.name,
          authority: result.authority
        };
      }

      return userInfo;
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }

  async loginForReact(user) {
    // 查询单条
    try {
      const result = await this.app.mysql.get("user", {
        username: user.userName,
        password: user.password
      });
      let userInfo = null;
      if (result) {
        userInfo = {
          username: result.username,
          isAdmin: result.is_admin,
          name: result.name,
          authority: result.authority
        };
      }

      return userInfo;
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }

  async loginForReactByMobile(params) {
    let result = {};
    let currentTime = new Date().getTime();

    const user = await this.app.mysql.get("user", {
      mobile: params.mobile
    });

    if (!user) {
      result.msg = "该手机号未被注册!";
      result.code = 301;
      return result;
    }

    try {
      const record = await this.app.mysql.select("captcha_login", {
        where: { mobile: params.mobile },
        orders: [["time", "desc"]],
        limit: 1,
        offset: 0
      });
      if (!record.length) {
        result.msg = "验证码错误!";
        result.code = 301;
        return result;
      }
      //时间差（分）
      let timeDifference = Math.floor(
        ((currentTime - record[0].time) / 1000 / 60) << 0
      );
      if (timeDifference >= 5) {
        result.msg = "验证码错误!";
        result.code = 301;
      } else {
        if (record[0].captcha === params.captcha) {
          result.msg = "登陆成功!";
          result.code = 200;
          result.userInfo = user;
        } else {
          result.msg = "验证码错误!";
          result.code = 301;
        }
      }
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCaptcha(params) {
    try {
      const result = await this.app.mysql.insert("captcha", params); // 在 user 表中，插入 user 的记录
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

  async getCaptchaForLogin(params) {
    try {
      const result = await this.app.mysql.insert("captcha_login", params); // 在 user 表中，插入 user 的记录
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

  async checkExist(params) {
    try {
      let result = {};
      const user = await this.app.mysql.get("user", {
        username: params.username
      });

      if (user) {
        result.isExist = true;
        result.code = 301;
      } else {
        result.isExist = false;
        result.code = 200;
      }

      return result;
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }

  async checkMobileExist(params) {
    try {
      let result = {};
      const user = await this.app.mysql.get("user", {
        mobile: params.mobile
      });

      if (user) {
        result.isExist = true;
        result.code = 301;
      } else {
        result.isExist = false;
        result.code = 200;
      }

      return result;
    } catch (err) {
      this.logger.error(err);
      return err.code;
    }
  }

  async create(params) {
    let result = {};
    let currentTime = new Date().getTime();

    try {
      const record = await this.app.mysql.select("captcha", {
        where: { mobile: params.mobile },
        orders: [["time", "desc"]],
        limit: 1,
        offset: 0
      });
      if (!record.length) {
        result.msg = "验证码无效";
        result.code = 301;
        return result;
      }

      //时间差（分）
      let timeDifference = Math.floor(
        ((currentTime - record[0].time) / 1000 / 60) << 0
      );

      if (timeDifference >= 5) {
        result.msg = "验证码无效";
        result.code = 301;
      } else {
        if (record[0].captcha === params.captcha) {
          result.msg = "验证码已验证";
          result.code = 200;

          let insertRow = await this.app.mysql.insert("user", {
            username: params.username,
            password: params.password,
            mobile: params.mobile,
            name: params.nickname,
            authority: "user"
          }); // 在 user 表中，插入 user 的记录
          const insertSuccess = insertRow.affectedRows === 1;
          if (!insertSuccess) throw new Error("添加失败");
          result.msg = "注册成功";
          result.code = 200;
        } else {
          result.msg = "验证码无效";
          result.code = 301;
        }
      }
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCurrentUserInfo(params) {
    let where;
    if (params.type == "account") {
      where = { username: params.username };
    } else {
      where = { mobile: params.username };
    }

    try {
      const result = await this.app.mysql.select("user", {
        where: where,
        columns: ["username", "name", "mobile", "authority"]
      });

      return result[0];
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
          let singleResult = await this.app.mysql.delete("user", {
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
