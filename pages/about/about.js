

const qrImgs = [
    'http://www.unclexiao.com/cdn/mini-growth/QR/Phodal.jpg',
    'http://www.unclexiao.com/cdn/mini-growth/QR/unclexiao.jpg',
    'http://www.unclexiao.com/cdn/mini-growth/QR/zhu.jpg'
]

Page({

    /**
     * 页面的初始数据
     */
    data: {
        members:[ {
            name: "Phodal",
            avatar: "/img/avatar/Phodal.jpg",
            signature: "待我代码编成，请你为妻可好"
        },{
            name:"unclexiao",
            avatar:"/img/avatar/uncle.jpg",
            signature:"爱代码爱生活，不负代码不负卿"
        },{
            name: "神仙朱",
            avatar: "/img/avatar/hoho.jpg",
            signature: "不辜负自己，哪里会认输"
        }, {
            name: "甘国豪",
            avatar: "/img/avatar/hao.jpg",
            signature: "饭前饭后一根烟，快活似神仙"
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: "开发者团队",
            path: '/pages/about/about',
            success: function (res) {
                // 分享成功
            },
            fail: function (res) {
                // 分享失败
            }
        }
    },

    // 复制链接
    setClipboardData: function (e) {

        //复制链接
        const clip = e.currentTarget.dataset.clip;
        const clipType = e.currentTarget.dataset.cliptype;

        wx.setClipboardData({
            data: clip,
            success(res) {
                wx.showToast({
                    title: clipType+'已复制',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },

    // 显示个人公众号二维码
    showQRcode(e){

        const person = e.currentTarget.dataset.person;
        const url = qrImgs[person];

        if(!url){
            wx.showToast({
                image: "/img/warn.png",
                title: '该成员暂无公众号'
            })
            return ;
        }

        wx.previewImage({
            current:url,
            urls: qrImgs
        })
    }
})