

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
        }, {
            text: "999999999"
        }, {
                text: "999999999"
        }],
        isClose:'', // 操作留言框显隐的按钮的状态
        isVisible:'', // 留言框是否可见
        loading:false, // 留言是否正在加载下一页标识符
        allLoaded:true, // 留言是否全部加载标识符
        commentValue:'' // 留言美容
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },
    

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log(11111111111111111)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    // 显示评论框
    showCommentBoard(){
        const isClose = this.data.isClose;
        if(isClose==''){
            this.setData({
                isClose:"close",
                isVisible: "visible",
                isShowBg:"showBg"
            })
        }else{

            this.setData({
                isClose: "",
                isVisible: "",
                isShowBg:""
            })
        }
    },

    // 双向绑定用户输入
    bindKeyInput(e) {
        this.setData({
            commentValue: e.detail.value
        })
    },

    // 发送留言内容
    sendMsg(){
        console.log(this.data.commentValue)
    }
})