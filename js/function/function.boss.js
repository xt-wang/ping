/**
 * BOSS平台上报函数
 * 用于发送指定接口的统计数据
 * cursite 当前所属频道页面 ，classType 业务类型：1 是boss 2是PGV，opType 操作类型: 1 是评论页 2 是文章底层， iStatus 操作结果
 */
function sendClientStat(site,classType,iTargetid, opType, iStatus) {
		var newsUrl = location.protocol + '//' + location.host + location.pathname;
		var iFlow = parseInt(Math.random() * 1000000000),iQQ = getUin() || '',iUid = jQuery.cookie('uid');  // 公共参数
		var urlAll = newsUrl;
		var mainLost = encodeURIComponent(location.host);
		if(site == 'coral'){   // boss 上报
			if(classType == 1){
				var iTy = 1836,biz = 'coral.web.comment_detail.action';
			}else{
				var iTy = 1837,biz = 'coral.web.comment_detail.pgv';
			}
		}else{
			if(classType == 1){
				var iTy = 1836,biz = 'coral.web.article_detail.action';
			}else{
				var iTy = 1837,biz = 'coral.web.article_detail.pgv';
			}
		}
		iStatus = iStatus || 0;
		g_btrace_BOSS = new Image(1,1);
		g_btrace_BOSS.src = "http://btrace.qq.com/collect?sIp=0&iQQ=" +iQQ+ "&sBiz=" +biz+ "&sOp=" +opType+ "&iSta=" +iStatus+ "&iTy=" +iTy+ "&iFlow="+iFlow+  "&isite=" + site + "&iTargetid=" + iTargetid + "&iuid="+ iUid + "&iUrl=" + urlAll + "&idomain=" + mainLost;
} 