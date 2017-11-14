

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[{
            icon:"icon-guide",
            text:'学习路线',
            url:"awesome"
        },{
            icon: "icon-code",
            text: '练手项目',
            url: "project"
        },{
            icon: "icon-tool",
            text: '高效工具',
            url: "toolbox"
        },{
            icon: "icon-read",
            text: '文章精选',
            url: "articles"
        }
        // , {
        //     icon: "icon-kaoshi",
        //     text: '技能测验',
        //     url: "test"
        // }, {
        //     icon: "icon-dushuhui",
        //     text: '读书路线',
        //     url: "read"
        // }
        ]
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: "学习首页",
            path: '/pages/home/home',
            success: function (res) {
                // 分享成功
            },
            fail: function (res) {
                // 分享失败
            }
        }
    },

    // 跳页 data-url，可以在dataset中访问url
    clickHandler(e) {

        var url = e.currentTarget.dataset.url;
        
        wx.navigateTo({
            url: '/pages/home-inside/list/list?name=' + url
        });
    }
})