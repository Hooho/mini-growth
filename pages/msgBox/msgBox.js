

Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg:[{
            text:"6666666"
        }, {
            text: "7777"
            }, {
                text: "888888888"
        }, {
            text: "999999999"
            }, {
                text: "999999999"
        }, {
            text: "999999999"
            }, {
                text: "999999999"
        }, {
            text: "999999999"
        }],
        isClose:'',
        isVisible:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 显示评论框
    showCommentBoard(){
        const isClose = this.data.isClose;
        if(isClose==''){
            this.setData({
                isClose:"close",
                isVisible:"visible"
            })
        }else{

            this.setData({
                isClose: "",
                isVisible:""
            })
        }
    }
})