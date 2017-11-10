

let req=require("../../../common/request.js");

const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    menu:"",
    showIndex:""
  },

  /**
   * 生命周期函数--监听小程序显示
   */
  onLoad(options) {
    
    const menu=options.name;
    const that=this;

    // 动态设置标题内容
    wx.setNavigationBarTitle({
        title: app.pages[menu]
    })

    // 获取内容列表
    req.send(menu,"GET",{},res=>{

        console.log(res)

        that.setData({
            list: res.content,
            menu: menu
        })

    },err=>{

    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

      let menu = this.data.menu

      return {
          title: app.pages[menuu],
          path: '/pages/home-inside/list/list?name=' + menu,
          success: function (res) {
              // 分享成功
          },
          fail: function (res) {
              // 分享失败
          }
      }
  },
  
  showContent(e){
      
      this.setData({
          showIndex: e.currentTarget.dataset.index
      })
  },

  clickHandler: function (e) {
      
      let menu = this.data.menu
      // 传递 subTitle 作为详情页 title 一部分
      let subTitle = e.currentTarget.dataset.title

      try {
          //参数无法传递参数，故而使用本地存储 
          wx.setStorageSync('options', getOptions(e.currentTarget.dataset));
      } catch (e) {

      }

    //  跳链接
      wx.navigateTo({
          url: getNavigateUrl(app.pages[menu])+ '?name=' + menu + '&subTitle=' + subTitle
      });
  }

})

function getNavigateUrl(name) {

    var url = '';

    switch (name) {
        case 'timeline':
            url = '/pages/home-inside/article/article';
            break;
        case 'project':
            url = '/pages/home-inside/panel/panel';
            break;
        default:
            url = '/pages/home-inside/markdown/markdown';
    }

    return url;

}