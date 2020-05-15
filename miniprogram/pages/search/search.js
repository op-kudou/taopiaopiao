// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchlist:[],
    cameralist:[]
  },
  onLoad: function (options) {

  },
  cancel()
  {
    wx.navigateBack();
  },
  search(e)
  {
    if(e.detail.value.length > 0)
    {
      wx.cloud.callFunction({
        name: 'movie',
        data: {
          name: e.detail.value,
          $url: 'searchmovie'
        }
      }).then(res => {
        for (let i in res.result) {
          res.result[i].poster = 'https://gw.alicdn.com/' + res.result[i].poster + '_160x160Q75.jpg';
        }
        this.setData({
          searchlist: res.result
        });
        console.log('电影：',this.data.searchlist)
      });

      wx.cloud.callFunction({
        name: 'movie',
        data: {
          name: e.detail.value,
          $url: 'searchcamera'
        }
      }).then(res => {
        console.log('aa:',res);
        this.setData({
          cameralist: res.result.data
        });
      });
    }
    
  },
  detail(e) {
    // e.currentTarget.dataset.movieid
    let { movieid, isplay } = e.currentTarget.dataset;
    console.log(e);
    wx.navigateTo({
      url: '../moviedetail/moviedetail?movieid=' + movieid + '&isplay=' + false
    })
  }
})