const Api = require('../../utils/api.js');
const utils = require('../../utils/util.js');
const Pagination = require('../../utils/pagination.js');



Page({
    data: {
        topicsList: [],
        tabClass: 'tab-item',
        tab: 'all'
    },    
    onLoad : function() {
        this.fetchData();
    },
    fetchData: function(data) {
        var self = this;
        // 请求的回调函数中this指向wx
        data = data ||  {};

        if(!data.page) data.page = 1;
        console.log(data)
        wx.request({
          url: Api.getTopics(data),
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function(res){
            // success
            var topics = res.data.data;
            topics = topics.map(function(item){
                item.page = parseInt(data.page);
                return self.cook(item);
            })
            console.log(topics)

            self.setData({
                topicsList: topics
            })
          },
          fail: function() {
            // fail
          }
        })
    },
    cook: function(data){
        
        data.last_reply_at = this.timeAgo(data.last_reply_at);
        data.title = this.controlTitleLength(data.title);
        this.cookTag(data);
        return data;
    },
    cookTag: function(data) {
        var tab  = data.tab;
        var top = data.top;
        var good = data.good;
        var tag;

        switch (tab) {
            case 'share':
                tag =  '分享';
                break;
            case 'job':
                tag = '招聘';
                break;
            default:
                tag =  '问答';
                break; 
        }

        if(good === true) {
            tag = '精华'
            data.tagClass = 'top-tag'
        }
        if(top === true) {
            tag = '置顶'; 
            data.tagClass = 'top-tag'
            
        }
        data.tag = tag;
        return data;
    },
    timeAgo : utils.timeAgo,
    controlTitleLength: function(title){
        if(title.length > 20){
            return title.substring(0,20) + '...' 
        }
        return title;
    },

    // event
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
    changeTab: function(event){
        var tab = event.currentTarget.id;
        this.fetchData({tab: tab});  

        if(tab === 'all') {
            this.data.tab = all;
        }else {
            this.data.tab = tab;
        }
             
    },
    changePage: function(event){
        console.log(event)
        var page = event.currentTarget.dataset.page;
        if(page < 1) return;
        if(this.tab === 'all') {
            this.fetchData({page: page});        
        }else {
            var tab = this.data.tab;
            this.fetchData({tab:tab,page: page});        
        }
    }
})