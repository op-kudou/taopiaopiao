// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router');
const rp = require('request-promise');
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const app = new tcbRouter({
    event  //自动去找，请求的哪个路由
  });

  app.router('movielist', async (ctx, next) => {
    ctx.body = ctx.body = await db.collection('movie')
      .orderBy('createTime', 'desc')  //排序处理
      .get()
      .then((res) => {
        return res;
      });
  });

  return app.serve();
}