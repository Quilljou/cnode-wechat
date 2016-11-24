const URL = "https://cnodejs.org/api/v1";

const GET_TOPICS = "/topics";

const GET_TOPICS_BY_ID = "/topic/";

const GET_USER_BY_ID = '/user/';

const LOGIN = '/accesstoken';

function obj2url (obj) {
    return Object.keys(obj).map(function(k){
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
}

module.exports = {
    // 获取列表数据
    getTopics : function(obj) {
        return URL + GET_TOPICS + '?' + obj2url(obj);
    },
    // 
    getTopicById: function (id,obj) {
        return obj === 'undefined' ? URL + GET_TOPICS_BY_ID + id : URL + GET_TOPICS_BY_ID + id + '?' + obj2url(obj);  
    },
    login: function(tokenObj) {
        return URL + LOGIN + '?' + obj2url(tokenObj);
    },
    getUserById: function(username){
        return URL + GET_USER_BY_ID + username;
    }
}
