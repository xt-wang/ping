//coral comment api interface
//base on jquery

cmt_id = 1003448978;

function get_page_url() {
  var url = location.href;
  var i = url.indexOf('#');
  if (i == -1) {
    return url;
  } else {
    return url.substr(0, i);
  }
}

function get_page_title() {
  return document.title;
}
var iframe_src = 'index.php?mod=output&code=url_iframe' +
  '&target_id=datacore_div&id=1' +
  '&hash=60d91c2d98e6dc552d256d825b216295' +
  '&per_page_num=20' +
  '&content_default=' + encodeURIComponent('') +
  '&url=' + encodeURIComponent(get_page_url()) +
  '&title=' + encodeURIComponent(get_page_title());

function cmtbox() {
  /* 
   <div id="top_reply">
    <div id="globalNav" class="globalNav">
      <div class="commentTotleNum"> <a href="http://coral.qq.com/1003448978" target="_blank"><strong id="commentTotleNum"><span>130</span>条评论</strong></a> </div>
      <h1>网友评论</h1>
      <div id="loginBtn" style="display:none"></div>
    </div>
    <div id="commentArea" class="">
      <div class="blueLight">
        <div class="textarea">
          <textarea tabindex="1" autocomplete="off" name="content" accesskey="u" id="top_content">文明上网，理性发言</textarea>
        </div>
        <div class="commtSub" id="p_login_btn"> <!-- 用户登录模块 -->
          <div class="loginFlag" id="loginFlag" style="display: none;"> </div>
          <span class="tips"></span>
          <div class="submitBtn"> <a href="javascript:void(0)" class="submit" id="top_post_btn_login">登录</a> <a href="javascript:void(0)" class="submit" id="top_post_btn" style="display: none;">发表评论</a> <a href="javascript:void(0)" class="submitOn" id="top_post_btn_load" style="display:none"></a> </div>
        </div>
      </div>
    </div>
  </div>'
  */
}

/*

<div id ="mainBody" style='padding-bottom:0px'>
<!----评论框---->  
<div id ="top_reply">
<div id="globalNav" class="globalNav"> 
<div class="commentTotleNum" >
<a href='' target='_blank'><strong id="commentTotleNum"></strong></a>
</div>
<h1>网友评论</h1>
<div id='loginBtn' style='display:none'></div>
</div>
<div id="commentArea" class='out'>
<div class="blueLight">
<div class="textarea">
<textarea tabindex="1" autocomplete="off" name="content" accesskey="u" id="top_content">文明上网，理性发言</textarea>   
</div>        
<div class="commtSub" id="p_login_btn">  <!-- 用户登录模块 -->
<div class ="loginFlag" id="loginFlag">    
</div>
<span class="tips"></span>
<div class = 'submitBtn'>
<a href="javascript:void(0)" class="submit" id="top_post_btn_login">登录</a>
<a href="javascript:void(0)" class="submit" id="top_post_btn" style='display:none'>发表评论</a>
<a href="javascript:void(0)" class="submitOn" id="top_post_btn_load" style='display:none'></a>
</div>
</div>
</div>              

</div>
</div>
<!----评论显示列表---->   
<div id="content">
<!----实时显示----> 
<div class ="main_titleTab">
<h2>
<span class='tab1 on' id="myAllComment"><a href="javascript:void(0)">全部评论</a></span>
<span class='tab2' id ="myCowComment"><a href="javascript:void(0)">我的牛评<em class="popNum" id="popMsg"></em></a></span>
</h2>   

</div>  
<div id="tab1_allComments" class="dis">  <!--页卡一 全部评论-->

<!--推荐评论-->
<div id='Recommend'>
</div>
<div id ="showNum" class="showNum">
<span></span>
</div>
<div id='allComments'>
<div class="tipInfo waitting">
</div>
</div>     <!-- 全部评论 -->
<div id="loadMore" class="loadMore">
<span class="loadfonts">加载更多</span><em style="display:none; background:#ccc;"></em>
</div>
<!--------更新数据数据源后的渲染 应该和 上面全部评论一致--------->
<div id ='newComments'>
</div>
</div>
<div id = "tab2_myComments" class="undis my-comments">  <!--页卡二 我的牛评-->
<div class="chid_titleTab">
<h2>
<span class='tab1 on' id='mytips'><a href="javascript:void(0)">提醒</a></span>
<span class='tab2' id = 'mycon'><a href="javascript:void(0)">我的评论</a></span>
</h2>
</div>
<div id="tab3_tips" class='dis'>
<div id="my-message" class="my-message">
<div class="tipInfo waitting">
</div>
<ul id="my-message-list" class="post-list">
</ul>
<div class="loadMore" id="loadMsgMore"> <span>加载更多</span><em style="display:none; background:#ccc;"></em></div>
</div>
</div>
<div id="tab4_mycon" class='undis'>
<div id="my-notification" class="my-notification ">
<div class="tipInfo waitting">
</div>
<ul id="my-notification-list" class="post-list">
</ul>
<div class="loadMore" id="loadCmtMore"> <span>加载更多</span><em style="display:none; background:#ccc;"></em></div>
</div>
</div>
</div>

</div>
<div id = "hiddenCon" class="hiddenCon"> 
</div>
<div class="pop_reply" id="public_reply" style = "display:none">
<div class="textarea">
<textarea tabindex="1" autocomplete="off" name="content" accesskey="u" id="pop_content"></textarea>   
</div>        
<div class="commtSub" id="p_login_btn">
<div class="replyTop">
<span class='pop_user_login'>登录</span><span class='pop_user_info'></span><span class="tips"></span>
</div>
<div class='replyBtn'>
<a href="javascript:void(0)" class="submit" id="pop_post_btn">回复</a>
</div> 
</div>
</div>
</div>
<!--遮罩层-->
<div class = 'maskObj' id = 'maskObj'>
</div>
*/

function cmtlist() {

}

$("#coral_comment").html('<div id="coral_cmtbox"></div><div id="coral_cmtlist"></div>');
$("#coral_cmtbox").attr("style", "width: 100%; font-family: 'Microsoft YaHei',arial,tahoma,宋体,sans-serif; position: relative; float: left;").html();
$("#coral_cmtlist").attr("style", "").html("");