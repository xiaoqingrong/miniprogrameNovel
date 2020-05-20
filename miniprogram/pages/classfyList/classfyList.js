// miniprogram/pages/classfyList/classfyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookItem:[],
    isAddShelfts:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 监听从哪个分类进来。展示对应的书籍
  onLoad: function (options) {
    let _this = this;
    if(options.boyId){
      wx.request({
        url: `http://www.jecksonli.com:3000/classfy_list/${options.boyId}`,
        success(res){
          console.log(res)
          _this.setData({
            bookItem:res.data
          })        
        }
      })
    }else if(options.girlId){
      wx.request({
        url: `http://www.jecksonli.com:3000/classfy_girl_list/${options.girlId}`,
        success(res){
          _this.setData({
            bookItem:res.data
          })        
        }
      })
    }else if(options.publishId){
      wx.request({
        url: `http://www.jecksonli.com:3000/classfy_publish_list/${options.publishId}`,
        success(res){
          _this.setData({
            bookItem:res.data
          })        
        }
      })
    }
  },
  gotoRead:function(e){
    wx.navigateTo({
      url: `/pages/read/read?bookid=${e.currentTarget.dataset.bookid}`,
    })
  },
  addShelf:function(e){
    let nickName = wx.getStorageSync('userinfo');
    nickName = JSON.parse(nickName).nickName;
    let isCheck = JSON.parse(JSON.stringify(this.data.bookItem));
    let _this = this;
    if(!this.data.isAddShelfts){ 
      wx.request({
        url: `http://www.jecksonli.com:3000/add_user_book`,
        data:{
          bookId:e.currentTarget.dataset.id,
          bookImg:e.currentTarget.dataset.img,
          username:nickName
        },
        success(res){
          for (let i = 0; i < isCheck.length; i++) {
            if(isCheck[i].lable_list_name === e.target.dataset.bookname){
              isCheck[i].has_add=1;
              _this.setData({
                bookItem:isCheck
              })
            }
          } 
        }
      })
      wx.request({
        url: 'http://www.jecksonli.com:3000/upadd_user_book',
        data:{
          book_name:e.currentTarget.dataset.bookname
        },
        success(res){
          console.log(res)     
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