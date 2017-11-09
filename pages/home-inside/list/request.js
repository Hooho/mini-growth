
// 配置环境：本地、开发、生产
function getServerUrl(route) {

    return `http://www.unclexiao.com/cdn/slash/${route}`;
}

function request(route, method, data, success, fail) {

    wx.showLoading();

    wx.request({
        url: "https://phodal.coding.me/growth/" + route+"/api/all.json",
        method: "GET",
        data: data,
        complate(){
            wx.hideLoading();
        },
        success: function (res) {

            typeof success == 'function' && success.call(this, res.data)
        },
        fail: function (err) {
            console.error('wx.request error:' + route);
        }
    });
    
}

module.exports={
    send: request
}