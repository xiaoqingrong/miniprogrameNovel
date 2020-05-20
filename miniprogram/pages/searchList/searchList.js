var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchItem:[],
    isAddShelfts:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    if(options.searchBookName){
      wx.request({
        url: `http://www.jecksonli.com:3000/single_book_name/${options.searchBookName}`,
        success(res){
          console.log(res)
          _this.setData({
            searchItem:res.data
          })        
        }
      })
      wx.request({
        url: `http://www.jecksonli.com:3000/book/${options.searchBookId}`,
        success(res){
          if(res.data.length>0){
            _this.setData({
              isAddShelfts:true
            })   
          }               
        }
      })
    }else{
      wx.request({
        url: 'http://www.jecksonli.com:3000/search_book',
        success(res){
          _this.setData({
            searchItem:res.data
          })        
        }
      })
    }    
  },
  addShelf:function(e){
    let _this = this;
    if(!this.data.isAddShelfts){ 
      wx.request({
        url: `http://www.jecksonli.com:3000/add_user_book`,
        data:{
          bookId:e.currentTarget.dataset.id,
          bookImg:e.currentTarget.dataset.img,
          username:app.globalData.userInfo.nickName
        },
        success(res){
          _this.setData({
            isAddShelfts:true
          })        
        }
      })
    }    
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