// miniprogram/pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    camera:{},
    money:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const movieid = options.movieid;
    const cameraid = options.cameraid;
    // 获取影片详情
    wx.cloud.callFunction({
      name:'movie',
      data:{
        movieid:movieid,
        tablename:'onview',
        $url:'moviedetail'
      }
    }).then(res=>
    {
      // console.log('影片详情：',res.result);
      this.setData({
        movie:res.result.data
      })
    })

    // 获取影院详情
    wx.cloud.callFunction({
      name: 'movie',
      data: {
        movieid: cameraid,
        tablename: 'camera',
        $url: 'moviedetail'
      }
    }).then(res => {
      // console.log('影院详情：', res.result);
      this.setData({
        camera:res.result.data
      })
    })

    // 获取票的价格
    wx.cloud.callFunction({
      name: 'movie',
      data: {
        movieid: movieid,
        cameraid: cameraid,
        $url: 'ticket'
      }
    }).then(res => {
      // console.log('票价：', res.result);
      this.setData({
        money:res.result.data[0].price
      })
    })
  }
})