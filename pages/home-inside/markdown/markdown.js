

let req = require("../../../common/request.js");
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      
      const title = options.subTitle + app.pages[options.name]

      this.setData({
          title: title
      })

      wx.setNavigationBarTitle({
          title: title
      })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      return {
          title: this.data.title,
          path: '/pages/home-inside/markdown/markdown?name=project',
          success: function (res) {
              // 分享成功
          },
          fail: function (res) {
              // 分享失败
          }
      }
  }
})