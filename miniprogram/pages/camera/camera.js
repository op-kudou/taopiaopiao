// miniprogram/pages/camera/camera.js
const app = getApp()
var QQMapWx = require('../../assets/qqmap-wx-jssdk.min.js');
var qqmapwx;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    cameralist:[]
  },
  search() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qqmapwx = new QQMapWx({
      key: '3D6BZ-WRYKO-ASRW4-S5HXT-I44AV-PJFNH'
    });
    // 3D6BZ-WRYKO-ASRW4-S5HXT-I44AV-PJFNH
    // 鉴权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation'] == undefined || res.authSetting['scope.userLocation'] == true) {
          // 获取位置
          wx.getLocation({
            type: 'wgs84',
            success: function (res) {
              qqmapwx.reverseGeocoder({
                location: {
                  latitude: res.latitude,
                  longitude: res.longitude
                },
                success: (address) => {
                  that.setData({
                    address: address.result.address_component.city
                  })
                },
                fail(err) {
                  console.log('err:', err);
                }
              });
            },
          })
        }
      }
    });

    // 获取影院列表
    wx.cloud.callFunction({
      name:'movie',
      data:{
        $url:'cameralist'
      }
    }).then(res=>
    {
      console.log('camera:',res);
      this.setData({
        cameralist:res.result.data
      })
    })
  },
  detail(e)
  {
    console.log(e.currentTarget.dataset.cameraid);
    wx.navigateTo({
      url: `../cameradetail/cameradetail?cameraid=${e.currentTarget.dataset.cameraid}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})