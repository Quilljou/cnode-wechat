// 1501a921-b14e-4ca6-abb8-5a00e4b9cfa9
const Api = require('../../utils/api.js')


Page({
  requestLogin: function(event){
      var data = event.detail.value;
      var url = Api.login(data)

      wx.request({
        url: url,
        data: {},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          if(res.statusCode === 200) {
            var userInfo = res.data;
            userInfo.accesstoken =  data.accesstoken;

            wx.setStorage({
              key: 'user',
              data: userInfo,
              success: function(res){
                // success
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
                wx.navigateBack();
              }
            })
          }else {
            wx.showModal({
              title: 'Token错误',
              content: '请输入正确的Token'
            })
          }
        },
        fail: function(res) {
          // fail
          // wx.
        },
        complete: function() {
          // complete
        }
      })
  }  
})