

let req = require("../../../common/request.js");
let app = getApp()
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


        const title = options.subTitle+"-" + app.pages[options.name]

        try {

            var detail = wx.getStorageSync('page-options');
            this.setData({ list: detail });

            console.log(11111111111,detail)

        } catch (e) {
        }

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
            path: '/pages/home-inside/panel/panel?name=project',
            success: function (res) {
                // 分享成功
            },
            fail: function (res) {
                // 分享失败
            }
        }
    },

    setClipboardData: function (e) {

        //复制链接
        var url = e.currentTarget.dataset.url;

        wx.setClipboardData({
            data: url,
            success: function (res) {
                wx.showToast({
                    title: '链接已复制',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    }
})