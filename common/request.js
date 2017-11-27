
function request(route, method, data, success, fail) {

    wx.showLoading();

    wx.request({
        url: "https://www.unclexiao.com/cdn/slash/" + route+"/api/all.json",
        method: "GET",
        data: data,
        complete(){
            wx.hideLoading();
        },
        success (res) {

            typeof success == 'function' && success.call(this, res.data)
        },
        fail (err) {

            typeof fail == 'function' && fail.call(this, err)
            console.error('wx.request error:' + route);
        }
    });
    
}

module.exports={
    send: request
}