// miniprogram/pages/buy/buy.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    camera:{},
    money:0,
    phone:''
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
      this.setData({
        money:res.result.data[0].price
      })
    })
  },
  phone(e)
  {
    this.setData({
      phone: e.detail.value
    })
  },
  buy()
  {
    if(this.data.phone.length == 11)
    {
      wx.showModal({
        title: '提示',
        content: '是否确认要付款？',
        success:res=>
        {
          if(res.confirm)
          {
            wx.showToast({
              title: '付款成功',
              success:res=>
              {
                wx.switchTab({
                  url: '../index/index',
                })
              }
            });
          }
        }
      });
    }  
    else
    {
      wx.showToast({
        icon:'error',
        title: '请输入正确手机号码'
      });
    }
  }
})