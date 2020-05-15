// miniprogram/pages/moviedetail/moviedetail.js
var until = require('../../untils/until.js');
var app = getApp();
var movieid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviemsg:{},
    actorlist:[],
    isFlag:true,
    trailer:[],
    isWant:false,   //是否想看
    isplay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e);
    movieid = e.movieid;
    if(e.isplay == 'true')
    this.setData({
      isplay:e.isplay
    })
    this.getDetail(e.movieid);
    // 查询want表
    wx.cloud.callFunction({
      name:'movie',
      data:{
        userid: app.globalData.userid,
        $url:'want'
      }
    }).then(res=>
    {
      // 查询出该用户的想看电影的数组
      let wantlist = res.result.data;
      for(let i in wantlist)
      {
        if(wantlist[i].movieid == e.movieid)
        {
          this.setData({
            isWant:true
          })
        }
      }
    })
    
  },
  getDetail(id)
  {
    let url;
    let tablename;
    wx.showLoading({
      title: '加载中...',
    });
    if(this.data.isplay)
    {
      tablename = 'onview';
    }
    else
    {
      tablename = 'movie';
    }
    wx.cloud.callFunction({
      name:'movie',
      data:{
        movieid:id,
        tablename:tablename,
        $url:'moviedetail'
      }
    }).then((res)=>
    {
      until.changeImg(res.result.data);
      // 改变类型
      res.result.data.type = res.result.data.type.replace(',','/');
      let count = res.result.data.wantCount;

      let a = String(count).split('').reverse();
      let newcount = [];
      for(let i=1;i<=a.length;i++)
      {
        newcount.push(a[i - 1]);
        if(i%3 == 0 && i !=a.length)
        {
          newcount.push(',');
        }
      }
      res.result.data.wantCount = newcount.reverse().join("");
      for (let i in res.result.data.trailer)
      {
        res.result.data.trailer[i] = 'https://gw.alicdn.com/' + res.result.data.trailer[i] + '_160x160Q75.jpg';
      }
      this.setData({
        moviemsg:res.result.data,
        actorlist: res.result.data.leadingRole,
        trailer: res.result.data.trailer
      });
      url = this.data.moviemsg.alipayH5Url;
      wx.hideLoading();
    });
    
  },
  onClick() //点击展开评论
  {
    this.setData({
      isFlag:!this.data.isFlag
    })
  },
  wanted()  //点击想看按钮
  {
    let time = until.getTime(new Date());
    console.log(app.globalData.userid, movieid, time);
    wx.cloud.callFunction({
      name:'movie',
      data:{
        userid: app.globalData.userid,
        movieid:movieid,
        time:time,
        played: this.data.isplay,
        $url:'addwant'
      }
    }).then(res=>
    {
      console.log('添加成功了！',res);
      this.setData({
        isWant:true
      })
      // 修改电影表，更改关注人数
      let newcount = this.data.moviemsg.wantCount.split(',');
      newcount = Number(newcount.join('')) + 1;
      console.log(movieid,newcount);

      wx.cloud.callFunction({
        name:'movie',
        data:{
          movieid:movieid,
          newcount:newcount,
          $url:'changecount'
        }
      }).then(res=>
      {
        console.log('success:');
      })
    })
  },
  buy()
  {
    wx.navigateTo({
      url: `../buyticket/buyticket?movieid=${movieid}`
    })
  },

  onUnload: function () {

  }

})