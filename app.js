

App({

    onLaunch: function () {

        var that=this;

        // 获取用户信息
        wx.getUserInfo({
            withCredentials: false,
            lang: 'zh_CN ',
            success: res => {
                that.userInfo=res.userInfo
            },
            fail: res => {
                that.userInfo={
                    userName:"匿名用户"
                }
            }
        })

        return ;
        
        /* *
        * 如果withCredentials 为true，那么就要登陆
        * 如果登陆之后，返回的信息会包括 encryptedData,iv
        */
        wx.login({
            success(res) {

                if (res.code) {
                    
                    console.log("请求成功了", res.code)
                   return ;

                    // 发起网络请求，请求自己的服务器，使用 code 换取 openid 和 session_key 等信息
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session',
                        method:"GET",
                        data: {
                            appid:"wxfa49352d435840e7",
                            secret:"fc5e72b35773a69743c7eda28c3bb270",
                            grant_type:"authorization_code",
                            code: res.code
                        },
                        success(res){

                            let data=res.data;
                            let openId = data.openid;
                            let session_key = data.session_key;

                            console.log(res)
                        }
                    })

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });

    },

    COMMONURL:"https://leancloud.cn/1.1/classes/",  // 请求公用URL
    userInfo:null,
    pages:{
        awesome: "学习路线",
        project: "练手项目",
        toolbox: "高效工具",
        articles: "文章精选",
        test: "技能测验",
        read: "读书路线",
    }
})
