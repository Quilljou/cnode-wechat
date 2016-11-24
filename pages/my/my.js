const Api = require('../../utils/api.js')
const utils = require('../../utils/util.js')

Page({
    data: {
        user: {},
        isLogin: false
    },
    onShow: function(){
        this.checkLoginStatus();
    },
   // events
    go2Login: function(event) {
        if(!this.isLogin) {
            wx.navigateTo({
                url: '../login/login'
            })
        }

    },
    checkLoginStatus: function() {
        var self = this;

        wx.getStorage({
          key: 'user',
          success: function(res){
            // success
        self.fetchUserInfo(res.data.loginname);

            self.setData({
                isLogin: true,
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    fetchUserInfo(username) {
        var self = this;
        var url = Api.getUserById(username);
        wx.request({
          url: url,
          data: {},
          method: 'GET', // OPTIONS, GET, ßHEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            for(var i = 0; i < res.data.data.recent_replies.length; i++) {
                res.data.data.recent_replies[i].last_reply_at = self.timeAgo(res.data.data.recent_replies[i].last_reply_at);
            }

          for(var i = 0; i < res.data.data.recent_topics.length; i++) {
                res.data.data.recent_topics[i].last_reply_at = self.timeAgo(res.data.data.recent_topics[i].last_reply_at);
            }

            self.setData({
                user: res.data.data
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    timeAgo: utils.timeAgo,
    go2Detail: function(event){
    var id = event.currentTarget.dataset.id;
    var url = '../detail/detail?id=' + id;
    
    wx.navigateTo({
        url: url,
        success: function(res){
        // success
        },
        fail: function() {
        // fail
        },
        complete: function() {
        // complete
        }
    })
    },
    logout: function(event) {
        var self = this;
        wx.removeStorage({
            key: 'user',
            success: function(res) {
                self.setData({
                    isLogin: false,
                    user: {},
                })
            } 
        })
    }
})