

let req=require("./request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    menu:""
  },

  /**
   * 生命周期函数--监听小程序显示
   */
  onLoad(options) {
    
    const menu=options.name;
    const that=this;

    console.log(menu)
    
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
    
  }
  
})