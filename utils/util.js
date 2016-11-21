function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function timeAgo(time) {
    var diff; // s
    var before = '前';
    var period = ['秒','分钟','小时','天','月','年'];
    var second = [1, 60, 60*60, 60*60*24, 60*60*24*30, 60*60*24*30*12];
    
    switch (typeof time) {
        case 'number':
            diff = Math.floor((Date.now() - time) / 1000); 
        case 'object':
        case 'string':
            diff = Math.floor((Date.now() - ((new Date(time)).getTime())) / 1000); 
            break;
        default:
            return;
            break;
    }

    for(var i =  period.length; i  > 0; i--) {
        if(diff > second[i]) {
            return concat(i);; 
        }
    }

    function concat(i) {
        var num = Math.floor(diff / second[i]);
        var result =  num + period[i] + before; 
        return result;
    }

}


module.exports = {
  formatTime: formatTime,
  timeAgo: timeAgo
}
