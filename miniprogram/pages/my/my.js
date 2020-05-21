var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:''
  },
  login:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({
      success: res => {
        
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              wx.setStorage({
                key:"userinfo",
                data:JSON.stringify(res.userInfo)
              })
              app.globalData.userInfo = JSON.stringify(res.userInfo)
            },fail:err => {
              console.log(err)
            }
          })
        }
      }
    })
  },
  gotoMyBook:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  aboutWe:function(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  }
})