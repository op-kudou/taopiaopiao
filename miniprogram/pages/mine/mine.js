// miniprogram/pages/mine/mine.js
var app = getApp();
Page({
  data: {
    userInfo:{}
  },
  onLoad: function (options) {
    // 查询用户信息
    wx.getSetting({
      success:res=>
      {
        if (res.authSetting['scope.userInfo'])
        {
          wx.getUserInfo({
            success: res => {

              this.setData({
                userInfo: res.userInfo
              })
            },
            fail: err => {
              console.log('err:', err);
            }
          });
        }
        else
        {
          wx.openSetting({
            success:res=>
            {
              console.log(res);
            }
          })
        }
      }
    })
    
    // 查询该用户有多少想看的电影
    wx.cloud.callFunction({
      name:'movie',
      data:{
        userid: app.globalData.userid,
        $url:'want'
      }
    }).then(res=>
    {
      this.setData({
        count:res.result.data.length
      })
    });
  },
  getUserInfo()
  {
    this.onLoad();
  },
  onClick()
  {
    wx.navigateTo({
      url: '../want/want',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})