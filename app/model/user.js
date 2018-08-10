// module.exports = app => {
//   const mongoose = app.mongoose;
//   const Schema = mongoose.Schema;

//   const UserSchema = new Schema({
//     userName: { type: String  },
//     password: { type: String  },
//   });

//   return mongoose.model('User', UserSchema);
// }

// // {app_root}/app/controller/user.js
// exports.index = function* (ctx) {
//   ctx.body = yield ctx.model.User.find({});
// }