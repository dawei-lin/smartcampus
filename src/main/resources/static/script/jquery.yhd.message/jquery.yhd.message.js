(function($){
	$.message = function(options){
		setMessage(options);
	},
		
	$.alert = function(options){
		setAlert(options);
	},
		
	$.confirm = function(options){
		setConfirm(options);
	},
		
	$.prompt = function(options){
		setPrompt(options);
	}
		
var defaults = {
		title:"",
		msg:"",
		width:300,
		height:158,
		icon:"",
		showType:"slide",
		showSpeed:600,
		timeout:4000,
		modal:true,
		draggable:false,
		closeable:false,
		fn:function(){}
};


function setPrompt(options){
	var settings = $.extend({},defaults,options);
	settings.justMsg = options;
	
	createMessage(settings,"prompt");
	var $msgPrompt=$('.msgbox-prompt:last');
	
	if(settings.draggable){
		dragEvent($msgPrompt);		
	}
	
	$msgPrompt.on('click','#msg-btnOK',function(){
		var text = $('.messager-text input').val();
		settings.fn(text);
		closeMessager($(this).closest('#msgbox-win'));			
	});
	
	$msgPrompt.on('click','.msgbox-prompt-close,#msg-btnCancel',function(){
		closeMessager($(this).closest('#msgbox-win'));
	});

}

function setConfirm(options){
	var settings = $.extend({},defaults,options);
	settings.justMsg = options;
	createMessage(settings,"confirm");
	var $msgConfirm = $('.msgbox-confirm:last');
	if(settings.draggable){
		dragEvent($msgConfirm);		
	}
	
	$msgConfirm.on('click','#msg-btnOK',function(){
		settings.fn();
		closeMessager($(this).closest('#msgbox-win'));			
	});
	$msgConfirm.on('click','.msgbox-confirm-close,#msg-btnCancel',function(){
		closeMessager($(this).closest('#msgbox-win'));
	});

}
function setAlert(options){
	var settings = $.extend({},defaults,options);
	settings.justMsg = options;
	createMessage(settings,"alert");
	var $msgAlert = $('.msgbox-alert:last');
	if(settings.draggable){
		dragEvent($msgAlert);		
	}
	$msgAlert.on('click','#msg-btnOK',function(){
		settings.fn();
		closeMessager($(this).closest('#msgbox-win'));
	});
	$msgAlert.on('click','.msgbox-alert-close',function(){
		closeMessager($(this).closest('#msgbox-win'));			
	});

}
/*创建消息框*/
function setMessage(options){
	var settings = $.extend({},defaults,options);
	var showType = settings.showType;
	var showSpeed = settings.showSpeed;
	var timeout = settings.timeout;
	var width = settings.width;
	var height = settings.height;
	var title = (settings.title=="")?"消息框":settings.title;
	var msg = "";
	var $win = $(window);
	var scrollTop = $win.scrollTop();
	var scrollLeft = $win.scrollLeft();
	var top = scrollTop+$win.height()-height-3;		//窗口y轴偏移
	var left = scrollLeft+$win.width()-width-3;		//窗口x轴偏移
	//判断输入内容类型
	if(typeof(options)!='undefined'){
		msg = options;
	}else{
		msg = settings.msg;
	}

	var bodyHtml ='<div class="messager-icon" style="display:none;"></div>'+
	  			  '<div id="msgbox-message">'+msg+'</div>'+
	  			  '<div style="clear:both;"></div>';

	var msgHtml ='<div id="msgbox-win" class="c-msgbox-win fontset msgbox-show" style="width:'+width+'px;height:'+height+'px;top:'+top+'px;left:'+left+'px;z-index:7777;">';
	if(settings.titleable){
	 			 msgHtml+='<div id="msgbox-title" class="c-msgbox-title">'+
	 			 '<i id="msgbox-title-close" class="msgbox-show-close" style="display:inline-block;width:16px;height:16px;"></i>'+
	 			 '<span id="msgbox-title-name">'+title+'</span></div>';
	}
	 msgHtml+='<div id="msgbox-body" class="c-msgbox-body ClearAll" style="width:'+(width-22)+'px;height:'+(height-45)+'px;">'+bodyHtml+'</div>';
	msgHtml+= '</div>';
	$('body').append(msgHtml);
	
	var $msgShow = $('.msgbox-show:last');
	$msgShow.hide();
	//显示隐藏动画
	animation(showType);
	
	$msgShow.siblings('.msgbox-show').remove();
	
	$msgShow.hover(function(){
		clearTimeout(sto);
	},function(){
		if($(this).is(':visible')){
			animation(showType);
		}
	});
	
	$msgShow.on('click','.msgbox-show-close',function(){
		closeMessager($(this).closest('#msgbox-win'));
		if(typeof(sto)!='undefined'){
			clearTimeout(sto);			
		}
	});
	
	function animation(type){
		switch(type){
		case "show":
			$msgShow.show(showSpeed);
			if(timeout!=0){
				sto = setTimeout(function(){
					$msgShow.hide(showSpeed);
					MessageOninit = false;
				},timeout);					
			}
			break;
		case "fade":
			$msgShow.fadeIn(showSpeed);
			if(timeout!=0){
				sto = setTimeout(function(){
					$msgShow.fadeOut(showSpeed);
					MessageOninit = false;
				},timeout);					
			}
			break;
		case "slide":
			$msgShow.slideDown(showSpeed);
			if(timeout!=0){
				sto = setTimeout(function(){
					$msgShow.slideUp(showSpeed);
					MessageOninit = false;
				},timeout);					
			}
			break;
		default:
			$msgShow.slideDown(showSpeed);
			if(timeout!=0){
				sto = setTimeout(function(){
					$msgShow.slideUp(showSpeed);
					MessageOninit = false;
				},timeout);					
			}
			break;
		}
	}
}

//创建弹出式对话框
function createMessage(options,type){
	var settings = $.extend({},defaults,options);
	var icon;
	var width = options.width;
	var height = options.height;
	var title="";
	var msg="";
	var $win = $(window);
	var scrollTop = $win.scrollTop();
	var scrollLeft = $win.scrollLeft();
	var top=scrollTop+$win.height()/4;
	var left=scrollTop+$win.width()/2-width/2;
	var mState = options.modal;
	$('#msgbox-win').remove();
	
	if(typeof(settings.justMsg)!="undefined"){
		msg = (options.msg=="")?settings.justMsg:options.msg;
	}
	/*设置不同类型对话框的标题*/
	if(options.title==""){
		switch(type){
		case "prompt":
			title = "提示输入框";
			break;
		case "confirm":
			title = "确认框";
			break;
		case "alert":
			title = "提示框";
			break;
		}
	}else{
		title = options.title;
	}
	/*设置不同类型对话框的图标*/
	switch(type){
	case "prompt":
		icon = "question";
		break;
	case "confirm":
		icon = "question";
		break;
	case "alert":
		icon = options.icon;
		break;
	}
	var bodyHtml ='<div class="messager-icon messager-'+icon+'"></div>'+
	  			  '<div id="msgbox-message">'+msg+'</div>'+
	  			  '<div class="ClearAll"></div>';

	var msgHtml ='<div id="msgbox-win" class="c-msgbox-win c-msg-modal fontset msgbox-'+type+'" style="width:'+width+'px;height:'+height+'px;top:'+top+'px;left:'+left+'px;">';
	//if(settings.titleable){
		msgHtml+='<div id="msgbox-title" class="c-msgbox-title">';
		if(settings.closeable){
			msgHtml+='<i id="msgbox-title-close" class="msgbox-'+type+'-close" style="width:16px;height:16px;"></i>';
		}
		msgHtml+='<span id="msgbox-title-name">'+title+'</span></div>';
	//}
	//msgHtml+='<div id="msgbox-body" class="c-msgbox-body ClearAll" style="width:'+(width-22)+'px;height:'+(height-71)+'px;">';
		msgHtml+='<div id="msgbox-body" class="c-msgbox-body ClearAll" style="width:'+(width-22)+'px;">';
	
	/*设置不同对话框的主体内容*/
	switch(type){
	case "prompt":
		bodyHtml+='<div class="messager-text">'+'<input type="text" style="width:'+(width-28)+'px;"></div>';
		msgHtml+= bodyHtml;
		msgHtml+= '</div>';
		msgHtml+= '<div class="msgbox-btn" style="text-align:center;">'+
		 		  '<a id="msg-btnOK" class="msg-btn" href="javascript:void(0)">确定</a>'+'<a id="msg-btnCancel" class="msg-btn1" href="javascript:void(0)">取消</a></div>';
		break;
	case "alert":
		msgHtml+= bodyHtml;
		msgHtml+= '</div>';
		msgHtml+='<div class="msgbox-btn" style="text-align:center;">'+
		 		 '<a id="msg-btnOK" class="msg-btn" href="javascript:void(0)">确定</a></div>';
		break;
	case "confirm":
		msgHtml+= bodyHtml;
		msgHtml+= '</div>';
		msgHtml+= '<div class="msgbox-btn" style="text-align:center;">'+
		 		  '<a id="msg-btnOK" class="msg-btn" href="javascript:void(0)">确定</a>'+'<a id="msg-btnCancel" class="msg-btn1" href="javascript:void(0)">取消</a></div>';
		break;
	}
	msgHtml+='</div>';
	if(mState){
		msgHtml+='<div class="msg-modal modal"></div>';	
	}
	$('body').append(msgHtml);
	/*显示模态框*/
	$('.msg-modal').show();			
}
/*拖动事件*/
function dragEvent($win){
	var mx=0,my=0;	//鼠标x,y轴坐标
	var dx=0,dy=0;	//对话框坐标
	var isDragging=false; //可否拖动
	var $title = $win.find('#msgbox-title');
	
	$title.on('mouseenter',function(){
		$(this).css('cursor','move');
	});
	$title.on('mouseleave',function(){
		$(this).css('cursor','');
	});
	
	$title.mousedown(function(e){
		e = e || window.event;
		/*获取鼠标点击时的坐标*/
		mx = e.clientX;
		my = e.clientY;
		/*获取当前窗口的偏移值*/
		dx = $win.offset().left;
		dy = $win.offset().top;

		isDragging = true;
	});
	
	$(document).mousemove(function(e){
		if(isDragging){
			var e = e || window.event;
			var x = e.clientX;
			var y = e.clientY;
			/* 计算鼠标移动后的坐标 */
			var moveX = dx + x -mx;
			var moveY = dy + y -my;
			
			var pageW = $(window).width();
			var pageH = $(window).height();
			var mW = $win.width();
			var mH = $win.height();
			var maxX = pageW - mW;
			var maxY = pageH - mH;
			moveX = Math.min(Math.max(0,moveX),maxX);
			moveY = Math.min(Math.max(0,moveY),maxY);
			
			$win.css({
				left : moveX+'px',
				top : moveY+'px'
			});
			//拖动时禁止选中对话框内容
			document.documentElement.onselectstart = function() {
				return false;
			}; 
			document.documentElement.ondrag = function() {
				return false;
			};
		}
	});
	
	$(document).mouseup(function(e){
		e = e || window.event;
		isDragging = false;
		
		//拖动时禁止选中对话框内容
		document.documentElement.onselectstart = function() {
			return true;
		}; 
		document.documentElement.ondrag = function() {
			return true;
		};
	});
}
function closeMessager($win){
	$win.hide();
	if($win.hasClass('c-msg-modal')){
		$('.msg-modal').remove();			
	}
}
})(jQuery);