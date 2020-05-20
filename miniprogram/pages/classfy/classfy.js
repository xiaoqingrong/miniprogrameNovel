Page({
  /**
   * 页面的初始数据
   */
  data: {
    lableItem:[],     //男生的书籍
    lableGirlItem:[],//女生的书籍
    publishData :[], //出版的书籍
    isBoy:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.boy()
  },
  // 男生的书籍
  boy:function(){
    let _this = this;
    wx.request({
      url: 'http://www.jecksonli.com:3000/classfy/boy',
      success(res){
        _this.setData({
          lableItem:res.data,
          isBoy:1
        }) 
      }
    })
  },
  // 女生的书籍
  girl:function(){
    let _this = this;
    wx.request({
      url: 'http://www.jecksonli.com:3000/classfy/girl',
      success(res){
        _this.setData({
          lableGirlItem:res.data,
          isBoy:2
        })        
      }
    })
  },
  // 出版的书籍
  published:function(){
    let _this = this;
    wx.request({
      url: 'http://www.jecksonli.com:3000/classfy/publish',
      success(res){
        _this.setData({
          publishData:res.data,
          isBoy:3
        })        
      }
    })
  },
  // 点击男生书籍进入
  goList:function(e){
    wx.navigateTo({
      url: `/pages/classfyList/classfyList?boyId=${e.currentTarget.dataset.boyid}`,
    })
  },
  // 点击女生书籍进入
  goGirlList:function(e){
    wx.navigateTo({
      url: `/pages/classfyList/classfyList?girlId=${e.currentTarget.dataset.girlid}`,
    })
  },
  // 点击出版书籍进入
  goPublishList:function(e){
    wx.navigateTo({
      url: `/pages/classfyList/classfyList?publishId=${e.currentTarget.dataset.publishid}`,
    })
  }
})