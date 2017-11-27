

let req=require("../../../common/request.js");

const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    menu:"",
    isErr:false
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

    console.log(menu, app.pages[menu])

    // 获取内容列表
    req.send(menu,"GET",{},res=>{

        //console.log(res)
        
        let obj = {
            list: res.content,
            menu: menu
        };

        res.source && (obj.source = res.source);

        that.setData(obj)

    },err=>{

        that.setData({
            isErr:true
        })
        console.log("发生了错误---->",err)
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
    
      const index = e.currentTarget.dataset.index;
      let param={};

      if (index == 0 && typeof this.data.list[index].visible==="undefined"){
          this.data.list[index].visible=true
      }

      param["list[" + index + "].visible"] = !this.data.list[index].visible
      
      this.setData(param)
      
      console.log(e.currentTarget.dataset.index)
          
  },

  clickHandler: function (e) {
      
      let menu = this.data.menu;
      const that=this;

      console.log("menu--------------->",menu)

      // 传递 subTitle 作为详情页 title 一部分
      let dataset = e.currentTarget.dataset
      let subTitle = dataset.title
      
      dataset.menu=menu
      console.log(dataset)

      try {

          //参数无法传递参数，故而使用本地同步存储 
          wx.setStorageSync('page-options', getOptions.call(this, dataset));

      } catch (e) {

      }

      //  跳链接
      wx.navigateTo({
          url: getNavigateUrl(menu)+ '?name=' + menu + '&subTitle=' + subTitle
      });
  }

})

function getNavigateUrl(name) {

    var url = '';

    switch (name) {
        case 'awesome':
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

// 获取到相应点击列表的子数据，然后保存起来
function getOptions(dataset) {

    var obj = {}, list = this.data.list;
    var index = dataset.index,
        i = dataset.i,
        j = dataset.j;

    switch (this.data.menu) {
        
        // 学习路线
        case 'awesome':
            obj = list[j].timeline;
            break;

        // 练手项目
        case 'project':
            obj = list[i].subdomains[j].projects;
            break;

        // 工具箱，在线文章，-
        default:
            obj.path= list[j].path;
    }

    obj.menu=dataset.menu // 传递菜单名字

    // 如果存在基本路径，就传递基本路径
    if(this.data.source) {
        obj.source=this.data.source;
    }

    return obj;
}