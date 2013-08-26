/*********************************************插件外公共方法 - 后期整理出去****************************************************/ 
/**
 * 统计“真实字符长度”的方法，用于微博的字数统计，一个汉字算2个长度
 */
String.prototype.realLength = function(){
    return this.replace(/[^\x00-\xff]/g,"**").length; // [^\x00-\xff] - 匹配非双字节的字符 
};

//顶部发表评论的回调
function topCallback(data){
    jQuery(document).comment('pubCallback', 'top', data, new Date().getTime());
}

//弹出框发表评论的回调
function popCallback(data) {
    jQuery(document).comment('pubCallback', 'pop', data, new Date().getTime());
}

function getUin(){
    var cookieUin = jQuery.cookie('uin') || jQuery.cookie('luin');
    return cookieUin && cookieUin.match(/[1-9][0-9]*/)[0];
}

function getKey() {
    return jQuery.cookie('skey') || jQuery.cookie('lskey');
}

function generateToken(key) {
    var hash = 2013;
    for(var i = 0, len = key.length; i < len; i++) {
        hash += (hash << 5) + key.charCodeAt(i);
    }
    return hash & 0x7fffffff;
}