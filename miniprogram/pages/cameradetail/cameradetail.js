// miniprogram/pages/cameradetail/cameradetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    camera:{},
    movie:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'movie',
      data:{
        cameraid: options.cameraid,
        $url:'cameradetail'
      }
    }).then(res=>
    {
      this.setData({
        camera:res.result.data[0]
      });

      wx.cloud.callFunction({
        name: 'movie',
        data: {
          cameraid: this.data.camera._id,
          $url: 'ticketmovie'
        }
      }).then(res => {
        console.log('aa:', res);
        for(let i in res.result.data)
        {
          wx.cloud.callFunction({
            name:'movie',
            data:{
              movieid: res.result.data[i].movieid,
              $url:'moviedetail',
              tablename:'onview'
            }
          }).then(res=>
          {
            res.result.data.poster = 'https://gw.alicdn.com/' + res.result.data.poster + '_160x160Q75.jpg';
            this.data.movie.push(res.result.data)
            this.setData({
              movie:this.data.movie
            })
            console.log(this.data.movie)
          })
        }
      })
    });
    
    // 查询改影院有没有上映的电影

  },
  detail(e) {
    let { movieid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../moviedetail/moviedetail?movieid=' + movieid + '&isplay=' + true
    })
  },
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