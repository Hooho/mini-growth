

let req = require("../../../common/request.js");
let WxParse = require('../../../common/wxParse/wxParse.js')

const app = getApp()


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

        // 页面初始化 options为页面跳转所带来的参数
        const that = this;

        try {

            const detail = wx.getStorageSync('options');

            req.send('articles/' + detail, 'GET', {}, function (res) {
                WxParse.wxParse('article', 'md', res, that, 5);
            })

        } catch (e) {
        }

        const title = options.subTitle + app.pages[options.name]

        this.setData({
            title: title
        })

        wx.setNavigationBarTitle({
            title: title 
        })

        // 获取 subTitle，并拼接完整 title 作为分享 title
        this.setFullTitle(options.name, options.subTitle); 
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