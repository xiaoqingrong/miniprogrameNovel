//index.js
var app = getApp();
Page({
  data: {
    bookItem:[],
    avatarUrl:'',  //获取用户头像地址
    userInfo:[],    //获取用户信息
    shelfManage:false,
    checked:false,
    isChecked:false,
    deleteBook:[]
  },
// 加载书
  onLoad: function() {
    try {
      var value = wx.getStorageSync('userinfo')
      if (value) {
        this.getUserBook();
        this.setData({
          userInfo:JSON.parse(value)
        })
        app.globalData.userInfo = JSON.parse(value)
      }else{
        wx.showToast({
          title: '请先登录',
          duration: 2000
        })
      }
    } catch (e) {
      wx.showToast({
        title: '登录请求超时',
        duration: 2000
      })
    }
  },
  getUserBook(){
    let _this = this;
    wx.request({
      url: 'http://www.jecksonli.com:3000/mybook',
      data:{
        username:this.data.userInfo.nickName
      },
      success(res){
        _this.setData({
          bookItem:res.data
        })        
      }
    })
  },
  manages:function(){
    let _this =this;
    this.setData({
      shelfManage:!_this.data.shelfManage
    })
  },
  canselBook:function(){
    this.setData({
      shelfManage:false,
      checked:true
      
    })
  },
  canselNovel:function(){
    let _this = this;
    wx.request({
      url: `http://www.jecksonli.com:3000/deleteBook`,
      data:{
        deleteBook:_this.data.deleteBook
      },
      success(res){
        if(res.statusCode == 200){
          _this.getUserBook()
          _this.setData({
            isChecked:false,
            checked:false
          })
        }     
      }
    })
  },
  Not:function(){
    this.setData({
      isChecked:false,
      checked:false
    })
  },
  checkboxChange:function(e){
    let _this =this;
    let deleteBooks = this.data.bookItem
    for (let i = 0; i < deleteBooks.length; i++) {
      if(deleteBooks[i].deleteId === e.currentTarget.dataset.bookid){
        delete deleteBooks[i].deleteId
      }else{
        if(deleteBooks[i].bookid === e.currentTarget.dataset.bookid){
          deleteBooks[i].deleteId = e.currentTarget.dataset.bookid
        }
      }      
    }
    this.setData({
      deleteBook:deleteBooks
    })
  },
  allCheckFn:function(){
    this.setData({
      isChecked:true
    })
  },
  allCheckFnNo:function(){
    this.setData({
      isChecked:false
    })
  },
  // 点击书籍进入阅读
  gotoRead:function(e){
    console.log(e)
    wx.navigateTo({
      url: `../read/read?bookid=${e.currentTarget.dataset.bookid}`
    })
  },
  //添加书籍
  addBook:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  onShow:function(){
    
    try {
      var value = wx.getStorageSync('userinfo')
      if (value) {
        this.getUserBook();
        this.setData({
          userInfo:JSON.parse(value)
        })
        app.globalData.userInfo = JSON.parse(value)
      }else{
        wx.showToast({
          title: '请先登录',
          duration: 2000
        })
      }
    } catch (e) {
      wx.showToast({
        title: '登录请求超时',
        duration: 2000
      })
    }
    
  }
})
