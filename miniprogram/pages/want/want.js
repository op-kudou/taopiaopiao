// miniprogram/pages/want/want.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movielist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查询该用户想看的电影
    wx.cloud.callFunction({
      name: 'movie',
      data: {
        userid: app.globalData.userid,
        $url: 'want'
      }
    }).then(res => {
      this.setData({
        wantlist:res.result.data
      });
      console.log('res:', this.data.wantlist);
      // 查询电影详情
      for (let i in this.data.wantlist) 
      {
        if (this.data.wantlist[i].played == false)
        {
          wx.cloud.callFunction({
            name: 'movie',
            data: {
              tablename: 'movie',
              movieid: this.data.wantlist[i].movieid,
              $url: 'moviedetail'
            }
          }).then(res => {
            res.result.data.poster = 'https://gw.alicdn.com/' + res.result.data.poster + '_160x160Q75.jpg';
            this.data.movielist.push(res.result.data);
            this.setData({
            movielist: this.data.movielist
            });
            // 给movielist排序
            let newlist = [];
            for (let i in this.data.wantlist) {
              for (let j in this.data.movielist) {
                if (this.data.movielist[j]._id == this.data.wantlist[i].movieid) 
                {
                  Object.assign(this.data.wantlist[i], this.data.movielist[j]);               
                  this.setData({
                    wantlist:this.data.wantlist
                  })
                }
              }
            }
          });
        }
        else
        {
          wx.cloud.callFunction({
            name: 'movie',
            data: {
              tablename: 'onview',
              movieid: this.data.wantlist[i].movieid,
              $url: 'moviedetail'
            }
          }).then(res => {
            res.result.data.poster = 'https://gw.alicdn.com/' + res.result.data.poster + '_160x160Q75.jpg';
            this.data.movielist.push(res.result.data);
            this.setData({
              movielist: this.data.movielist
            });
            // 给movielist排序
            for (let i in this.data.wantlist) {
              for (let j in this.data.movielist) {
                if (this.data.movielist[j]._id == this.data.wantlist[i].movieid) 
                {
                  Object.assign(this.data.wantlist[i], this.data.movielist[j]);
                  console.log('want:', this.data.wantlist)
                }
                this.setData({
                  wantlist: this.data.wantlist
                })
              }
            }

          });
        }
      }      
    });

    
  },
  detail(e)
  {
    // e.currentTarget.dataset.movieid
    let { movieid, isplay } = e.currentTarget.dataset;
    console.log(e);
    wx.navigateTo({
      url: '../moviedetail/moviedetail?movieid=' + movieid + '&isplay=' + false
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