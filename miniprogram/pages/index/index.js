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
      for (let i in res.result.data) 
      {
        // 处理图片
        res.result.data[i].poster = 'https://gw.alicdn.com/' + res.result.data[i].poster + '_160x160Q75.jpg';
        // 处理数字
        if(res.result.data[i].wantCount >= 10000)
        {
          res.result.data[i].wantCount = parseInt(res.result.data[i].wantCount/1000)/10 + '万'
        }
        else
        {
          let gw = res.result.data[i].wantCount % 10;
          let qw = parseInt(res.result.data[i].wantCount / 10);
          res.result.data[i].wantCount = qw + ',' + gw;
        }
        // 处理日期
        let time = res.result.data[i].openTime.split('-');
        let month = time[1];
        let day = time[2]
        if(month[0] == '0' )
        {
          month = month.slice(1);
        }
        if (day[0] == '0')
        {
          day = day.slice(1);
        }
        res.result.data[i].openmonth = month;
        res.result.data[i].openday = day;
      }
      this.setData({
        movielist:res.result.data
      });
      this.setLocalList();
    });
  },
  getonviewlist()
  {
    wx.cloud.callFunction({
      name: 'movie',
      data: {
        $url: 'onviewlist'
      }
    }).then((res) => {
      for (let i in res.result.data) {
        // 处理图片
        res.result.data[i].poster = 'https://gw.alicdn.com/' + res.result.data[i].poster + '_160x160Q75.jpg';
        // 处理数字
        if (res.result.data[i].wantCount >= 10000) {
          res.result.data[i].wantCount = parseInt(res.result.data[i].wantCount / 1000) / 10 + '万'
        }
        else {
          let gw = res.result.data[i].wantCount % 10;
          let qw = parseInt(res.result.data[i].wantCount / 10);
          res.result.data[i].wantCount = qw + ',' + gw;
        }
        // 处理日期
        let time = res.result.data[i].openTime.split('-');
        let month = time[1];
        let day = time[2]
        if (month[0] == '0') {
          month = month.slice(1);
        }
        if (day[0] == '0') {
          day = day.slice(1);
        }
        res.result.data[i].openmonth = month;
        res.result.data[i].openday = day;
      }
      this.setData({
        onviewlist: res.result.data
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
    wx.setStorage({
      key: 'onviewlist',
      data: this.data.onviewlist,
    })
  },
  onShow()
  {
    this.getmovielist();
    this.getonviewlist();
  },
  search() {
    wx.navigateTo({
      url: '../search/search'
    })
  }

})
