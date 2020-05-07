//index.js
const app = getApp()
var QQMapWx = require('../../assets/qqmap-wx-jssdk.min.js');
var qqmapwx;
Page({
  data: {
    navTab:['精选','演唱会','话剧歌剧'],
    currentTab:0,
    address:'',
    movielist:[]
  },
  onLoad(options)
  {
    var that = this;
    qqmapwx = new QQMapWx({
      key:'3D6BZ-WRYKO-ASRW4-S5HXT-I44AV-PJFNH'
    });
    // 3D6BZ-WRYKO-ASRW4-S5HXT-I44AV-PJFNH
    // 鉴权
    wx.getSetting({
      success:res=>
      {
        if (res.authSetting['scope.userLocation'] == undefined || res.authSetting['scope.userLocation'] == true)
        {
          // 获取位置
          wx.getLocation({
            type:'wgs84',
            success: function (res) {
              qqmapwx.reverseGeocoder({
                location:{
                  latitude: res.latitude,
                  longitude: res.longitude
                },
                success:(address)=>
                {
                  that.setData({
                    address: address.result.address_component.city
                  })
                },
                fail(err)
                {
                  console.log('err:',err);
                }
              });
            },
          })
        }
      }
    });
    
    this.getmovielist();
  },
  currentTab(e)
  {
    if (this.data.currentTab == e.currentTarget.dataset.id)
    {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.id
    });
  },
  getmovielist()
  {
    wx.cloud.callFunction({
      name: 'movie',
      data: {
        $url: 'movielist'
      }
    }).then((res) => {
      for (let i in res.result.data) {
        res.result.data[i].poster = 'https://gw.alicdn.com/' + res.result.data[i].poster + '_160x160Q75.jpg';
        console.log(res.result.data[i]);
      }
      this.setData({
        movielist:res.result.data
      });
      this.setLocalList();
    });
  },
  setLocalList()
  {
    wx.setStorage({
      key: 'movielist',
      data: this.data.movielist,
    })
  }

})
