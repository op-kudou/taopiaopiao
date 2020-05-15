// components/selected/selected.js
var until = require('../../untils/until.js');
var userid;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperImg: ['https://m.iqiyipic.com/common/lego/20200507/1215cad9a1af464a87886386c6bf32ec.jpg',
    'https://m.iqiyipic.com/common/lego/20200428/9d1cd7e30b4049aa8d2ed3173fef74ac.jpg',
    'https://m.iqiyipic.com/common/lego/20200506/31dc92ef62074de0acf2fdce72bfd820.jpg',
    'https://m.iqiyipic.com/common/lego/20200501/566a293addfc4772a9b374d8d36e9345.jpg',
    'https://m.iqiyipic.com/common/lego/20200504/9a3c6c50ea2441e9be3342884d49b89f.jpg',
    ],
    soonData:[],
    isWant:[],
    flag:false,
    wantlist:[],
    onviewData:[]
  },
  lifetimes:{
    ready() {
      wx.request({
        url: 'https://m.iqiyi.com',
        success(res) {
          // console.log('res:',res)
        },
        fail(err) {
          console.log('err:', err);
        }
      });
      // 获取即将上映电影
      wx.getStorage({
        key: 'movielist',
        success: (res) => {
          this.setData({
            soonData: res.data
          });
          console.log('soon:', this.data.soonData);
        }
      });
      // 获取热映电影
      wx.getStorage({
        key: 'onviewlist',
        success: (res) => {
          this.setData({
            onviewData: res.data
          });
          console.log('onview:', this.data.onviewData);
        }
      });
    },
  },  
  methods: {
    onClick(e)
    {
      var movieid = e.currentTarget.dataset.movieid;
      wx.navigateTo({
        url: '../moviedetail/moviedetail?movieid=' + movieid + '&isplay=' + false
      })
    },
    onClicktwo(e) {
      var movieid = e.currentTarget.dataset.movieid;
      wx.navigateTo({
        url: '../moviedetail/moviedetail?movieid=' + movieid +'&isplay=' + true
      })
    }
  }
})
