

let req = require("../../../common/request.js");

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        // 页面初始化 options为页面跳转所带来的参数
        const that = this;

        try {

            var detail = wx.getStorageSync('page-options');
            this.setData({ list: detail });

            console.log('page-options', detail)

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
            path: '/pages/home-inside/article/article?name=project',
            success: function (res) {
                // 分享成功
            },
            fail: function (res) {
                // 分享失败
            }
        }
    }

})