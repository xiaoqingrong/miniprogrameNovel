// miniprogram/pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getSearchWord:'',
    searchHistory:[],
    searchWordItem:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.request({
      url: 'http://www.jecksonli.com:3000/get_search_history',
      success(res){
        _this.setData({
          searchHistory:res.data
        })
      }
    })
  },
  // 将搜索历史数据付给变量
  getSearchWord:function(e){
    // 模糊查询小说
    let _this = this;
    wx.request({
      url: 'http://www.jecksonli.com:3000/get_search_history',
      success(res){
        _this.setData({
          searchHistory:res.data
        })
      }
    })
    this.setData({
      getSearchWord:e.detail.value
    })
    if(e.detail.value != ''){
      wx.request({
        url: 'http://www.jecksonli.com:3000/get_book_name',
        data:{
          value:e.detail.value
        },
        success(res){
          console.log(res.data)
          _this.setData({
            searchWordItem:res.data
          })
        }
      })
    }else{
      _this.setData({
        searchWordItem:[]
      })
    }
  },
  gotoSearchItem:function(e){
    this.searchWord()
    wx.navigateTo({
      url: `/pages/searchList/searchList?searchBookName=${e.currentTarget.dataset.book_name}&searchBookId=${e.currentTarget.dataset.book_id}`,
    })
  },
  // 将搜索历史存到数据库
  searchWord:function(){
    let _this = this;
    wx.request({
      // www.jecksonli.com:3000
      url: 'http://www.jecksonli.com:3000/search_history',
      data:{
        id:1,
        value:_this.data.getSearchWord
      },
      success(res){
        _this.setData({
          lableItem:res.data,
          isBoy:1
        })      
        console.log(res)  
      }
    })
  },
  clear_search_history:function(){
    let _this = this;
    wx.request({
      url: 'http://www.jecksonli.com:3000/clear_search_history',
      success(res){
        _this.setData({
          searchHistory:[]
        }) 
      }
    })
  }
})