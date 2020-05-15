// miniprogram/pages/buyticket/buyticket.js
var movieid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cameralist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    movieid = options.movieid;
    let id = [];
    console.log("电影id：",movieid);
    // 根据电影id查询有哪些影院有上映
    wx.cloud.callFunction({
      name:'movie',
      data:{
        movieid:movieid,
        $url:'searchcameraid'
      }
    }).then(res=>
    {
      console.log('买票：',res);
      id = res.result.data;

      // 根据id查询影院详细数据
      for(let i in id)
      {
        wx.cloud.callFunction({
          name:'movie',
          data:{
            cameraid:id[i].cameraid,
            $url:'cameradetail'
          }
        }).then(res=>
        {
          console.log('详情：', this.data.cameralist, res.result.data);
          this.data.cameralist.push(res.result.data[0]);
          console.log('hou:', this.data.cameralist)
          this.setData({
            cameralist: this.data.cameralist
          })

        })
      }
    })
  },
  buy(e)
  {
    wx.navigateTo({
      url: `../buy/buy?movieid=${movieid}&cameraid=${e.currentTarget.dataset.cameraid}`
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