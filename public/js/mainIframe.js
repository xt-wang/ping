	
	/*code by 2013.6.17  15:32*/
	/*最后更新时间 by 2013.6.18  17:05*/
	/*最后更新时间 by 2013.6.20  12:42*/
	/*最后更新时间 by 2013.6.20  17:76*/
	/*最后更新时间 by 2013.6.24  15:17*/
	/*最后更新时间 by 2013.6.25  11:18*/
	/*最后更新时间 by 2013.6.25  17:18  beta v1.0*/
	/*最后更新时间 by 2013.6.26  20:26  beta v2.0*/
    /*最后更新时间 by 2013.6.27  15:26  beta v3.0*/ 
	/*最后更新时间 by 2013.6.28  11:29  beta v4.0*/  // 修改了实时接口拉去方式	
	/*最后更新时间 by 2013.7.01  11:29  beta v5.0*/  // 
	/*最后更新时间 by 2013.7.04  17:58  beta v5.0*/  //  更新了trigger不支持bug update时间bug
	/*最后更新时间 by 2013.7.04  20:39  beta v5.0*/  //  更新了 遮罩层、弹出层获取数据方式
	/*最后更新时间 by 2013.7.011  18:36  beta v5.0*/  
	
	/****
		1.评论数接口和数据接口分离
		2.活跃页面才发送请求
		3.loadmore 按钮优化
	***/
	
	/*最后更新时间 by 2013.7.12  15:07  beta v6.0*/

	/****
		1.BOSS\PGV 统计
		2.测速
		
	***/
	
	/*最后更新时间 by 2013.7.15  17:54  beta v6.0*/

	/****
		1.个人评论提醒接口分离
		2.PGV 统计优化
		
	***/


	//微博拉取和发布接口的主机地址
    //var curHost = 'coral.qq.com';
	document.domain = 'qq.com';
	var v201309031621;
/*
 * jQuery cookie plugin
 * 已设置默认设置（config.defaults），domain=qq.com，path=/
 */
(function ($, document, undefined) {
    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {
        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);
            if (value === null) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                    encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path  ? '; path=' + options.path : '',
                    options.domain  ? '; domain=' + options.domain : '',
                    options.secure  ? '; secure' : ''
                    ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    config.defaults = {
        domain: 'qq.com',
        path: '/',
        expires: 7
    };

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };
})(jQuery, document);


/***
   切换浏览器tab，判断当前tab是否活跃
***/

(function(g, h, $, b) {
    var e, i, f = 'onfocusin' in h && 'hasFocus' in h ? 'focusin focusout': 'focus blur',
    d = ['', 'moz', 'ms', 'o', 'webkit'],
    c = $.support,
    a = $.event;
    while ((i = e = d.pop()) != b) {
        i = (e ? e + 'H': 'h') + 'idden';
        if (c.pageVisibility = typeof h[i] == 'boolean') {
            f = e + 'visibilitychange';
            break
        }
    }
    $(/blur$/.test(f) ? g: h).bind(f,
    function(m) {
        var l = m.type,
        j = m.originalEvent,
		
        k = j.toElement;
		
        if (!/^focus./.test(l) || (k == b && j.fromElement == b && j.relatedTarget == b)) {
            a.trigger((i && h[i] || /^(?:blur|focusout)$/.test(l) ? 'hide': 'show') + '.visibility')
        }
    })
} (this, document, jQuery));


	
	(typeof $ != 'undefined' && $.noConflict && typeof jQuery != 'object') && $.noConflict();
	jQuery(document).ready(function(){
	
				(function($){
				
						var beta = '6.0';
						var $doc = $(document);
						var $parent = $(parent.document) || '';  // iframe 情况
						var $win = $(window);
						var $body = $('body');
						var __uin = null;   //记录当前用户的uin
						var maxID = "";
						var defaultHeadPic = 'http://mat1.gtimg.com/news/dc/images/user.png'; 
						var newsUrl = location.protocol + '//' + location.host + location.pathname;
						var tabsFlag = 'true';
						var cmt_id = cmt_id || parent.cmt_id;

						/**
						 * 用于识别当前频道等
						 */
						 
						 
						var curSite = newsUrl.match(/https?:\/\/([^\.]+)/)[1];
						
						$.widget("qq.comment",{
							
							options: {
							
							
								dataSource0: '',  //默认首页评论列表数据源
								$content: $('#content'),
								$loginTrigger: $('#onekey'),  //一键登陆按钮
								$logoutTrigger: $('#loginOut'), //mini导航 退出按钮 
								loginEvent: 'logined',
								$popReply: $('#public_reply'), // 评论弹出框
								$topReply: $('#top_reply'),
								$topContent: $('#top_content'), //发布评论内容框
								$popContent: $('#pop_content'),
								$allComments: $('#allComments'),
								
								$showNum: $('#showNum'),
								$postBtns:$('#top_post_btn,#pop_post_btn'), // 发布评论按钮
								$commentTotleNum: $("#commentTotleNum"),  // 全部评论数
								
								$loadMore: $("#loadMore"), // loadmore 按钮
								toggleEvent: 'toggle',
								fetchUrl:'http://coral.qq.com/', // 公共域名
								
								wfetchUrl:'http://w.coral.qq.com/',

								//发布评论的回调函数
								
								topCallback: 'parent.topCallback',
								popCallback: 'parent.popCallback',
								
								//$maskObj: $('#maskObj'), // 弹出框遮罩
								
								$popObj: $('#popObj'), // 弹出框
								$allCons: $('#tab1_allComments'), // 全部评论页卡
								$myComments: $('#tab2_myComments'), // 我的评论页卡
								$tips: $('#tab3_tips'), // 提醒页卡
								$mycon: $('#tab4_mycon'),
								
								$loginFlag:$('#loginFlag'),
								
								$iframeHeight:'0',
								
								//$newsNum: $('#newsNum'),
								
								// 个人中心的变量
								
								$myCowComment: $('#myCowComment'), // 我的牛评按钮
								$myAllComment: $('#myAllComment'), // 个人中心 全部评论
								
								$tabFlag:true,
								$realtimeComments:0,
								$targetId: '',
								$insertFlag: 'comment',   // 标记回复评论位置								
								$nowDate:(new Date()),

								$urlapi:{
									userId:0,
									first:'',
									last:'',
									msgid:'',
									pageflag:0 
								},
								$urlapi_mycomment:{
									
									userId:0,
									first:'',
									last:'',
									msgid:'',
									pageflag:0
									
								},
								
								$urlapi_userComment:{
									userId:0,
									first:'',
									last:'',
									msgid:'',
									pageflag:0
									
								},
								loginuin:0,
								pubSucEvent: 'comment' + 'pubsuccess', //发表评论成功时触发事件（用于在页面插入最新评论）,
								topContentTips:'',
								homePageSize: 10,   // 主评论默认条数
								centerPageSize:10,   // 个人中心默认条数
								loadPageSize:20,   // 一次拉取条数
								newsNum: 0,   // 蓝条数字
								
								columSource:1,  // source 来源
								columCode: 1,  //编码
								columApi: 1,  // 接口
								columLink : 1,
								commentNumbers:''  // 页面上所有需要评论数的地方
								
							},
							_create:function(){
							
							   var _this = this;  
							   this.init();  // 个性化定义初始化 设置		
							   this.changeTab();
							   this.getTargetId();							  
							   this.bindSubmitEvent();
							   this.bindFooterEvent(this.options.$content);
							   this.bindOtherEvents();
							   this.makeCommentList();
							   this.tabsComment();
							   this.clickLoadMore();//个人中心的提醒 loadmore

							   
							   this.onScriptLoad();	
							   
							   this.sendStat(curSite);		
							   this.element.bind(this.options.loginEvent,function(event,uin, nick, headUrl){   //初始化登陆事件 -- 
								   _this.onLogined(uin, nick, headUrl);	
								
							    });
						
								 //绑定评论发表成功事件
								 
								this.element.bind(this.options.pubSucEvent, function(event, data) {
									_this.insertTempComment(data.data.commentid, data.data.content,data.data.parent,data.data.time,data.data.checktype);
									_this.options.$urlapi_mycomment.msgid = _this.options.$urlapi_mycomment.first;	
									_this.loadMyComment();
									_this.updateTime();
									
								});
							},
							
							
							init: function(){
							
							    var o = this.options;
							
									o.$targetId = cmt_id;  // 获取当前文章 targetId cmt_id 为页面全局变量
								
								var plunWidth = $(top.document).find('#commentIframe').css('width'); // 设置评论宽度 根据iframe宽度
								
								$(top.document).find('#commentIframe').css({'-webkit-transition-property':'box-shadow,height,border-color','-webkit-transition-duration':'0.6s,0.6s,0.6s','box-shadow':'0px 0px 0px 0px #d3d3d3'})
								$('#mainBody').css('width',plunWidth);
								
								
								o.commentNumbers = ($(top.document).find('.commentNumbers'))?($(top.document).find('.commentNumbers')):'';
								
								if(top.registerCoralEvent){
								
									if(top.registerCoralEvent.source){

										o.columSource = top.registerCoralEvent.source;
									
									}
									
									//console.log(top.registerCoralEvent.code);
									
									if(top.registerCoralEvent.code == 0 || top.registerCoralEvent.code == 1){

										o.columCode = top.registerCoralEvent.code;
									
									}
									
									if(top.registerCoralEvent.ownStyle){

										$('head').append('<link href="'+ top.registerCoralEvent.ownStyle +'" rel="stylesheet" type="text/css" media="screen"/>');
									
									}
									
									if(top.registerCoralEvent.listHiden){
									
											$('#content').hide();
											o.columApi = 0;
											$(top.document).find('#commentIframe').height(130);
									
									}
									if(top.registerCoralEvent.commentNums){
										
										o.homePageSize = top.registerCoralEvent.commentNums;
									
									}

									if(top.registerCoralEvent.commentLink == 0){
										
										o.columLink = top.registerCoralEvent.commentLink;
									
									}
								}
								

							},
							
							getTargetId: function(){    // 获取评论id
							
								if(window.ARTICLE_INFO){		
									window.ARTICLE_INFO.targetid = cmt_id;
								
								}else{
									window.ARTICLE_INFO = {};
									window.ARTICLE_INFO.targetid = cmt_id;
								}
								
							},
							
							
							getParentId:function(id){
								return $(document.getElementById('commentIframe').contentWindow.document.getElementById(id));
							
							},
							

							 /**
							 * 创建评论li-dom结构
							 * @param info 数据
							 * @param control 区分是否被审核掉的评论
							 * @param top 区分哪块用creat
							 */
							
						   creatHmtl: function(info,control,top){ 

								var headImg = info.userinfo ? (info.userinfo.head): defaultHeadPic; // 用户头像
								var commentnum = info.userinfo?info.userinfo.commentnum:'';
								var upnum = info.userinfo.upnum;
								var nick = info.userinfo.nick;
								
								var content = info.content.replace(/\n/g,'<br />');
								
								
								var area = info.userinfo.region.replace(/:/g,' ');
								var dis = !!control?control:'';
								var topIco = '';
								var topId = 'comment_';

								if(top=='msg'){ 
								
									topId = ('msg_');
									topIco = ''
									
								}
								if(top=='top'){ 
								
									topId = ('top_');
									topIco = 'topIco'
									
								}
								
								var hide = '';
								
								var popClick = 'popClick';
								
								//if(info.checkstatus == 2 && info.rep > 0){
//									
//									//hide = 'Occupy';
////									headImg = defaultHeadPic;
////									nick = '腾讯网友';
////									content = '<span class="s">正在审核中...</span>';
////									popClick = '';
//									
//								
//								}else if(info.checkstatus == 2 && info.rep <=0){
//									
//									hide = 'hide';
//									
//								}else{
//								
//									hide = '';
//								}
								
								var newstrHTML = "";
								if(info.checkstatus == 2 ){
										newstrHTML +="<li class='postHide ' id="+ topId + info.id +"><ul class='children'></ul></li>";
								}else{
												newstrHTML += "<li class='post "+dis+' '+topIco+' '+hide+"' id="+ topId + info.id +"><div class='post-content'><div class='indicator'></div><div class='avatar "+ popClick +"' post_uid = '"+ info.userinfo.userid + "'><span><img src='"+ headImg +"'/></span></div><div class='post-body'><div class='post-header'><span   post_uid = "+ info.userinfo.userid + " class='publisher "+ popClick +"'>"+nick+"</span>"
												+ ((info.parent == 0) ? "<span class='replywho' style='display:none'>回复了  " + info.replyuser + "</span>" :"<span class='replywho'>" + info.replyuser + "</span>")
												+"<span date=" + info.time + " class='uptime'>"+ this.formatTime(info.time) +"</span></div><div class='post-message-container'><div>" + content + "</div></div><div class='post-footer'><em class='newcoment' id=em_"+ info.id +"></em><span class='upvote'><a href='javascript:void(0)'><i>顶</i>(<em>" + info.up + "</em>)</a></span><span class='reply'><a href='javascript:void(0)'>回复</a></span></div></div></div><ul class='children'></ul></li>";
								
								}
												
												
								return newstrHTML
							},
							
						   makeCommentList: function(){    // 首页评论渲染 --后面需要修改

									    var _this = this;
										var o = this.options;
																				
										if(o.columLink == 1){
											o.$commentTotleNum.parent('a').attr('href','http://coral.qq.com/'+ ARTICLE_INFO.targetid);
										
										}else{
										
											o.$commentTotleNum.parent('a').attr('href','javascript:void(0)');
											o.$commentTotleNum.parent('a').css('cursor','text');
										}
										
										if($(parent.document.getElementById('cmtNum'))){
										
										  $(parent.document.getElementById('cmtNum')).attr({href:'http://coral.qq.com/'+ ARTICLE_INFO.targetid,target:'_blank'});
									
									    }
										
										_this.loadMore();
										
										o.$loadMore.find('span').unbind().bind('click',function(){
										
											$('#loadMore>span').hide();
											
											$('#loadMore>em').css('display','block').html('加载中...');
										
											var lastId = $('#allComments li:last').attr('id').split('_')[1];
											_this.loadMore(lastId);
											if(o.$loadMore.data('loadMoreNume') - o.homePageSize<=0){
												o.$loadMore.hide();
												o.$loadMore.data('loadMoreNume',0);
											}else{
												o.$loadMore.data('loadMoreNume',o.$loadMore.data('loadMoreNume') - o.homePageSize);
											}
											sendClientStat(curSite,1,cmt_id,'clk_allcomment_more');
												
										})
							},  //  makeCommentList方法结束
							
							
							makeHotList: function(){
							
								var _this = this;
							    var o = this.options;
								var moreUrl = o.fetchUrl + 'article/'+ ARTICLE_INFO.targetid +'/hotcomment?reqnum=1'
								
								$.ajax({
										
											url: moreUrl,
											dataType: 'jsonp',
											beforeSend: function() {
												_this._hotTimer0 = new Date().getTime();//Qoss时间戳
											},
											success: function(data){
											 	
												if(data.errCode == 0){
													
													var _hotTimer1 = new Date().getTime();//Qoss时间戳
													
													var num = (data.data.commentid.length);
											
													$.each(data.data.commentid,function(index,info){
								
														$('#allComments .post-list').prepend(_this.creatHmtl(data.data.commentid[num-index-1],0,'top'));
														
														
													});
													_this.conHeight(5);
													
													//o.$Recommend.html(_this.creatHmtl(data.data.commentid,0,top));
													
												}else{
												  //emptyListOrForbiddenL();
												}
												
												Qoss('zrpl', _this._hotTimer0, {1:(_this._hotTimer0+1),2:_hotTimer1,3: _hotTimer1}, 100);

											 }
										});
								
							},
							
							
							tabsComment : function(){    // 页卡公用方法
								
								var _this = this;
								var o = this.options;
								var tabs = function(t1,t2,c1,c2){

								   t1.bind('click',function(){ $(this).addClass('on');t2.removeClass('on');c1.show();c2.hide();_this.iframeHeight();});
								   t2.bind('click',function(){ $(this).addClass('on');t1.removeClass('on');c1.hide();c2.show();_this.iframeHeight();})
									
								 };
								 
								 var true1 = o.$content.find('div.main_titleTab').find('span.tab1');
								 var true2 = o.$content.find('div.main_titleTab').find('span.tab2');
								 var true3 = o.$content.find('div.chid_titleTab').find('span.tab1');
								 var true4 = o.$content.find('div.chid_titleTab').find('span.tab2');
								 tabs(true1,true2,o.$allCons,o.$myComments);
								 tabs(true3,true4,o.$tips,o.$mycon);
								
							},
							
							
							loadMore: function(lastID){
						
								var _this = this;
								var o = this.options;
								lastID = lastID || 0; 
								var pageNum = o.homePageSize;
								if(lastID){/*20130722 改loadmore条数为20*/
									pageNum = 20;
								}
								var moreUrl = o.fetchUrl + 'article/'+ ARTICLE_INFO.targetid +'/comment?commentid='+lastID+'&reqnum='+pageNum;
								
										function emptyListOrForbiddenL() {
										
											if($('#allComments li').length ==0){
												$('#allComments').children('.tipInfo').removeClass('waitting').html('暂无评论').show();
											}
											if(!$('#allComments .post-list').length){
												 $('#allComments').append("<ul class='post-list'></ul>");
											}
											
										}
										$.ajax({
											url: moreUrl,
											dataType: 'jsonp',
											beforeSend: function() {
												_this._latestTimer0 = new Date().getTime();//Qoss时间戳
											},
											 error: emptyListOrForbiddenL,
											 
											 success: function(data){
											 
												if(data.errCode == 0){
													
													   var _latestTimer1 = new Date().getTime();//Qoss时间戳
													
										               if((data.data.retnum < data.data.reqnum || data.data.total<=10)){
													
															$('#loadMore>span').hide();
															$('#loadMore>em').css('display','block').html('没有更多了');
															
														}else{
															$('#loadMore').show();
															$('#loadMore>em').hide();
															$('#loadMore>span').css('display','block');
														}

													o.$showNum.data('maxID',data.data.maxid); // 记录最大ID 用于更新新评论标记
													
													show1(data);
													
													if(!lastID){ // 如果是初始化首页列表 
													
													
														if(data.data.reqnum < data.data.total){
															o.$loadMore.show();
														}

													   //_this.loadNew(); // 启动实时长链接
													   
													   _this.probeEvent(); // 启动探测接口

													   o.$commentTotleNum.html('<span>' + data.data.total + '</span>' + '条评论');
													   
													   o.commentNumbers.html(data.data.total);
													   
													   
													   if($(parent.document.getElementById('cmtNum'))){
										
															$(parent.document.getElementById('cmtNum')).html(data.data.total);
									
														}
														 if($(parent.document.getElementById('cmtNum2'))){
										
															$(parent.document.getElementById('cmtNum2')).html(data.data.total);
									
														}
	
														_this.makeHotList();
													}
														
												}else{
												  emptyListOrForbiddenL();
												}
												
											
												
												Qoss('zxpl', _this._latestTimer0, {1:(_this._latestTimer0+1),2:_latestTimer1,3: _latestTimer1}, 100);

											 }
										});
										var show1 = function(commentList){
										    if(!commentList.data.commentid.length && $('#allComments li').length ==0){
												$('#allComments').children('.tipInfo').removeClass('waitting').html('暂无评论').show();
											}else{
												$('#allComments').children('.tipInfo').hide();
											}
											if(!$('#allComments .post-list').length){
												 $('#allComments').append("<ul class='post-list'></ul>");
											}
											
											$.each(commentList.data.commentid,function(index,info){
											
											   if(info.parent == 0 || $('#comment_' + info.parent).length == 0){
											   
													$('#allComments .post-list').append(_this.creatHmtl(info));
													
												}else{
												
													$('#comment_' + info.parent + '>ul.children').append(_this.creatHmtl(info));
												
												}
											});
											_this.iframeHeight();
											_this.conHeight();
											
	
										}
							},
							
							/*
							
							blueLine: function(targetId){  // 新评论前面蓝竖杠
							
							    var _this = this;
							
								var $idParent=''; // 父窗口ID
								
								var $id ='';    //子窗口 ID
									
								if($(targetId).length != 0){
									$idParent = $(targetId);
									$id =  $(targetId + '>.post-content');
								}else{
									$idParent = _this.getParentId(targetId.split('#')[1]);
									$id = $idParent.children('.post-content');
								}
								
								setTimeout(function(){
																$id.children('.indicator').animate({opacity:'0'},10000);
																
																setTimeout(function(){
														
																$id.children('.avatar').animate({'left':'0px'},400);
																$id.children('.post-body').animate({'padding-left':'10px'},400);
																$idParent.removeClass('blueflag');	
																
															},8000)},5000);
							
							
							},*/
							
							
							blueLine: function(targetId){
							
								setTimeout(function(){
																$(targetId+'>.post-content>.indicator').animate({opacity:'0'},10000);
																setTimeout(function(){
														
																$(targetId+'>.post-content>.avatar').animate({'left':'0px'},400);
																$(targetId+'>.post-content>.post-body').animate({'padding-left':'10px'},400);
																$(targetId).removeClass('blueflag');	
																
															},8000)},5000);
							
							
							},
							
							
							
							
							// 探测接口 有无新评论实时拉取更新
							
							
							
							probeEvent: function(){
							

								var _this = this;								
								var o = this.options;
								var realTime = function(){
								
									if(o.$tabFlag){ 
									
										$.ajax({
										
											url:'http://sync.coral.qq.com/t/'+ ARTICLE_INFO.targetid,
											
											dataType: 'jsonp',
									        jsonpCallback:'userNum',
											success:function(data){ 
											
													
												if(data > o.$realtimeComments && data!=0){
												
													o.$realtimeComments = data;
													
													_this.loadNew();
													
													//setTimeout(function(){realTime()},30000);	
												}
												
												setTimeout(function(){realTime()},30000);	
												
											},
											
											error:function(){
											
												setTimeout(function(){realTime()},30000);
											
											}
										
										});
										
										if(_this.getLoginStatus() != 0){   // 如果用户存在
											
												_this.loadNum();  //  拉去个人评论数小气泡 
										
										}
										
									}else{

										setTimeout(function(){realTime()},30000);
									}

									_this.updateTime();	
								}
								
								realTime(); // 第一次执行探测
								
							},
							
							
							
							loadNew: function(){
								var _this = this;
								var o = this.options;
								var num = 0;

								var loadNewHtml = function(){
								
										if(o.$tabFlag){   // 切换浏览器页卡，不是活跃页面不执行实时请求
														
											$.ajax({
												url: o.fetchUrl + 'article/'+ ARTICLE_INFO.targetid + '/sync?lastid=' + o.$showNum.data('maxID'),
												dataType: 'jsonp',
												timeout:30000, // ajax请求超时时间 30秒 
												//error: emptyListOrForbiddenL,
												success:function(data){   //从服务器得到数据，显示数据并继续查询  

												    _this.options.$nowDate = data.info.time*1000;
													

													if(data.errCode == 0 && data.data.length!=0){ 
													
														if(data.data.maxid){
														
															o.$showNum.data('maxID',data.data.maxid);  // 更新 最新ID
									
														}
														
														$.each(data.data.commentid,function(index,info){
														
															if(info.checkstatus != 2){
															
																var a = o.$commentTotleNum.children('span').html();
															
																o.$commentTotleNum.children('span').html(parseInt(a) + 1);
																
																o.commentNumbers.html(parseInt(a) + 1);
																
																
																if($('#cmtNum')){
																
																$('#cmtNum').html(parseInt(a) + 1);

																}
																if($('#cmtNum2')){
																	
																	$('#cmtNum2').html(parseInt(a) + 1);

																}
														
															}

															
															if(info.parent == 0){   // 如果是主评论,则先放进中转站
																if(info.userinfo.userid != $.cookie('uid')){ 
																
																	$("#hiddenCon").prepend(_this.creatHmtl(info));	  // 包括自己的评论
																
																	var li = $("#hiddenCon li");

																	$.each(li,function(index,li){
																		$(li).addClass('blueflag');
																	});
																}
															
															}else{ // 不是主评论 是回复提示气泡
	
																$.each(o.$allComments.find('li'),function(index,data){
																
																	if(info.userinfo.userid != $.cookie('uid')){  // 判断是否是当前用户自己发的回复,如果是则没有气泡提醒

																		if('comment_'+ info.parent == data.id){ // 判断新增的id是否 和当前的一致
																		
																			if($('#'+data.id).data('num') == undefined){
																			
																				$('#'+data.id).data('num',0);
																				
																			}
																			
																			if($('#comment_'+ info.parent).hasClass('undis')){
																			
																				var numElement = $('#comment_'+ info.parent).parents('li:not(.undis):first');
																			
																				numElement.data('num',Number(numElement.data('num'))+1);
																				
																				var tips = numElement.data('num') + '条新回复';
																				
																				var moreBtn = numElement.find('.post-footer:first>em.newcoment');
																				
																				moreBtn.html(tips);
																				
																				moreBtn.show();
																				
																				//$(data).find('ul:first').prepend(_this.creatHmtl(info,'undis'));
																				
																			}else{
																			
																				$('#'+data.id).data('num',Number($('#'+data.id).data('num'))+1);
																				var tips = $('#'+data.id).data('num') + '条新回复';
																			
																				var moreBtn = $(this).find('.post-footer:first>em.newcoment');
																				
																				moreBtn.html(tips);
																				moreBtn.show();

																			}
																			
																			$(data).find('ul:first').prepend(_this.creatHmtl(info,'undis'));
	
																		}
																		
																	}	
																});

															}

															if($("#hiddenCon").html() && info.parent){
																	var newLi = $("#hiddenCon li");  //新获取的评论列表
																	var strChildHtml  = "";
																	
																	$.each(newLi,function(index,childInfo){
																	
																		if(('comment_'+info.parent) == childInfo.id){
																		  $(childInfo).children('.children').append(_this.creatHmtl(info));
																		}		
																	});
															};
																
																														
														});
														
														
														var blueLi = $("#hiddenCon li").not($('.hide')).length; 
																												
														if(blueLi){
														
															$("#showNum span").html('<em>' + blueLi + '</em> 条新评论');
															
															$("#showNum").show().animate({height:'30px'},'slow',function(){_this.iframeHeight()});
	
														
														}
														
														$("#showNum").unbind().bind("click",function(){
														
												
															$("#allComments ul:first").prepend($("#hiddenCon").html());
															
															$('#hiddenCon .blueflag').each(function(index, element) {
                                                                var id = $(this).attr('id')
																_this.blueLine('#'+id);
                                                            });


															$("#allComments li.temporary").remove();
															$("#hiddenCon").html('');
															
															$(this).hide();
															
															$('#allComments .tipInfo').hide();
															
															_this.iframeHeight();
															
															o.newsNum = 0;
															
															sendClientStat(curSite,1,cmt_id ,'clk_newcomment_notice');
														
														});

														   //setTimeout(function(){loadNewHtml()},5000); // 如果数据请求成功 隔2 秒 发起请求

													} else{
													
														   //setTimeout(function(){loadNewHtml()},5000); // 如果数据请求成功 隔2 秒 发起请求

													}

												    _this.updateTime();
												    //未从服务器得到数据，继续查询  
												 
												   /*
													if(data.errCode == -5){  
													
													    //$("#msg").append("<br>[无数据]");      
														
														loadNewHtml();				
															
													}

													*/													
												},           
											 error:function(XMLHttpRequest,textStatus,errorThrown){ 
											 
													 if(textStatus=="timeout"){ 
														   setTimeout(function(){loadNewHtml()},5000); // 如果数据请求成功 隔2 秒 发起请求
													 }      
											 }      
											});

											
														  // setTimeout(function(){loadNewHtml()},5000); // 如果数据请求成功 隔2 秒 发起请求
														    
										}else{
														
											//setTimeout(function(){loadNewHtml()},5000)
										}	
								}	
								loadNewHtml(); // 第一次执行		
							},
							
							/**  切换页卡 **/
							
							changeTab: function(){
							
							
								var o = this.options;
								var _this = this;

								$(document).bind({
									'show.visibility': function() {      // 当前活跃
									   o.$tabFlag = true;
									},
									
									'hide.visibility': function() {     // 失去当前状态
										o.$tabFlag = false;
									}
								});							
							},


							loadNum: function(){
							
								var _this = this;
								var o = this.options;
								var id = $.cookie('uid');
								var url = 'http://sync.coral.qq.com/u/'+id;
								if(!/^\d+$/.test(id + '')){
									
									return;
								}
								
								$.ajax({

											url: url,
											dataType: 'jsonp',
											beforeSend: function() {
												//self._latestTimer0 = new Date().getTime();//Qoss时间戳
											 },
											 
											 jsonpCallback:'propNum',

											 success: function(data){
												
													if( data > 0){
														$('#myCowComment em').html(data);
														$('#myCowComment em').show();
													}else{
														$('#popMsg').html('').hide();
												  
													}
													
											 }
									});
							
							
							},
							
							
							bindFooterEvent: function(container){   // 参数为评论列表容器
							
								var _this = this;
								var o = this.options;
								var publicContent = $('.pop_reply'); //获取公共评论框
								var publicSubmit = $('.pop_reply a.submit');
								var publicText = $('.pop_reply textarea');
								
								
								container.delegate('.reply','click',function(ev){    // 绑定弹框事件
								
								
									   var event = ev || window.event;
									   
									   var commentsId = $(this).parents('li.post').attr('id'); // comment_32424344

									   publicSubmit.attr('id',('pop_'+commentsId)); // pop_comment_32424344
									   publicText.attr('id',('pop_text_'+commentsId)); // pop_text_comment_32424344 
									   var childwrap = $(this).closest('.post-content').next('.children'); // 获取空层 .children
									   
									   
									   childwrap.find('.replyBtn a').removeClass('submitOn').addClass('submit').html('回复');
									   childwrap.find('textarea').val('');
									   
									   event.stopPropagation();  // 阻止冒泡
									   
									   
									   // 头部主评论框收起
									   
									   if($('#commentArea').hasClass('on') && o.$topContent.val() == o.topContentTips || o.$topContent.val().length <= 0){
											 $('#commentArea').removeClass('on');
											 if(o.$topContent.val().length <= 0){
													o.$topContent.val(o.topContentTips);
											 }
										};

									   if (childwrap.has('.pop_reply').length && (childwrap.children().first().attr('class')) == 'pop_reply'){
									   

												if(childwrap.children('.pop_reply').is(':visible')){
														childwrap.children('.pop_reply').slideUp('10',function(){_this.iframeHeight()});
														
														
														
													}else{
														childwrap.children('.pop_reply').slideDown('100',function(){_this.iframeHeight()});
														setTimeout(function(){childwrap.children('.pop_reply').find('textarea').focus()},200);
													}		
									   }
									   else{
											
											
											container.find('.pop_reply').slideUp('10',function(){
											
												$(this).remove();
												_this.iframeHeight();
											
											});
																					
											childwrap.prepend(publicContent.clone());
											
											childwrap.children('.pop_reply').slideDown('100',function(){_this.iframeHeight()});
											setTimeout(function(){childwrap.children('.pop_reply').find('textarea').focus()},200);
										
											
									   }
									   //_this.iframeHeight();
								});
								
								
								container.delegate('.pop_reply','click',function(event){

									event.stopPropagation();  // 阻止冒泡	
								
								});
								
								
								
								container.delegate('.submit','click',function(){  // 绑定submit提交按钮事件
								
									var _status = _this.getLoginStatus();  //先获取用户状态
									
									//var tid = $(this).parents('.post').attr('tid');//获取targetid
									var tid = $(this).closest('[tid]').attr('tid');
									if(_status != 0){      // 如果用户存在

										  _this.checkAndPublish(this.id,tid);
										

										  o.$insertFlag = this.id.split('_')[1]; // 标记发表回复的位置 comment/我的主评 msg/提醒 post/我的评论

										
										sendClientStat(curSite,1,cmt_id ,'pub_reply');
										
									}else {   //未登陆
										_this.showLoginLayer();
									}
								
								});
								
								/*
								
								container.delegate('.cancel','click',function(){  // 取消登录框显示
								
									$(this).parents('ul.children:first').children('.pop_reply').slideUp('10');
								
									//remove.$(this);
				
								});
								
								*/
								
								container.delegate('.pop_user_login','click',function(){
								
										_this.showLoginLayer();	
								
								});
								
								$('#my-notification').delegate('.upvote','click',function(){
								
											alert('自己不能顶自己');
											return false;
										
										});
								
								container.delegate('.upvote','click',function(){   //绑定顶事件 --  暂定需要登录才可顶
								
										var commentid = $(this).parent('.post-footer').children('em.newcoment').attr('id').split('_')[1];
										
										if($(this).find('a').hasClass('hasup')){
											return false;
										}
										
										if($(this).find('span').hasClass('hasup')){
											return false;
										}
										
										if($.cookie('uid') == $(this).parent().parent().prev(".avatar").attr('post_uid')){

											alert('自己不能顶自己');
											return false;
										}

										var url = o.wfetchUrl +'article/comment/up/to/'+commentid+'?targetid='+ ARTICLE_INFO.targetid;
										
										
										/*
										
										//构造FORM表单
										
										var _target = 'post_iframe';
										
										if (!$('#post_iframe').length) {
											$body.append('<iframe id="post_iframe" name="post_iframe" style="display:none"><script type="text/javascript">document.domain = "qq.com";</script></iframe>');
										}
										var _$form = $('#_upvote').length ?
											$('#_upvote').attr('action' ,url).empty() :
											$('<form action="'+ url +'" method="post" target="' + _target
													+'" id="_messageform" style="display:none;"></form>').appendTo($body);
										
										*/
									
										$.ajax({
											url: url,
											//dataType: 'script'
											//type:"post",
											dataType: 'jsonp',
											cache: true,
											beforeSend: function() {
												//self._upTimer0 = new Date().getTime();//Qoss时间戳
											},
											success: function(data) { //设置一个空回调防止屏蔽返回数据。
												
												sendClientStat(curSite,1,cmt_id,'pub_up');
											}
										});

										var emNum = $(this).find('em');
										var eNum = parseInt(emNum.text());
										emNum.html(eNum+1);
										$(this).find('a').addClass('hasup');
										$(this).find('span').addClass('hasup');
										$(this).find('i').html('已顶');
										
								
								});
								
								
								
								// 鼠标滑过个人信息 浮层 暂时不用
								
								/*
								container.delegate('.avatar','mouseover',function(){  // 鼠标滑过弹出个人信息
								
								    $(this).css('z-index','999');
									$(this).parents('li.post').css({'z-index':'999'});
									var userName = $(this).parent().find('span.publisher>a').html();
									var upop = $(this).children('div.userPopObj');
									if(upop.length){
										upop.show();
									}
									else{
									
										$(this).append($("<div class='userPopObj'>"+ userName + "</div>"));
									}
								
								});
								container.delegate('.avatar','mouseout',function(){ 
									$(this).parents('li.post').css('z-index','1');									
									var upop = $(this).children('div.userPopObj');
									if(upop.length){
										upop.hide();
									}
								});
								
								*/

								container.delegate('.popClick','click',function(){    // 点击头像
								
									var area = ''
									var data = {
										uid: $(this).attr('post_uid')            // 用户Uid
										
									}
									var data2 = $(this).attr('post_uid'); 
									o.$urlapi_userComment.msgid = '';
									
									_this.popupIframeLayer(data2); // iframe
									
									sendClientStat(curSite,1,cmt_id ,'clk_head'); // 不要莫名其妙 这是统计代码
								});

								
								
								container.delegate('.newcoment','click',function(){   // 点击显示回复数
									
									var trueId = $(this).attr('id').split('_')[1];
									$('#comment_' + trueId + '>ul.children li .newcoment').hide();
									$('#comment_' + trueId + '>ul.children li.undis').removeClass('undis').addClass('blueflag');
									
									_this.iframeHeight();
									
									$(this).hide();
									$('#comment_' + trueId).data('num',0);
											

									$('#comment_' + trueId + '>ul.children li.blueflag').each(function(index, element) {
                                        _this.blueLine('#'+$(this).attr('id'));
                                    });
									sendClientStat(curSite,1,cmt_id ,'clk_newreply_notice');
									
									
								});
								
								//加长评论的更多按钮20130730
								container.delegate('.spreadMoreBtn','click',function(){
									$(this).prev().css('height','');
									$(this).hide();
									_this.iframeHeight();
								});
								
							},		
							 /**
							 * 封装的用于显示登陆框的方法
							 * 方便日后不同登录方式的扩展
							 */
							 
							showLoginLayer: function(){ 
							
									var _this = this;
									//$(parent.document.getElementById('onekey')).click();
									publicLoginEvent();

							},
							
							
							/*登陆成功 - 更新状态 */
							
							onLogined: function(uin, nick, headUrl){
							
								var _this = this;
								var o = this.options;
								
								var uinn = (''+uin).match(/[1-9][0-9]*/)[0]; // uin 可以直接传cookie里获取的，也可以传处理过的qq号
								
								__uin = uinn || getUin();
								
								var userInfoHTML = '';
								var headImg = headUrl ? headUrl :defaultHeadPic;  //如果拉取头像失败就用默认图片

								
								
								 userInfoHTML = '<span class="myPic"><img width="35" height="35" src="' + headImg +'" onerror="this.src=\'' + defaultHeadPic +'\'"></span>'
                        + '<span class="myName">' +nick +'</span>'
						+'<span class="change">切换帐户</span>';
						
								
								$('#my-message .tipInfo').show();

								$('.pop_user_login').hide();
								
								 _this.options.$loginFlag.data('userPic',headUrl);
								 _this.options.$loginFlag.data('nick',nick);
								 
								$('#top_post_btn').show();
							    $('#top_post_btn_login').hide();
								
								this.options.$loginFlag.html(userInfoHTML).show();
								
								$('#my-message-list').html('');
								$('#my-notification-list').html('');
								$('#loadCmtMore').hide();
								
								if(_this.options.loginuin){
									_this.options.$topContent.focus();
								}

								_this.iframeHeight();
								
								// 个人中心 参数 初始化
								
								o.$urlapi_mycomment.msgid = '';
								o.$urlapi.pageflag = '0';
								o.$urlapi_mycomment.pageflag = '0';
								o.$urlapi_userComment.pageflag = '0';

								_this.loadMyMessage();   // 登陆以后个人中心加载
								_this.loadMyComment();
								
								
								
								
							},
							
							/* 退出 */
							
							loginOut: function(flag){
								
								var o = this.options;
								var uin = __uin;
								__uin = null;
								flag || this.options.$logoutTrigger.click();
								
								$('.pop_user_info').hide();
								$('.pop_user_login').show();
								o.$loginFlag.hide();
								o.$myAllComment.trigger('click'); // 退出以后 更新个人中心状态
								$('#top_post_btn').hide();
								$('#top_post_btn_login').show();
								
								//个人中心清空
								
								$('#my-message-list').html('');
								$('#loadMsgMore').hide();
								
							},
							
							/**
							 * 获取当前用户的登陆态
							 * return：0 未登录,(0==false)； 1, 登录但没有开通微博；2,微博用户
							*/
							getLoginStatus: function(){
								
								if(__uin != getUin()){  //登录状态出现异常，可能用户在其他页面已退出/切换账户
										
									try{
									 
									  this.loginOut();
									
									}catch(err)
									{
									  
									}
									
								}
								if(__uin){
									
									return 1;
								}
								return 0;
							},
							
							/**
							 * 点击发表按钮后的动作 /公共的submit 
							 */
							
							bindSubmitEvent:function(){
							
								var _this = this;
								var o = this.options;
								
								o.$postBtns.unbind().click(function(){
								
										_this.checkAndPublish(this.id);
										o.$insertFlag = 'comment'; 
									
								});
								
							},
							
							/* 发表评论前数据检查 */
							
							checkAndPublish:function(textAreaId,tid){
							
								var _this = this;
								var o = this.options;
								var popTextarea = textAreaId.replace(/pop/,"pop_text");
								var _$content = $('#'+ popTextarea);
								var position = textAreaId.split('_')[0];
								
								if( position == 'top') {
								
									_$content = o.$topContent;
									
									sendClientStat(curSite,1,cmt_id ,'pub_original');
										
								}
								if( $.trim(_$content.val()).length == 0 || _$content.val() == o.topContentTips) {
								
									this.pubCallback(textAreaId, {ret: 1, error2show: '请输入内容！'});
									
								} else if ($.trim(_$content.val()).realLength() > 2000) {
								
									if (position == 'top') {
										
										alert('超过1000个字了');
										
									} else {
										
										alert('超过1000个字了');
										//o.$popTips.hide().fadeIn('slow');
									}
								}else {
								
									if(getUin()){  // 验证登陆态
										
										if(position == 'top'){
										
											$('#top_post_btn_load').show();
											$('#top_post_btn').hide();
										}
										this.postData(textAreaId,tid);//
										
										
									
									}else{
									   _this.showLoginLayer();
									}
								
									//this.sendStat(position);
								}

							},
							
							
							 /**
							 * 构造表单，以post方式发表评论
							 * @param position 用于标识是从顶部评论框发表(position == "top") 还是回复
							 */
							postData: function(textAreaId,tid) {
							
							
								var o = this.options;

								this._pubTimer0 = new Date().getTime();//Qoss时间戳								
								var ccskey = generateToken(getKey());
				
								var popTextarea = textAreaId.replace(/pop/,"pop_text");	
								var parentId = textAreaId.split('_')[2];
								
								var position = textAreaId.split('_')[0];
								
								if(position == 'top') {
								
									this.submitForm({
									
										targetid: ARTICLE_INFO.targetid,
										type: 1,
										format:'SCRIPT',    // 返回数据格式
										callback: o.topCallback,
										content: $.trim(o.$topContent.val()),
										_method:'put',
										g_tk: ccskey,
										code: o.columCode,
										source: o.columSource
										
									});
								} else if(position == 'pop') { 

									$('#'+ textAreaId).html('').removeClass('submit').addClass('submitOn'); //pop_comment_5752674778955669598 
									this.submitForm({

										targetid: tid || ARTICLE_INFO.targetid,
										type: 1,
										format:'SCRIPT', 
										callback: o.popCallback,
										content: $.trim($('#'+ popTextarea).val()),
										_method:'put',
										g_tk: ccskey,
										code: o.columCode,
										source: o.columSource
										
									},parentId);
								}
							},
							
							
							 /**
							 * 发送BOSS统计
							 
							   site: 根据当前频道域名上报不同
							 
							 */
							sendStat: function(site) {

								var op;
								
								if(site == 'coral') {
									op = 'pgv_commentdetail';
								} else {
									op = 'pgv_articledetail';
								}
								
								sendClientStat(curSite,2,cmt_id,op);
								
							},

							 /**
							 * 抽取postData中的公共代码
							 * 用于组装表单并发送
							 */
							 
							 
							submitForm: function(fields,position) {
	
								var o = this.options;
								var loadUrl='';
								if(position){
									loadUrl = o.wfetchUrl + 'article/comment/to/'+ position;
								}
								else{
									loadUrl = o.wfetchUrl + 'article/comment/';
								}
								
								
								//构造FORM表单
								var _target = 'post_iframe';
								if (!$('#post_iframe').length) {
									$body.append('<iframe id="post_iframe" name="post_iframe" style="display:none"><script type="text/javascript">document.domain = "qq.com";</script></iframe>');
								}
								var _$form = $('#_messageform').length ?
									$('#_messageform').attr('action' ,loadUrl).empty() :
									$('<form action="'+ loadUrl +'" method="post" target="' + _target
											+'" id="_messageform" style="display:none;"></form>').appendTo($body);

								for(name in fields) {
									_$form.append( $('<input name="' + name + '" type="hidden" value="" />').val(fields[name]) );
								}
								_$form.submit();
							},
							
							
							 /**
							 * 发表评论的回调函数，用于展示评论发布成功或者错误的
							 * 该函数也有可能由前端调用，展示数据校验错误
							 * @param position 用于标识是从顶部评论框发表(position == "top") 还是 回复(position == "pop")
							 * @param data 接口返回的数据
							 * @param _pubTimer (optional)用于发送测速的时间戳
							 */
							
							 pubCallback: function(textAreaId, data, _pubTimer) {
							 
								var position = textAreaId.split('_')[0]; 
								
								var _this = this.options;
								var tips = '评论成功！ ';
								var rType = true;
                                var tipsFonts = '';
								if(position == 'top') { //顶部触发的回调
								
									if(data.ret) {
										
										tips = data.error2show || '<b>囧</b>... 出错了！ ';
										rType = false;
										
										setTimeout(function(){_this.$topContent.focus();_this.$topReply.find('span.tips').html(tips).fadeOut('fast'); },2000);
										
										//_this.$topReply.find('span.tips').html(tips).fadeOut('fast'); 
											
									} else if(data.errCode == 12){
										
										tips = '你操作太频繁了';
										$('#top_post_btn_load').hide();
										$('#top_post_btn').show();
									
									}
									else if(data.errCode == 14){
										
										tips = '你发过一样评论了';
										$('#top_post_btn_load').hide();
										$('#top_post_btn').show();
									
									}
									else{

										$('#top_post_btn_load').hide();
										$('#top_post_btn').show();
										this._trigger('pubsuccess', null, data);

									}
									
									_this.$topReply.find('span.tips').html(tips).fadeIn('fast'); 

									if (rType) {//如果没有错误，那么停留2秒后恢复之前状态
										
										_this.$topContent.val('');
										setTimeout(function() {
											_this.$topReply.find('span.tips').hide();
											
											_this.$topReply.find('span.fontsline').show();
											_this.$topContent.focus();
										}, 2000);
									}
									
									
									
								} else if (data.ret || data.errCode) { //弹出框触发的回调，数据出错时 
								
								    var liId = textAreaId.replace(/pop_/,'');

									var nowId = $('#'+ liId+ '>.children .tips'); // 本地验证
									
									var tipsWrap = $('#content').find('.pop_reply:visible .tips'); // 服务器返回错误信息验证
									var trueTextarea = $('#content').find('.pop_reply:visible textarea');
									
									var nowTextId = textAreaId.replace(/pop/,"pop_text");
									
									
									
									function tipsInfo(num){
									
										switch(num){
										
											case 12:
											
											tipsFonts = '你操作太频繁了';
											
											break;
											
											case 14:
											
											tipsFonts = '你发过一样评论了';
											break;
											
											default:
											tipsFonts = '系统出错请稍后再发';
										}
										
										tipsWrap.html(tipsFonts).hide().fadeIn('slow');
										
										$('#content').find('.pop_reply:visible .replyBtn a').removeClass('submitOn').addClass('submit').html('回复');
										
										setTimeout(function(){$(trueTextarea).focus();tipsWrap.html('');}, 2000);//2秒钟后focus
									
									}
									
									
									if(data.ret){
									
										tips = data.error2show || '<b>囧</b>... 出错了！ ';
										
										nowId.html(tips).hide().fadeIn('slow');
										
										setTimeout(function(){$('#'+ nowTextId).focus();nowId.html('')}, 2000);//2秒钟后focus
										
									}else if(data.errCode == 14){
									
										tipsInfo(14);
									
									}else if(data.errCode == 12){
								
									
										tipsInfo(12);
									
									}else{
									
										tipsInfo();
									
									}
									
								
									
									
									
								} else { //弹出框触发的回调，发布成功时

									this._trigger('pubsuccess', null, data);
								}

								if(_pubTimer) {
								
									Qoss('hfpljk', this._pubTimer0, {1:(this._pubTimer0+1),2:_pubTimer,3: _pubTimer});
								
								}
							},
							
							
							 /**
							 * 当用户发表评论成功后，将评论内容展示在评论列表中
							 * @param _content 需要展示的微博内容
							 * @param _pubTime 微博发布的时间
							 
							 */
							 
							insertTempComment: function(commentid,_content,parentid,_pubTime,check) {
						
							
								var _this = this;
								var o = this.options;
								var uin = __uin || getUin();

								var userName = o.$loginFlag.find('.myName').html();
								
								var userPic = o.$loginFlag.find('img').attr('src');

								var newstrHTML = '';

								var postLiwraper = ''

								if(check == 1){
									 var info = {
										id: commentid,            // 用户Uid
										parent: 0,
										time: _pubTime,  // 头像地址
										content: _content,   // 评论数
										up: 0,
										userinfo:{
											userid: $.cookie('uid'),
											commentnum: '',
											upnum: 0,
											nick: userName,
											head: userPic,
											region:''
										}
									 };

									newstrHTML = _this.creatHmtl(info,'blueflag',o.$insertFlag);	
										
								}else{
								
								   newstrHTML = "<li class='post temporary' id=comment_"+commentid+"><div class='post-content'>"
											   +"<div class='avatar'><span><img src='"+ userPic +"'/></span></div><div class='post-body'><div class='post-header'><span class='publisher'><span>"+userName+"</span></span><span class='uptime0'>刚刚</span><span class='wait'></span></div><div class='post-message-container'>" +_content+"</div><div class='post-footer' style='height:5px'><em></em></div></div></div><ul class='children'></ul></li>";
								}
							
								if(parseInt(parentid) != 0){
								
								   if($('#top_'+parentid).length || $('#comment_'+parentid).length || $('#post_'+parentid).length || $('#msg_'+parentid).length){
								   
									    $('#top_'+parentid+ '>ul.children').prepend(newstrHTML).children('div.pop_reply').hide();
									   
									   $('#comment_'+parentid+ '>ul.children').prepend(newstrHTML).children('div.pop_reply').hide();
									   
									   $('#post_'+parentid+ '>ul.children').children('div.pop_reply').hide();
									   
									   $('#msg_'+parentid+ '>ul.children').prepend(newstrHTML).children('div.pop_reply').hide();
									   _this.iframeHeight();
								   }   
								}
								else{
								    if($('#allComments .tipInfo:visible')){
										$('#allComments .tipInfo').hide();
									}
									this.options.$allComments.children('ul.post-list').prepend(newstrHTML);
								}
																
								if(o.$insertFlag != 'post'){
									
										_this.blueLine( '#'+ o.$insertFlag + '_' + commentid);/*20130710 by link*/
											
								}else{
								
									_this.blueLine( '#comment_' + commentid);
								}
									
							},
							
							
							
							/*  同步评论框 外iframe高度方法  */
							
							 iframeHeight: function(){
							 						
									var contentHeight = $('#mainBody').height();		
									$(top.document.body).find('#commentIframe').height(contentHeight);
		
							 },
							
							/*****
								
								弹出框 -iframe 版本
							
							
							******/
							
							
							popupIframeLayer: function(data){
							
								var _this = this;
								
								$(top.document.body).find('#commentIframe').attr('data',data);
								
									// 动态创建 Iframe
									
								if($(top.document.body).find('#popUpmask').length != 0){
									
									$(top.document.body).find('#popUpmask').show();

									top.document.getElementById('popUpmask').contentWindow.loadJs();
									
								}else{
								
									$(top.document.body).append('<iframe src ="http://www.qq.com/coral/popupPage.htm" allowTransparency="true"  frameborder="0" style="width:100%;z-index:999999;position:fixed;_position:absolute;*+position:fixed;_left:100px;top:0px;left:0px;border:none;overflow:hidden;" id="popUpmask"></iframe>');
									
									
									if ($.browser.msie && ($.browser.version == '6.0') && !$.support.style) {  //  ie6 兼容
									
										if($(top.document.body).find('#popUpmask').length != 0){
										
											$(top.document.body).find('#popUpmask').css('position','absolute');
										}
									}
									
																
								}

								
							},
							
							
							// iframe 弹出框 loadmore 方法
							
							
							popUploadMore: function(uin,flag){
							
								var _this = this;
								var o = this.options;
							
									o.$urlapi_userComment.pageflag = 1;//翻页标志 0:第一页 	1: 下一页	             2:上一页
									o.$urlapi_userComment.msgid = o.$urlapi_userComment.last;//更新最后列表标记
									_this.loadUserComment(uin,flag);
									
								
									
							},
							
							
					
			
							/**
							 * 弹出框方法 
							 * @param data 用于传进去个人信息	
							**/
							
							popupLayer: function(data){   // 传进去的个人数据
							
							    var o = this.options;
								var _this = this;
								var maxHeight = $doc.height() > $win.height()? $doc.height():$win.height();
								
								// 更新弹出框内容

								var userComment = o.$urlapi_userComment;
									userComment.userId = data.uid;
									//o.$urlapi.userId = data.uid;
									
								if(data.uid){
									
									$('#popInfo').html('');
									_this.loadUserComment();  // 更新评论内容
									
								}
								/* 初始化 */
								
								$('#loadPopInfo').hide();
								$('#loadPopInfo>span').css('display','block');
								
								$('#popObj .userPic').find('img').attr('src','http://mat1.gtimg.com/news/dc/images/user.png'); 
								$('#parent').hide();
								$('#div1').css('top','0px');
								$('#div3').css('top','0px');
								
								var meanwhile = function(){
								
									$('#popContent').height(o.$popObj.height()- 120);
									$('#popContent .popInner').height(o.$popObj.height()- 140);
									$('#div2').height($('#popContent .popInner').height());
									$('#parent').height($('#popContent .popInner').height());
									$('#div1').css('height',$('#parent').height()*$('#div2').height()/$('#div3').height());
									$('#div1').css('top','0px');
								    $('#div3').css('top','0px');
										
								}
								if ($.browser.msie && ($.browser.version == '6.0' || $.browser.version == '7.0') && !$.support.style) {  //  ie6 兼容
								
									o.$popObj.css('top',$win.scrollTop() + $win.height()*0.1);	

									if(o.$popObj.css('top')>$win.height()){
										o.$popObj.hide();
									}
									
									if(o.$popObj.height() < 780){   //限定ie6 下最大高度
									
										o.$popObj.height($win.height()*0.8); 
										
									}else{
									
										o.$popObj.height(780);
										
									}
									
									$('#popContent').height($win.height()*0.8 - 120); // 弹出框内容高度
									$win.resize(function(){
										o.$popObj.height($win.height()*0.8);
									});

									$win.scroll(function(){
										o.$popObj.css('top',$win.scrollTop() + $win.height()*0.1);	
									});	

									meanwhile();
	
								}
								
								meanwhile();
								
								$win.resize(function(){	

									meanwhile();
								
								});
								
								var popClose = function(){
								
									//o.$popObj.stop().animate({top:'100%'},300);
									
									if($.browser.msie && ($.browser.version == '6.0') && !$.support.style){
										
										o.$popObj.stop().animate({top:$win.scrollTop() + $win.height()},300).show();
										
									}else{
										o.$popObj.stop().animate({top:'100%'},300);
									}
									
									
									$body.css('overflow','');
									$('html').css('overflow','auto');
									setTimeout(function(){o.$popObj.hide()},301);  // 兼容ie6
									
									$('#maskObj').hide();
									
									
									$('#loadPopInfo').hide();
								
								}
				
									$body.css('overflow','hidden');
									
									$('html').css('overflow','hidden');
									
									
									$('#maskObj').height(maxHeight).show();
									
									//o.$maskObj.height(maxHeight).show(); // 遮罩层显示 
									
									if($.browser.msie && ($.browser.version == '6.0') && !$.support.style){
										
										o.$popObj.stop().animate({top:$win.scrollTop() + $win.height()*0.1},300).show();
										
									}else{
										o.$popObj.stop().animate({top:'10%'},300).show();
									}
									
									
								$('#maskObj').unbind().click(function(){	
									popClose();
								});
								o.$popObj.find('.close').unbind().click(function(){ 								
									popClose();
								
								});
								
								this.popScroll();
								
							},
							
							/****
								
								弹出框模拟滚动条
							
							*****/
							
							
							popScroll: function(){
							
								var oDiv=$('#div1');
								var oDiv2=$('#div2');
								var oDiv3=$('#div3');
								var oParent=$('#parent');
								oParent.bind('mousewheel',function(){onMouseWheel();});  // ie & chrome
								oParent.bind('DOMMouseScroll',function(){onMouseWheel();});
								oDiv3.bind('mousewheel',function(){onMouseWheel();});
								oDiv3.bind('DOMMouseScroll',function(){onMouseWheel();});

								function onMouseWheel(ev)
								{
									ev=ev||window.event;
									var bDown=true;
									if(ev.wheelDelta){
										bDown=ev.wheelDelta<0;
									}
									else{
										bDown=ev.detail>0;
									}
									var l=0;
									if(bDown){
										if(oDiv3.height()>oDiv2.height()){
											l=oDiv3.position().top-20;
										}else{return;
										}
									}
									else{
										if(oDiv3.height()>oDiv2.height()){
											l=oDiv3.position().top+20;
										}else{return;	
										}
									}
									moveSlide(l);
									if(ev.preventDefault)
									{
										ev.preventDefault();
									}
								}
								function moveSlide(l)  // 滚动
								{
									if( -l < 0 ){
										l = 0;
									}
									else if( -l > oDiv3.height()- oDiv2.height())
									{
										l = -(oDiv3.height()- oDiv2.height());
									}
									
									oDiv3.css('top',l);
									
									var scale= -(l)/(oDiv3.height()- oDiv2.height());
									oDiv.css('top',(oParent.height() - oDiv.height())*scale);
								}
								
								 function moveDownSlide(l) // 拖动
									{
										if(l<0)
										{
											l=0;
										}
										else if(l > oParent.height()-oDiv.height())
										{
											l=oParent.height()-oDiv.height();
										}
										oDiv.css('top',l);
										var scale=l/(oParent.height()-oDiv.height());
										oDiv3.css('top',-(oDiv3.height()-oDiv2.height())*scale);
									}
								
								//原来的滚动条
								
								
								oDiv.bind('mousedown',function(ev){
								
									ev=ev||window.event;
									var disY=ev.clientY-oDiv.position().top;
									$doc.bind('mousemove',function(ev){
									
										ev=ev||window.event;
										
										var l=ev.clientY-disY;
										
										moveDownSlide(l);  // 调用拖动
									
									});
									
									$doc.bind('mouseup',function(ev){
										$doc.unbind('mousemove');
										$doc.unbind('mouseup');
									});
									$doc.bind('selectstart',function(ev){  // 防止页面内容被选中 IE 
										return false;
									});
									
								});
								
								$doc.bind('mouseup',function(ev){
								
									$doc.unbind('selectstart');
								
								});
							},

							
							/**
							
								同步用户状态
							
							***/
							
							onScriptLoad: function(){
							
								var _this = this;

								if(top.loginAll && typeof top.loginAll == 'function'){
									var oldCallback = top.loginAll;	
									
								}
								
								top.loginAll = function(retData){
								
									if(oldCallback && typeof oldCallback == 'function'){
									
											oldCallback(retData);

										if(retData.result == 0){
											var faceImg = retData.Face;
											var qqName = retData.nick;
											var uin = uin || getUin();
											var skey = getKey();
											if(uin && skey){
											
													 _this.onLogined(uin,qqName,faceImg);
													 
											}
										};	

									}					
								}
								
								//覆盖退出登录的全局回调函数
								
								
								if($(top.document).find('#loginOut').length){
									
									$(top.document).find('#loginOut').click(function(){
									
										jQuery(document).comment('loginOut',1);
								   
									});
								
								}
								
								
							},
							
							
							
							/*  iframe方式 */
							
							/*********
							
							onScriptLoad: function(){
							
								var _this = this;
								
								
								//var loginCallback = window.loginAll || parent.window.loginAll;  // 登陆回调 兼容Iframe
								
								//console.log(loginCallback);
								

								if(parent.window.loginAll && typeof parent.window.loginAll == 'function'){
								
									 var oldCallback = parent.window.loginAll;	
									
								}

								parent.window.loginAll = function(retData){
								
									if(oldCallback && typeof oldCallback == 'function'){
									
											oldCallback(retData);
									
										if(retData.result == 0){
											var faceImg = retData.Face;
											var qqName = retData.nick;
											var uin = uin || getUin();
											var skey = getKey();
											if(uin && skey){
											
											
													  console.log(uin);
												
													 _this.options.$loginFlag.data('userPic',faceImg);
													 _this.options.$loginFlag.data('nick',qqName);
													 
													 _this.onLogined(uin,qqName,faceImg);
													 
													 $('#top_post_btn').show();
													 $('#top_post_btn_login').hide();
													

											}
										};	

									}					
								}
								
								//覆盖退出登录的全局回调函数
							
								 $('#loginOut').click(function(){
									jQuery(document).comment('loginOut',1);
								   
								 });
							},
							
							**********/

							
							 /**
							 * 其他UI事件的绑定
							 */
							bindOtherEvents: function() {
									
									var _this = this;
									var o = this.options;
									
									o.$topContent.val(o.topContentTips);
									
								    o.$topContent.focus(function() {
									
										 var H = $(top.document).find('#commentIframe').height();
										 
										 if(!$('#commentArea').hasClass('on')){

										   $(top.document).find('#commentIframe').css('height',H + 60 + 'px')
										 
										 }
									
										$('#commentArea').removeClass().addClass('on');
										clearTimeout(o.blurTimer);
										if (o.$topContent.val() == o.topContentTips) {
											o.$topContent.val('');
										}
										
										 if($('.children div.pop_reply:visible').length){
										 
											$('.pop_reply').slideUp('10',function(){_this.iframeHeight()})

										 }			
									});
									
									o.$topContent.blur(function() {
										 
										//发表评论框失去焦点事件
									});
									
									$('#commentArea').unbind().bind('click',function(event){
										 event.stopPropagation();  // 阻止冒泡
									});
									
									
									function docEvent(){
									
									   if($('#commentArea').hasClass('on') && o.$topContent.val().length <= 0){
											 $('#commentArea').removeClass('on');
											 if(o.$topContent.val().length <= 0){
													o.$topContent.val(o.topContentTips);
											 }
											 setTimeout(function(){_this.iframeHeight()},600); // 同步iframe高度
										}

										    //$('#content').find('.pop_reply').slideUp('10');									

									}
									
																	
									$doc.click(function(){
	
										docEvent();

									});
									
									// iframe 嵌套
									
									
									if($parent){
										
										$parent.click(function(){
										
											docEvent();
											
										});
									
									}
									
									o.$content.delegate('#myCowComment','click',function(){
										_this.conHeight(2);
									});
									//o.$content.delegate('#mytips','click',function(){
//										_this.conHeight(2);
//									});
									o.$content.delegate('#mycon','click',function(){
										_this.conHeight(3);
									});
									
									
									
									$('#commentArea').delegate('span.change','click',function(){   // 切换账号
									
										_this.showLoginLayer();
									
									}); 
									
									$('#top_post_btn_login').unbind().bind('click',function(){  // 评论框登陆按钮事件
									
										_this.showLoginLayer();
																			
									});

									/** 我的牛评登陆验证 **/
									
									o.$myCowComment.unbind().bind('click',function(){
											var _status = _this.getLoginStatus();  //先获取用户状态
											
											if(_status != 0){      // 如果用户存在
													if($('#popMsg').css('display') != 'none'){
													
														o.$urlapi.pageflag=2;				
														$('#my-message .tipInfo').hide();
														_this.loadMyMessage();
														$('#popMsg').html('').hide();
														$('#mytips').trigger('click'); // 
														return;
													}

													if($(this).hasClass('on')){	
													
														if($('#popMsg').html() == ''){
															if($('#my-message-list li').length >= 0){
																return
															}
															$('#my-message-list').html('');	
															_this.loadMyMessage();//个人中心的提醒
															
															$('#popMsg').html('').hide();
														}else{
															
															$('#my-message-list').html('');	
															_this.loadMyMessage();
															
															$('#popMsg').html('').hide();
														
														}
														return;	
													}
													
													if(!$(this).hasClass('on')){   // 如果没有 .on 排除点击二次
															
															if($('#my-message-list li').length){
																	
																if($('#popMsg').css('display') != 'none'){
																
																	$('#my-message-list').html('');
																	_this.loadMyMessage();
																	$('#popMsg').html('').hide();
																}
															}else{
																
																_this.loadMyMessage();
															}
													}else if($('#popMsg').css('display') != 'none'){
													
															$('#my-message-list').html('');
															
															_this.loadMyMessage();
															
															$('#popMsg').html('').hide();
														
													}
													if($('#my-notification-list li').length ==0){
													
															_this.loadMyComment();//个人中心的我的评论
													}
													
													_this.checkAndPublish(this.id);
													
													sendClientStat(curSite,1,cmt_id,'clk_myniuping');
												
											}else {   //未登陆

												$('#my-message .tipInfo').hide();
												$('#my-notification .tipInfo').hide();
												_this.showLoginLayer();
											}
											
									
									});
									
							},
							
							/**
								将服务器时间戳 转换方法
							**/
							
							formatTime : function($time){
											
											var $nowdate= this.options.$nowDate;
										
											var $Num=$nowdate/1000-$time;
											if($Num <1){				return  "刚刚";}
											if($Num < 60){				return  Math.floor($Num) 			+ "秒钟前"	}
											if($Num < 3600){			return  Math.floor($Num/(60)) 		+ "分钟前"	}
											if($Num < 24*3600){		    return  Math.floor($Num/(3600)) 	+ "小时前"	}
											if($Num < 24*3600*7){		return  Math.floor($Num/(24*3600)) 	+ "天前"	}
											var d = new Date($time*1000),
											   s = d.getFullYear() + "-"; 
											   s += (d.getMonth() + 1) + "-";
											   s += d.getDate();
											return s;
							},
							
							
							/**
								评论内容超过120px = 行高数*5（五行）隐藏方法
							**/
							conHeight:function(a){
							
								var _this = this;
								
								var $conClass = $('#allComments .post .post-message-container');

								var lineH = 24;
								
								if($conClass.length){
																
									lineH = $conClass.css('line-height').split('px')[0];
									
									if(a == 2){
									$conClass=$('#my-message-list .post .message-content');
									}
									if(a == 3){
										$conClass=$('#my-notification-list .post .message-content');
									}
									if(a == 4){

										var popInfo = $(top.document.getElementById('popUpmask').contentWindow.document.getElementById('popInfo'));	
										$conClass= popInfo.find('.post .message-content');
										
									}
									
									if(a == 5){
										$conClass= $('#allComments .topIco .post-message-container');
									}
									
									$conClass.each(function(index, element) {
										if($(this).height() > lineH*6 && !$(this).next('.spreadMoreBtn').length ){
											$(this).css({height:lineH*5,'overflow':'hidden'});
											$(this).after('<div class=\"spreadMoreBtn\"><span>展开</span></div>');
										}
									});
								
								}
								
								_this.iframeHeight();
								
							},
							
							

							/**
							
							   更新时间状态
							
							**/
							
							updateTime : function(){
							
								var o = this.options;
								var _this = this;
							
								o.$content.find('.uptime').each(function(){
									$(this).html(_this.formatTime($(this).attr('date')));
								})
								$('#my-message').find('.time').each(function(){
									$(this).html(_this.formatTime($(this).attr('date')));
								})
								$('#my-notification').find('.post-time span').each(function(){
									$(this).html(_this.formatTime($(this).attr('date')));
								})
								$('#hiddenCon').find('.uptime').each(function(){
									$(this).html(_this.formatTime($(this).attr('date')));
								})
							},
							
							/**
							
								截取字符串
							**/

							subString:function(str,n){
								var r=/[^\x00-\xff]/g;
								if(str.replace(r,"mm").length<=n){return str;}
								var m=Math.floor(n/2);
								for(var i=m;i<str.length;i++){
									if(str.substr(0,i).replace(r,"mm").length>=n){
										return str.substr(0,i)+"...";
									}
								}
								return str;
							},

							
							/************************* link 个人中心数据渲染***************************************/
					
								
							myCreateHmtl: function(info,type,blueflag){    // 创建 dom
											var o = this.options;
											var _this = this;
											var newstrHTML = "";
											var picUrl='' , HUIFU=false , DING=false , Userlist="" , leftGrid='' , article='';
											var replyString = ""
											var listId = 'msg_';
											var titleHtml='';
											titleHtml="<div class=\'article-title\'> <a target=\'_blank\' href=\'"+ (info.targetinfo?info.targetinfo.url:'') +"\'>"
											+ info.targetinfo.title +"</a> </div>"
											if(type == 'message'){//提醒判断
											
												var headP = info.userinfo.head.replace(/140/,"40");
												HUIFU=(info.tipstype == '3');//提醒4顶  3回复
												DING=(info.tipstype == '4');
												if(HUIFU){ picUrl = headP||'http://t0.qlogo.cn/mbloghead/01676c4b10bbdb6f2618/50' }//	我的头像
												
												if(DING){
													
													picUrl='http://mat1.gtimg.com/www/niuping2013/upico.jpg';
													
													if(info.userlist.length >0 ){
														$.each(info.userlist,function(i,uInfo){
															if(i>0){Userlist +="、"}
															Userlist +="<span post_uid="+ uInfo.userid+" class='popClick'><strong>"+uInfo.nick+"</strong></span>"
														});
														if(info.userlist.length < info.up){ Userlist +="等"}
													}
													
													leftGrid = "<div class=\'avatar "+(DING?'upstyle':'popClick')+"\' post_uid='"+info.userinfo.userid +"'></div>";
													
												}else{
												
													leftGrid = "<div class=\'avatar "+(DING?'upstyle':'popClick')+"\' post_uid='"+info.userinfo.userid +"'><img src=\'"+ picUrl +"\'></div>";
												}
												
												
												article = (HUIFU?"<strong post_uid='"+info.userinfo.userid +"' class=\'publisher popClick\'>"+ info.userinfo.nick +"</strong> 回复了你的评论：<em class=\'title\'>"+ _this.subString(info.parentinfo.content,46) +"</em>":(DING?(Userlist+info.up +"人  顶了你的评论：<em class=\'title\'>"+ _this.subString(info.content,46) +"</em> <span date='"+ info.time +"' class=\'time\'>"+ _this.formatTime(info.time) +"</span>"):''));
											  }	

											if(type == 'myComment'){
											
												listId = 'post_';
												replyString = "(<em>"+ info.repnum +"</em>)"
												leftGrid = "<div class=\"post-time\" ><span date='"+ info.time +"'>"+(info.time? _this.formatTime(info.time):"刚刚") +"</span></div>";
												nick="<strong class=\"rename\">"+ info.userinfo.nick +"</strong>"
												
												if($.cookie('uid')==info.userinfo.userid){ nick="我" }
												if(info.parentinfo){
													if(info.parentinfo.userinfo){
														nick2="<strong post_uid='"+info.parentinfo.userinfo.userid +"' class=\"rename popClick\">"+ info.parentinfo.userinfo.nick +"</strong>"
														if(info.userinfo.userid==info.parentinfo.userinfo.userid){ nick2="<strong>Ta</strong>" }
														if($.cookie('uid')==info.parentinfo.userinfo.userid){ nick2="我" }
													}
												}	
												article = (info.parentinfo)?( nick + "回复了 "+ nick2 +" 的评论：<em class=\'title\'>"+ _this.subString(info.parentinfo.content,46) +"</em>"):(nick + "评论了<a target=\'_blank\' href=\""+ (info.targetinfo?info.targetinfo.url:'') +"\">"+ _this.subString(info.targetinfo.title,46) +"<\/a>");
												if(!info.parentinfo){
													titleHtml=''
												}
												
												
											}
											newstrHTML +="<li class=\'post "+ blueflag +"\' id=\'"+listId+""+ info.id +"\' tid='"+ info.targetinfo.targetid +"'>"
											+"<div class=\'post-content\'><div class='indicator'></div>"+leftGrid+"<div class=\'post-body\'>"
											+"<div class=\'message-article\'>"+article+"</div>"
											+(!DING?"<div class=\'message-content\'>"+"<div>"+ info.content.replace(/\n/g,'<br />') +"<span date='"+ info.time +"' class=\'time\'>"
											
											+(HUIFU? _this.formatTime(info.time):'') +"</span></div>"+"</div>":'')

											+titleHtml
											
											+ (!DING?"<div class=\'post-footer\'><em class='newcoment' id='am_"+ info.id +"'></em><span class=\'upvote\'><span><i>顶</i>(<em>"+ info.up 
											+"</em>)</span></span><span class=\'reply\'><span>回复"+replyString+"</span></span></div>":'')+"</div>"+"</div>"+"<ul class=\'children\'>"+"</ul>"
											+"</li>";

											
											return newstrHTML
										},
					
		
		
							loadMyMessage: function(){   // 个人中心提醒 列表拉取
														
								var _this = this;
								var o = this.options;
								var oMyMsg=o.$urlapi;
								var strHTML = "";
								var pageNum = o.centerPageSize;
								var flagfirst = 1;
								if(o.$urlapi.pageflag == 1){
									pageNum = 20;
									flagfirst = 2;
								}
								
								

											$.ajax({
												url: (o.fetchUrl + 'user/'+o.$urlapi.userId+"/msg?msgid="+o.$urlapi.msgid+"&pageflag="+o.$urlapi.pageflag+"&reqnum="+pageNum),
												dataType: 'jsonp',
												//error: emptyListOrForbiddenL,
												beforeSend: function() {
												
													_this._tips0 = new Date().getTime();//Qoss时间戳
												
												},
												success:function(data){   //从服务器得到数据，显示数据并继续查询 
												
													var _tips1 = new Date().getTime();//Qoss时间戳

													if(data.errCode == 8){   // 如果登陆态失效
													
														o.$loginTrigger.click();	
														return;
													}
													
													
													if(data.errCode == 0){ 

														if(oMyMsg.pageflag==0){
														
															//$('#loadMsgMore').hide();
															oMyMsg.msgid = oMyMsg.first = data.data.first;
															oMyMsg.last = data.data.last;
															
															$('#my-message-list').html('');
															
															if(data.data.retnum<=10){
																
																$('#loadMsgMore').hide();
															
															}
															
															if(data.data.retnum == 0){
															
																$('#my-message').children('.tipInfo').removeClass('waitting').html('暂无提醒').show();
																
																$('#loadMsgMore').hide();
																return;
															
															}

														}
														if(oMyMsg.pageflag==1){
															oMyMsg.msgid =oMyMsg.last = data.data.last;															 
														}
														
														var blueflag="";
														
														if(oMyMsg.pageflag==2){
															oMyMsg.msgid = oMyMsg.first = data.data.first;
															var blueflag="blueflag";
														}

														var trueList = data.data.message;
														
														$.each(trueList,function(index,info){
																strHTML += _this.myCreateHmtl(info,"message",blueflag);	
																	
														});
														
														
														if(o.$urlapi.pageflag==1){
														
															$("#my-message-list").append(strHTML);//_this.iframeHeight();
														
														}else{
															
															$("#my-message-list").prepend(strHTML);//_this.iframeHeight();
														
															$("#my-message-list .blueflag").each(function(index, element) {/*20130710 by link*/
																
																	_this.blueLine("#" + $(this).attr('id'));
																});
														}
														
														if(flagfirst == 2){
															_this.conHeight(2);//20130805 提醒 by link
														}
														
														
														_this.iframeHeight();
														
														
														if( data.data.retnum < pageNum || data.data.total<= pageNum){
														
															$('#loadMsgMore>span').hide();
															$('#loadMsgMore>em').css('display','block').html('没有更多了');
															
														}else{
														
															$('#loadMsgMore').show();
															$('#loadMsgMore>em').hide();
															$('#loadMsgMore>span').css('display','block');
														}
														
														$('#my-message').children('.tipInfo').hide();
														_this.iframeHeight();
															
													} else if(data.errCode == 0 && data.data.retnum == 0){
													
														if($('#my-message-list li').length == 0){
															$('#my-message').children('.tipInfo').removeClass('waitting').html('暂无提醒').show();	
														}else{
															$('#my-message').children('.tipInfo').hide();
														}
														
													}else{
														$('#my-message').children('.tipInfo').removeClass('waitting').html('暂无提醒').show();	
														$('#loadMsgMore').hide();
													}													
												
													 Qoss('wdtx', _this._tips0, {1:(_this._tips0+1),2:_tips1,3: _tips1}, 100);
												}         
											
											});
			
							
							  
							
							},
							
							loadMyComment: function(){  // 个人中心 我的评论列表拉取
							
								
							
								var _this = this;
								var o = this.options;
								var oMyCmt=o.$urlapi_mycomment;
								var pageNum = o.centerPageSize;
								var flagfist = 1;
								if(o.$urlapi_mycomment.pageflag == 1){
									pageNum = 20;
									flagfist = 2;
								}
								
											$.ajax({
												url: o.fetchUrl + 'user/'+o.$urlapi_mycomment.userId+"/comment?lastid="+o.$urlapi_mycomment.msgid+"&pageflag="+o.$urlapi_mycomment.pageflag+"&reqnum="+ pageNum,
												dataType: 'jsonp',
												beforeSend: function() {
												
													_this._myCom0 = new Date().getTime();//Qoss时间戳
												
												},
												success:function(data){   //从服务器得到数据，显示数据并继续查询 
																									
												
													var strHTML='';
	
													if(data.errCode == 0){ 
													
														var _myCom1 = new Date().getTime();//Qoss时间戳
									
														if(o.$urlapi_mycomment.pageflag==0){
														
															o.$urlapi_mycomment.msgid = o.$urlapi_mycomment.first = data.data.first;
															
															o.$urlapi_mycomment.last = data.data.last;
															
																$('#my-notification-list').html('');
																
																if(data.data.retnum<=10){
																	
																	$('#loadCmtMore').hide();
																
																}
																
																if(data.data.retnum == 0){
															
																	$('#my-notification').children('.tipInfo').removeClass('waitting').html('暂无评论').show();
																	
																	$('#loadCmtMore').hide();
																	
																	
																	
																	_this.iframeHeight();
																return;
															
															}
														
														}
														
														if(o.$urlapi_mycomment.pageflag==1){
															o.$urlapi_mycomment.msgid =o.$urlapi_mycomment.last = data.data.last; 
														}
														if(o.$urlapi_mycomment.pageflag==2){
															o.$urlapi_mycomment.msgid =o.$urlapi_mycomment.first = data.data.first;
														}
														$.each(data.data.comments,function(index,info){
																strHTML += _this.myCreateHmtl(info,"myComment");	
														});

														$("#my-notification-list").append(strHTML);
														
														if(flagfist == 2){
															
															_this.conHeight(3);//20130805 大于5行隐藏 by link
														}
														
														_this.iframeHeight();

														if(data.data.retnum < pageNum){
														
															$('#loadCmtMore>em').html('没有更多了');
															$('#loadCmtMore>span').hide();
														
														}else{
															
															$('#loadCmtMore').show();
															$('#loadCmtMore>span').css('display','block');
															$('#loadCmtMore>em').hide();
														
														}
														
														$('#my-notification').children('.tipInfo').hide();
														
														
													}else{
													
														$('#my-notification').children('.tipInfo').removeClass('waitting').html('暂无评论').show();
														
														$('#loadCmtMore').hide();
														
														if($('#my-notification-list li').length ==0){
															$('#my-notification').children('.tipInfo').show();
															
														}
														_this.iframeHeight();
	
													}													
													Qoss('wdpl', _this._myCom0, {1:(_this._myCom0+1),2:_myCom1,3: _myCom1}, 100);	
													
												 //未从服务器得到数据，继续查询      
													//if(data.errCode == 1){  
														// 返回数据为空 容错
													//} 
												}          
											
											});
							},
							
							loadUserComment: function(uid,flag){   // 个人中心 我的评论列表拉取
							
								var _this = this;
								var o = this.options;
								
								var oMyCmt=o.$urlapi_userComment;
								
								flag = flag || 0;

								if(uid){
								
									oMyCmt.userId = uid;
								
								}
								var pageNum = o.centerPageSize;

								if(flag == 0){
									
									oMyCmt.msgid = '';
								
								}else{
									pageNum = 20;
								}
								
								if($("#popInfo li").length == 0){
									
									$('#my-notice').children('.tipInfo').removeClass('waitting').addClass('waitting').html('').show(); //初始化弹出层状态
								
								}
								
								
											$.ajax({
												url: o.fetchUrl + 'user/'+oMyCmt.userId+"/comment?lastid="+oMyCmt.msgid+"&pageflag="+oMyCmt.pageflag+"&reqnum="+ pageNum,//o.allNew + o.$showNum.data('maxID'),
												dataType: 'jsonp',
												
												success:function(data){   //从服务器得到数据，显示数据并继续查询  
												
			
													function gettrueId(id){
													
														return $(top.document.getElementById('popUpmask').contentWindow.document.getElementById(id));
													
													}
													
											
													var strHTML='';
													
													if(data.errCode == 0 && flag == 0){
													
														var usermeta = data.data.usermeta;
														var bigPic = usermeta.head.replace(/40/,"100");
														var area = usermeta.region.replace(/:/g,' ');
														
														
														// iframe 更新方式
														
														var $popObj = gettrueId('popObj');
														
														
														$popObj.children('.head').find('img').attr('src',bigPic);
														$popObj.children('.head').find('.upvote i').html(usermeta.upnum);
														$popObj.children('.head').find('.num i').html(usermeta.commentnum);
														$popObj.children('.head').find('.upandnum strong').html(usermeta.nick);
														$popObj.children('.head').find('.area').html($.trim(area)!=''?area:'腾讯网友');
														
													}

													
													if(data.errCode == 0){ 
													
													
														var $popInfo = gettrueId('popInfo');
														var $mynotice = gettrueId('my-notice');
														var $loadPopInfo = gettrueId('loadPopInfo');
													

														if(data.data.comments.length == 0 && $popInfo.children('li').length == 0){
														
															$mynotice.children('.tipInfo').removeClass('waitting').html('暂无评论').show();
															
														}else{
															
															$mynotice.children('.tipInfo').hide();
														}
														
														
														
													    if(oMyCmt.pageflag==0 && data.data.first){
															oMyCmt.msgid = oMyCmt.first = data.data.first;
															oMyCmt.last = data.data.last;
															
														}
														if(oMyCmt.pageflag==1 && data.data.last){
															oMyCmt.msgid =oMyCmt.last = data.data.last;
															 
														}
														if(oMyCmt.pageflag==2 && data.data.first){
															oMyCmt.msgid =oMyCmt.first = data.data.first;
														}
											
														$.each(data.data.comments,function(index,info){
															if((info.content!="" && info.checkstatus==1)||(info.checktype==1 && info.checkstatus==0)){
																strHTML += _this.myCreateHmtl(info,"myComment");	
															}

														});


														if(oMyCmt.pageflag==1){$popInfo.append(strHTML);}
														
														else{
															
															$popInfo[0].innerHTML = strHTML; 
															
															//document.getElementById('popInfo').innerHTML = strHTML;// 方法没问题 报错
															
														}
														
														//alert(44444);
														
														_this.conHeight(4);														
	
														if($popInfo.children('li').length == 0){        // 内容为空提示信息

															$mynotice.children('.tipInfo').removeClass('waitting').html('暂无评论').show();		

														}	

															
														if( data.data.retnum < o.centerPageSize || data.data.total<=10){	
															
															$loadPopInfo.children('span').hide();
															
															$loadPopInfo.children('em').css('display','block').html('没有更多了');
															
															//$('#loadPopInfo>em').css('display','block').html('没有更多了');
															
														}else{
															$loadPopInfo.show();
															$loadPopInfo.children('em').hide();
															$loadPopInfo.children('span').css('display','block');
														}
															
														// 计算滚动条高度及位置
														

														var $div3 = gettrueId('div3');
														var $div2 = gettrueId('div2');
														var $div1 = gettrueId('div1');	
														var $parent = gettrueId('parent');	

														if($div3.height()< $div2.height())
														{

															$parent.hide();
														}
														else
														{
															
															$div1.css('height',$parent.height()*$div2.height()/$div3.height());
															
															$parent.show();
															
															
														}
																			
													}      
												 //未从服务器得到数据，继续查询      
													//if(data.errCode == 1){  
														// 返回数据为空 容错
													//} 
												}          
											
											});
							},
							
							
							clickLoadMore:function(){           // 个人中心 loadMore 按钮
								var _this = this;
								var o = this.options;

								$('#loadMsgMore>span').click(function(){    // 拉取更多提醒
								
									$('#loadMsgMore>span').hide();
									$('#loadMsgMore>em').css('display','block').html('加载中...');
									
									o.$urlapi.pageflag = 1;//翻页标志 0:第一页 	1: 下一页	             2:上一页
									o.$urlapi.msgid = o.$urlapi.last;//更新最后列表标记
									_this.loadMyMessage();
									
									sendClientStat(curSite,1,cmt_id,'clk_notice_more'); //拉取提醒更多

								});
								
								/*
								
								$('#loadPopInfo>span').click(function(){     // 更多个人评论 弹出框
								
									$('#loadPopInfo>span').hide();
									$('#loadPopInfo>em').css('display','block').html('加载中...');
									

									o.$urlapi_userComment.pageflag = 1;//翻页标志 0:第一页 	1: 下一页	             2:上一页
									o.$urlapi_userComment.msgid = o.$urlapi_userComment.last;//更新最后列表标记
									_this.loadUserComment();
									
									//sendClientStat(curSite,1,cmt_id 'clk_notice_more'); //拉取提醒更多 弹出框
									

								});
								*/
								
								$('#loadCmtMore>span').click(function(){
								
								
									$('#loadCmtMore>span').hide();
									$('#loadCmtMore>em').css('display','block').html('加载中...');
								
									o.$urlapi_mycomment.pageflag = 1;//翻页标志 0:第一页 	1: 下一页             2:上一页
									
									o.$urlapi_mycomment.msgid = o.$urlapi_mycomment.last;//更新最后列表标记
									
									_this.loadMyComment();
									
									sendClientStat(curSite,1,cmt_id,'clk_mycomment_more'); //
								});
							},

						
							isVisible:function(){  
								if("webkitHidden" in document) return !document.webkitHidden;  
								if("mozHidden" in document) return !document.mozHidden;  
								if("hidden" in document) return !document.hidden;    
								//worse case, just return true  
								return true;  
							}  	
						
						
						});
						
						$doc.comment(); //初始化插件
							
						 //PGV上报

						//PgvCount(curSite + '.coral.qq.com');
						//PgvCount('coral.qq.com');	

					})(jQuery);
				

		 })
		 
		 
		 
		 
		 
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

	//console.log(data);

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



/****

	iframe 用------------------登陆成功回调 uin/ qq号 nici/名字 headUrl/头像地址

****/




function publicLoginEvent(){  // 登陆事件

	
	if(parent.registerCoralEvent && parent.registerCoralEvent.loginEvent){
	
		parent.registerCoralEvent.loginEvent();
	}else{
	    
		jQuery(parent.document.getElementById('onekey')).click();
	
	}
	
	

}

function  publicLogined(uin, nick, headUrl){   // 20130716 登陆成功回调

    if(uin){
		jQuery(document).comment('onLogined', uin, nick, headUrl);
	}
	
}



function publicLogout(){                  // 20130716 退出回调 

	jQuery(document).comment('loginOut');

}

// iframe弹出框数据拉取

function popupContent(uin){

	//alert(3333);

	jQuery(document).comment('loadUserComment',uin);
}

function clickLoadMroe(uin,flag){

    jQuery(document).comment('popUploadMore',uin,flag);

}






/**
 * Qos测速函数。
 * @param _name: 测试接口名，最终组合为 tcomment + _name
 * @param _baseTimestamp: 基准时间戳
 * @param _timestamps: 各参数时间戳对象，e.g. {1: newDate().getTime(), 2: 1350881412511}，1 和 2为Qos接口查询参数名
 */
function Qoss(_name, _baseTimestamp, _timestamps, _randomRange) {


    //随机采样
    if(_randomRange) {
        var _lucky = parseInt(Math.random() * _randomRange);
        if (_lucky) {
            return;
        }
    }
    for(var _idx in _timestamps) {
        _timestamps[_idx] -= _baseTimestamp;
    }
	

	
    jQuery('<img src="http://qos.report.qq.com/collect?type=1&name=coral_qq_com_' + _name + '&' + jQuery.param(_timestamps) + '">')
        .error(function(){jQuery(this).remove();})
        .load(function(){jQuery(this).remove();})
        .appendTo('body');
		
		
}
 
 
 
/**
 * PGV 统计函数
 * @param _domain: 统计域，默认为 location.host
 * @param _path: 要统计的URL, 可以为空。 e.g. "/foo/bar.html"

function PgvCount(_domain, _path) {
    pvDoc = document;
    pvLoc = location;
    pvRepeatCount = 1;
    pvCurDomain = _domain || location.host;
    if(_path) {
        pvCurUrl = _path;
    }
    if(typeof pgvMain == 'function') {
        pgvMain();
    } else {
        jQuery.getScript('http://pingjs.qq.com/ping.js', function() {
            typeof pgvMain == 'function' && PgvCount(_domain, _path);
        });
    }
} 
  */
 
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

 
 
 
 
 
 
 
 
 
