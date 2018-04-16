

let app = getApp();
let util= require("../../common/util.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg:[],
        isClose:false, // 操作留言框显隐的按钮的状态
        isVisible: false, // 留言框是否可见
        isShowBg:false, // 留言框 背景是否可见
        loading:false, // 留言是否正在加载下一页标识符
        allLoaded:false, // 留言是否全部加载标识符
        commentValue:'', // 留言内容
        pulled:true,// 停止下拉
        page:1 // 当前页数
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        wx.showLoading({
            mask: true
        });

        console.log("----\n","/n------------")

        this.getComments(1)

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        let that=this;
        this.setData({
            pulled:false
        })
        // 刷新数据
        this.getComments(1, function () {
            wx.stopPullDownRefresh()
            that.setData({
                pulled: true
            })
        })  
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

        this.getComments(this.data.page) // 获取下一页
    },

    // 获取留言
    getComments(page,callback){

        let that=this;
        
        // 如果已经全部加载完了,而且请求的页数不为1，就不用再进行下面的操作了
        if (this.data.allLoaded && page!=1) return ;

        // 页数不为1，说明不是翻页
        if (page != 1) {
            that.setData({
                loading: true
            })
        }

        // 发送请求获取留言
        wx.request({
            url: app.COMMONURL + 'Comments',
            method: "GET",
            data: {
                limit: 10,
                skip:(page-1)*10,
                order:"-createdAt" // 按时间最新
            },
            dataType: "json",
            header: {
                'content-type': 'application/json', // 默认值
                "x-avoscloud-application-id":"xxxx", // 个人LearnCloud验证字段
                "x-avoscloud-application-key":"xxx" // 个人LearnCloud验证字段
            },
            complete() {

                wx.hideLoading() // 请求完成，关闭加载中
                
                that.setData({
                    loading: false
                })

                typeof callback=="function" && callback();

            },
            success(res) {

                let results = res.data.results;
                let len=results.length;
                let pageData=that.data;

                results.forEach((item)=>{
                    item.createdAt = util.formatTime(item.createdAt)
                })


                // 判断是否存在下一页
                if (len < 10 && len>=0) {
                    that.setData({
                        allLoaded:true
                    })
                } else {
                    that.setData({
                        allLoaded: false
                    })
                }

                // 拼接数据
                if (page == 1) {
                    that.setData({
                        msg: results
                    })
                } else {
                    that.setData({
                        msg: pageData.msg.concat(results)
                    })
                }

                if (len == 0) return;
                
                // 请求成功，页数+1
                that.setData({
                    page: page + 1
                })

            },
            fail() {
                wx.showToast({
                    title: "获取留言失败",
                })
            }
        })
    },

    // 显示或显示评论框
    CommentBoardToggle(){
        this.data.isClose == '' ? this.showBoard() : this.hideBoard()
    },

    // 显示评论框
    showBoard(){
        this.setData({
            isClose: true,
            isVisible:true,
            isShowBg: true
        })
    },

    // 关闭评论框
    hideBoard(){
        this.setData({
            isClose: false,
            isVisible: false,
            isShowBg: false
        })
    },

    // 双向绑定用户输入
    bindKeyInput(e) {
        this.setData({
            commentValue: e.detail.value
        })
    },

    // 发送留言内容
    sendMsg(){

        let that=this,userInfo;
        
        // 判断留言是否为空
        if (this.data.commentValue.trim()==''){

            wx.showToast({
                image:"/img/warn.png",
                title: "空留言啊兄弟",
            })

            return;
        }

        userInfo=app.userInfo; // 获取用户信息
        
        // 提交留言加载中
        wx.showLoading({
            title:"提交中...",
            mask:true
        });

        // 关闭留言框
        this.hideBoard();
        
        // 请求添加留言
        wx.request({
            url: app.COMMONURL+'Comments',
            method:"POST",
            data: {
                content: that.data.commentValue,
                avatar: userInfo.avatarUrl,
                username: userInfo.nickName
            },
            dataType:"json",
            header: {
                'content-type': 'application/json', // 默认值
                "x-avoscloud-application-id":"xxxx", // 个人LearnCloud验证字段
                "x-avoscloud-application-key":"xxx" // 个人LearnCloud验证字段
            },
            success(res) {

                wx.showToast({ title:"留言成功" });

                // 立即推送进数组里面
                that.data.msg.unshift({ 
                    content: that.data.commentValue,
                    avatar:userInfo.avatarUrl,
                    username: userInfo.nickName,
                    createdAt: util.formatTime(new Date())
                });

                // 发表成功之后滚到顶部
                wx.pageScrollTo({
                    scrollTop: 0
                })

                // 清空留言板
                that.setData({
                    msg: that.data.msg,
                    commentValue:''
                })

            },
            fail() {
                wx.showToast({ title: "留言失败" })
            },
            complete(){
                wx.hideLoading()
            }
        })

    }
})