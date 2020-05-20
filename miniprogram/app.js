//app.js
App({
  onLaunch: function () {
    
    this.globalData = {}
  },
  onShow:function(){
    wx.getUserInfo({
      success: res2 => {
        // console.log(res2)
      },
      fail: err => {
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login'
              })
            }
          }
        })
      }
    })
  },
  globalData:{
    userInfo:null
  }
})
