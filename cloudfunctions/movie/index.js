// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router');
const rp = require('request-promise');
const cheerio = require('cheerio');
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const app = new tcbRouter({
    event  //自动去找，请求的哪个路由
  });

  app.router('movielist', async (ctx, next) => {
    ctx.body = await db.collection('movie')
      .orderBy('createTime', 'desc')  //排序处理
      .get()
      .then((res) => {
        return res;
      });
  });

  // 根据_id查询表中记录
  app.router('moviedetail',async(ctx,next)=>
  {
    console.log('event:',event);
    ctx.body = await db.collection(event.tablename).doc(event.movieid)
      .get({
        success:(res)=>
        {
          console.log('success:',res);
        }
      })
  })

  // 根据用户id查询want表中所有数据
  app.router('want', async (ctx, next) => {
    ctx.body = await db.collection('want').where({
      userid:event.userid
    }).get({
        success: (res) => {
          console.log('want表:', res);
        }
      });
  });

  // 想want表中添加数据
  app.router('addwant',async(ctx,next)=>
  {
    db.collection('want').add({
      data:{
        userid:event.userid,
        movieid:event.movieid,
        time:event.time,
        played:event.played
      }
    }).then(res=>
    {
      console.log('success:',res);
    });
  })

  // 修改movie中想看人数
  app.router('changecount', async (ctx, next) =>
  {
      db.collection('movie').doc(event.movieid).update({
        data:{
          wantCount:event.newcount
        },
        success:res=>
        {
          console.log('修改成功');
        },
        fail:res=>
        {
          console.log('修改失败');
        }
      });
  })
  // 获取热映电影
  app.router('onviewlist', async (ctx, next) => {
    ctx.body = await db.collection('onview')
      .orderBy('createTime', 'desc')  //排序处理
      .get()
      .then((res) => {
        return res;
      });
  });

  // 查询所有影院
  app.router('cameralist',async(ctx,next)=>
  {
    ctx.body = await db.collection('camera').get()
    .then(res=>
    {
      return res;
    })
  });

  // 根据关键字搜索影片
  app.router('searchmovie', async (ctx, next) => {
    let aa = await db.collection('movie')
    .where({
      showName:db.RegExp({
        regexp:event.name,
        options:'i'
      })
    }).get()
      .then(res => {
        return res;
      });
    let bb = await db.collection('onview')
      .where({
        showName: db.RegExp({
          regexp: event.name,
          options: 'i'
        })
      }).get()
      .then(res => {
        return res;
      });
    ctx.body =await aa.data.concat(bb.data);
  });

  // 根据关键字搜索影院
  app.router('searchcamera', async (ctx, next) =>
  {
    ctx.body = await db.collection('camera')
      .where({
        nm: db.RegExp({
          regexp: event.name,
          options: 'i'
        })
      }).get()
      .then(res => {
        return res;
      });
  });

  // 根据电影id查询影院列表
  app.router('searchcameraid', async (ctx, next) =>
  {
    ctx.body = await db.collection('ticket')
    .where({
      movieid: event.movieid
    }).get()
    .then(res=>
    {
      return res;
    })
  });

  // 根据影院id查询影院详情
  app.router('cameradetail', async (ctx, next) => {
    ctx.body = await db.collection('camera')
      .where({
        _id: event.cameraid
      }).get()
      .then(res => {
        return res;
      })
  });

  // 查票价格
  app.router('ticket', async (ctx, next) => {
    ctx.body = await db.collection('ticket')
      .where({
        movieid:event.movieid,
        cameraid:event.cameraid
      }).get()
      .then(res => {
        return res;
      })
  });
  return app.serve();
}