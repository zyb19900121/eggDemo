const path = require("path");
const fs = require("fs");
const sendToWormhole = require("stream-wormhole");
const awaitWriteStream = require("await-stream-ready").write;
const Controller = require("egg").Controller;

class FileUploadController extends Controller {
  async upload() {
    const { ctx } = this;
    // file not exists will response 400 error
    // 获取 steam

		const stream = await ctx.getFileStream();
		console.log('stream: ', stream);
		console.log('stream.fields.type: ', stream.fields.type);
    let dir = "";
    if (stream.fields.type) {
      dir = `${stream.fields.type}/`;
    }
    // 生成文件名
    const filename =
      Date.now() +
      "" +
      Number.parseInt(Math.random() * 10000) +
      path.extname(stream.filename);

    // 写入路径
    const target = path.join(`app/public/uploadFiles/${dir}`, filename);
    const writeStream = fs.createWriteStream(target);

    try {
      // 写入文件
      await awaitWriteStream(stream.pipe(writeStream));
      ctx.body = { url: `/public/uploadFiles/${dir}${filename}` };
      ctx.status = 200;
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
      ctx.body = { error: err.toString() };
      ctx.status = 500;
    }
  }

  async uploadNotRequiredFile() {
    const { ctx } = this;
    // file not required
    const stream = await ctx.getFileStream({ requireFile: false });
    let result;
    if (stream.filename) {
      const name = "egg-multipart-test/" + path.basename(stream.filename);
      // process file or upload to cloud storage
      const result = await ctx.oss.put(name, stream);
    } else {
      // must consume the empty stream
      await sendToWormhole(stream);
    }

    ctx.body = {
      url: result && result.url,
      // process form fields by `stream.fields`
      fields: stream.fields
    };
  }
}

module.exports = FileUploadController;
