

let req = require("../../../common/request.js");
let WxParse = require('../../../common/wxParse/wxParse.js')


let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      textContent:'',
      article:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      let that = this;

      try {

            var detail = wx.getStorageSync('page-options');

            wx.showLoading();

            // 请求获取 md 资源文件，detail 是一个 路径
            wx.request({
                url: detail.source +detail.path,
                method: "GET",
                data: {},
                complete() {
                    wx.hideLoading();
                },
                success: function (res) {

                    // that.setData({
                    //     textContent:res.data
                    // })
                    
                    // 解析 md 资源文件
                    WxParse.wxParse('article', 'md', res.data, that, 5);
                },
                fail: function (err) {
                    console.error('wx.request error:' + route);
                }
            });
            

      } catch (e) {

      }

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