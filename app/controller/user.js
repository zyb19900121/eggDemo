"use strict";
var QcloudSms = require("qcloudsms_js");
const Controller = require("egg").Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = "user controller";
  }

  //用户登陆
  async login() {
    const { ctx } = this;
    let user = ctx.request.body;
    try {
      const result = await ctx.service.user.login(user);
      if (result) {
        // 设置响应体和状态码
        const token = this.app.jwt.sign(user, this.app.config.jwt.secret, {
          expiresIn: "12h"
        });

        ctx.body = {
          userInfo: result,
          msg: "登陆成功",
          status: "ok",
          token
        };
        ctx.status = 200;
      } else {
        // 设置响应体和状态码
        ctx.body = {
          msg: "用户名或密码错误",
          status: "error"
        };
        ctx.status = 403;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: error.toString()
      };
    }
  }

  async loginForReact() {
    const { ctx } = this;
    let user = ctx.request.body;

    if (ctx.request.body.type === "account") {
      try {
        const result = await ctx.service.user.loginForReact(user);
        if (result) {
          // 设置响应体和状态码
          const token = this.app.jwt.sign(user, this.app.config.jwt.secret, {
            expiresIn: "12h"
          });

          ctx.body = {
            userInfo: result,
            msg: "登陆成功",
            status: "ok",
            type: "account",
            token
          };
          ctx.status = 200;
        } else {
          // 设置响应体和状态码
          ctx.body = {
            msg: "用户名或密码错误",
            type: "account",
            status: "error"
          };
          ctx.status = 200;
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          error: error.toString()
        };
      }
    } else {
      try {
        const result = await ctx.service.user.loginForReactByMobile(user);
        if (result.code === 200) {
          // 设置响应体和状态码
          const token = this.app.jwt.sign(user, this.app.config.jwt.secret, {
            expiresIn: "12h"
          });

          ctx.body = {
            userInfo: result,
            msg: "登陆成功",
            status: "ok",
            type: "mobile",
            token
          };
          ctx.status = 200;
        } else {
          // 设置响应体和状态码
          ctx.body = {
            ...result,
            status: "error",
            type: "mobile"
          };
          ctx.status = 200;
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          error: error.toString()
        };
      }
    }
  }
  //新建用户
  async create() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 user

    const result = await ctx.service.user.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 200;
  }

  async getCaptcha() {
    const ctx = this.ctx;
    const mobile = ctx.request.body.mobile;

    // 短信应用SDK AppID
    var appid = 1400194183; // SDK AppID是1400开头

    // 短信应用SDK AppKey
    var appkey = "a9dc8050a69bbac03a897a15e6ebade2";
    var templateId; // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
    // 需要发送短信的手机号码

    // 短信模板ID，需要在短信应用中申请
    if (ctx.request.body.type === "login") {
      templateId = 301374;
    } else {
      templateId = 294824;
    }

    // 签名
    var smsSign = "JoyZoneFTD"; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

    // 实例化QcloudSms
    var qcloudsms = QcloudSms(appid, appkey);

    // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    function callback(err, res, resData) {
      if (err) {
      } else {
      }
    }

    var ssender = qcloudsms.SmsSingleSender();

    var num = "";
    for (var i = 0; i < 4; i++) {
      num += Math.floor(Math.random() * 10);
    }

    var params = [num];
    ssender.sendWithParam(
      86,
      mobile,
      templateId,
      params,
      smsSign,
      "",
      "",
      callback
    );
    let result = {};
    try {
      if (ctx.request.body.type === "login") {
        result = await ctx.service.user.getCaptchaForLogin({
          mobile: mobile,
          captcha: params,
          time: Date.now()
        });
      } else {
        result = await ctx.service.user.getCaptcha({
          mobile: mobile,
          captcha: params,
          time: Date.now()
        });
      }

      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }

  //查看用户名是否被注册
  async checkExist() {
    const { ctx } = this;
    try {
      const result = await ctx.service.user.checkExist(ctx.request.body);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }

  //查看手机号是否被注册
  async checkMobileExist() {
    const { ctx } = this;
    try {
      const result = await ctx.service.user.checkMobileExist(ctx.request.body);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }

  //注册
  async register() {
    const { ctx } = this;
    try {
      const result = await ctx.service.user.create(ctx.request.body);
      // 设置响应体和状态码
      ctx.body = result;
      ctx.status = 200;
    } catch (error) {
      ctx.body = { error: error.toString() };
      ctx.status = 500;
    }
  }
}

module.exports = UserController;
