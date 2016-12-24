const Api = require('../../utils/api.js');
const Util = require('../../utils/util.js');

Page({
    data: {
        detail: {}
    },
    onLoad : function(option) {
       var id = option.id;
       this.fetchDataById(id);
    },
    fetchDataById: function(id) {
        var url = Api.getTopicById(id,{mdrender : false});
        var self = this;
        wx.request({
          url: url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);

            var detail = res.data.data;

            detail = self.cook(detail);

            self.setData({
                detail : detail
            });
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    cook: function(data){
        var self = this;
        data.create_at = this.timeAgo(data.create_at);
        data.replies.map(function(reply,index){
            data.replies[index].create_at = self.timeAgo(reply.create_at);
        })
        console.log(data)
        return data;
    },
    timeAgo: Util.timeAgo,
    onShareAppMessage: function () {
    return {
      title: '分享',
      path: '/page/topics/topics'
    }
  }
})