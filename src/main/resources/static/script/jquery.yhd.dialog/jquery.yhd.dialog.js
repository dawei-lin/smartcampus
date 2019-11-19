(function($){
	$.dialog = {
		show : function(options){
			closeDialog();
			setDialog(options);
		},
		close : function(options){
			closeDialog();
		}
	}
	var defaults = {
			width:500,
			height:400,
			title:"会话窗口",
			msg:"",
			url:"",
			modal:true,
			draggable:false,
			resizable:false,
			collapsible:false,
			minimizable:false,
			maximizable:false,
			titleable:false,
			btnOK:false,
			btnCancel:false,
			dialogInit:true,
			fn:function(){},
	}
	var DialogOninit = false;//窗口是否初始化
	
	var nW,nH,nT,nL=null; //当前窗口大小,偏移
	function setDialog(options){
		settings = $.extend({},defaults,options);
		settings.justMsg = options;
		//创建窗口
		if(!DialogOninit){
			createDialog(settings);
			DialogOninit = true;
		}
		
		var $dialog = $('#dialog-win');
		var $dtitle = $('#dialog-title',$dialog);
		var $dbody = $('#dialog-body',$dialog);
		var $dmsg = $('#dialog-msg',$dialog);
		var dW = $dialog.width(), dH = $dialog.height();
		var dT = $dialog.offset().top, dL = $dialog.offset().left;
		var bW = $dbody.width(), bH = $dbody.height();
		var mW = $dmsg.width(), mH = $dmsg.height();
		var $win = $(window);
		//是否可拖拽移动
		if(settings.draggable){
			dragEvent($dialog);		
		}
		//是否可通过拖拽调整大小
		if(settings.resizable){	
			resizeEvent($dialog);
		}
		//是否增加OK或Cancel按钮
		if(settings.btnOK || settings.btnCancel){
			var btnhtml ='<div class="c-dialog-btn" style="text-align:right;">';
			if(settings.btnOK){
				btnhtml+='<a id="d-btnOK" class="dialog-btn" href="javascript:void(0)"><span class="btn-text">确定</span></a>';				
			}
			if(settings.btnCancel){
				btnhtml+='<a id="d-btnCancel" class="dialog-btn" href="javascript:void(0)"><span class="btn-text">取消</span></a>';				
			}
			$dbody.append(btnhtml);
		}else{
			$dmsg.css({
				height:mH +27
			});
		}
		//关闭按钮
		$dialog.on('click','.dialog-title-close',function(){
			closeDialog();
		});
		//最大化按钮
		$dialog.on('click','.dialog-title-max',function(){
			$dialog.css({
				width:$win.width()-9,
				left:0,
				top:0,
			});
			$dbody.css({
				width:$win.width()-24,
				height:$win.height()-50
			});
			$dmsg.css({
				width:$win.width()-37,
				height:($('.dialog-btn').length!=0)?$win.height()-90:$win.height()-63
			});
			$(this).removeClass('dialog-title-max');
			$(this).addClass('dialog-title-restore');
		});
		//还原按钮
		$dialog.on('click','.dialog-title-restore',function(){
			$dialog.css({
				width:(nW==null)?dW:nW,
				left:(nL==null)?dL:nL,
				top:(nT==null)?dT:nT
			});
			$dbody.css({
				width:(nW==null)?dW-12:nW-12,
				height:(nH==null)?dH-33:nH-33
			});
			$dmsg.css({
				width:(nW==null)?dW-25:nW-25,
				height:($('.dialog-btn').length!=0)?((nH==null)?dH-73:nH-73):mH+27
			});
			$(this).removeClass('dialog-title-restore');
			$(this).addClass('dialog-title-max');
		});
		
		$dialog.on('click','.dialog-title-collapseUp',function(){
			$('.c-dialog-body').slideUp();
			$(this).removeClass('dialog-title-collapseUp');
			$(this).addClass('dialog-title-collapseDown');
		});
		$dialog.on('click','.dialog-title-collapseDown',function(){
			$('.c-dialog-body').slideDown();
			$(this).removeClass('dialog-title-collapseDown');
			$(this).addClass('dialog-title-collapseUp');
		});
		//最小化按钮
		$dialog.on('click','.dialog-title-min',function(){
			closeDialog();
		});
		
		$('#d-btnCancel').click(function(){
			closeDialog();
		});
		$('#d-btnOK').click(function(){
			settings.fn();
			closeDialog();
		});
		
	}
	
	function createDialog(options){
		var width,height,top,left=0;
		var title = options.title;
		var msg = "";
		var url = options.url;
		var $win = $(window);
		var scrollTop = $win.scrollTop();
		var scrollLeft = $win.scrollLeft();
		var mState = options.modal;
		$('#dialog-win:first').remove();
		//设置文本内容
		if(typeof(options.justMsg)!='undefined'){
			msg = options.justMsg;
		}else{
			msg = options.msg;
		}
		//是否初始化窗口的大小和位置
		if(options.dialogInit){
			width = options.width;
			height = options.height;
			//top = scrollTop+$win.height()/4;
			top = scrollTop+10;
			left = scrollLeft+$win.width()/2-width/2;
		}else{
			width = (nW==null)?options.width:nW;
			height = (nH==null)?options.height:nH;
			top = (nT==null)?scrollTop+$win.height()/4:nT;
			left = (nL==null)?scrollLeft+$win.width()/2-width/2:nL;
		}
		//width+=30;
		//height+=30;
		//var html='<div id="dialog-win" class="c-dialog-win c-dialog-modal fontset" style="width:'+width+'px;top:'+top+'px;left:'+left+'px;height:'+height+'px;">';
		var html='<div id="dialog-win" class="c-dialog-win c-dialog-modal fontset" style="top:'+top+'px;left:'+left+'px;">';
		if(options.titleable==true){
			html+='<div id="dialog-title" class="c-dialog-title">'+
				 '<div class="c-dialog-title-tool">'+
				 '<i class="dialog-title-close dialog-title-tool"></i>';
		if(options.maximizable){
			html+='<i class="dialog-title-max dialog-title-tool"></i>';		
		}
		if(options.minimizable){
			html+='<i class="dialog-title-min dialog-title-tool"></i>';		
		}
		if(options.collapsible){
			html+='<i class="dialog-title-collapseUp dialog-title-tool"></i>';		
		}
		html+='</div>';
		html+='<span id="dialog-title-name" class="dialog-title">'+title+'</span></div>';
		}
		html+='<div id="dialog-tool" class="c-dialog-tool"></div>'+
		'<div id="dialog-body" class="c-dialog-body">'+
		'<div id="dialog-msg" class="c-dialog-msg" style="width:'+(width)+'px;height:'+(height)+'px;">';
		/*'<div id="dialog-body" class="c-dialog-body" style="width:'+(width-12)+'px;height:'+(height-60)+'px;">'+
		'<div id="dialog-msg" class="c-dialog-msg" style="width:'+(width-24)+'px;height:'+(height-100)+'px;">';*/
		
		if(url != ""){
			html+='<iframe id="dialog-iframe" style="width:100%;height:100%;" src="'+url+'" frameborder="no"></iframe>';		
		}else{
			html+=msg;
		}
		html += '</div>';
		
		
		html+='</div></div>';
		html+='<div class="dialog-mask"></div>';
		html+='</div>';
		if(mState){
			html+='<div class="dialog-modal modal"></div>';
		}
		$('body').append(html);	
		/*显示模态框*/
		$('.dialog-modal').show();	
	}
	
	/*判断是否可拖动，可拖动放大缩小*/
	var isDragging=false;
	var isResizing=false;
	
	/*拖动事件*/
	function dragEvent($dialog){
		var mx=0,my=0;	//鼠标x,y轴坐标
		var dx=0,dy=0;	//对话框坐标
		var $title = $dialog.find('#dialog-title');
		$title.mousedown(function(e){
//		e = e || window.event;
			/*获取鼠标点击时的坐标*/
			mx = e.clientX;
			my = e.clientY;
			/*获取当前窗口的偏移值*/
			dx = $dialog.offset().left;
			dy = $dialog.offset().top;
			isDragging = true;
		});
		$(document).mousemove(function(e){
			if(isDragging){
//			e = e || window.event;
				/*获取鼠标移动时的坐标*/
				var x = e.clientX;
				var y = e.clientY;
				/* 计算鼠标移动后的坐标 */
				var moveX = dx + x -mx;
				var moveY = dy + y -my;
				
				var pageW = $(window).width();
				var pageH = $(window).height();
				var mW = $dialog.width();
				var mH = $dialog.height();
				var maxX = pageW - mW -13;
				var maxY = pageH - mH -13;
				moveX = Math.min(Math.max(0,moveX),maxX);
				moveY = Math.min(Math.max(0,moveY),maxY);
				
				$dialog.css({
					left : moveX+'px',
					top : moveY+'px'
				});
				nL = moveX;
				nT = moveY;
				//拖动时禁止选中对话框内容
				document.documentElement.onselectstart = function(){
					return false;
				}
				document.documentElement.ondrag = function(){
					return false;
				}
				//显示遮罩层，防止拖拽过程中选中主体内容
				$('.dialog-mask',$dialog).show();
				$('.dialog-mask',$dialog).css('zIndex','1');
			}
		});
		
		$(document).mouseup(function(e){
//		e = e || window.event;
			isDragging = false;
			//隐藏遮罩层
			$('.dialog-mask',$dialog).hide();
			$('.dialog-mask',$dialog).css('zIndex','-1');
			//取消禁止选中主体内容
			document.documentElement.onselectstart = function(){
				return true;
			}
			document.documentElement.ondragstart = function(){
				return true;
			}
		});
		
	}
	/*拖动放大缩小事件*/
	function resizeEvent($dialog){
		var mx=0,my=0;	//鼠标x,y轴坐标
		var dx=0,dy=0;	//对话框坐标
		var mW=0,mH=0;	//对话框宽高
		var ex,wx,ny,sy=0; //对话框上下左右边的偏移
		var direction="";
		
		$dialog.mousedown(function(e){
//		e = e || window.event;	
			mx = e.clientX;
			my = e.clientY;
			dx = $(this).offset().left;
			dy = $(this).offset().top;
			mW = $(this).width();
			mH = $(this).height();
			var ow = $(this).outerWidth();
			var oh = $(this).outerHeight();
			ex = ow + this.offsetLeft;  
			wx = this.offsetLeft;		
			ny = this.offsetTop;		
			sy = oh + this.offsetTop;
			
			
			/*拖动8个方向的鼠标事件*/
			if(mx>ex-8 && mx<ex+8 && my>sy-8 && my<sy+8){
				$(this).css('cursor','se-resize');
				direction = 'se';
				if(!isDragging){
					isResizing = true;
				}
			}else if(my>sy-8 && my<sy+8 && mx>wx-8 && mx<wx+8){
				$(this).css('cursor','sw-resize');
				direction = 'sw';
				if(!isDragging){
					isResizing = true;
				}
			}else if(my>ny-8 && my<ny+8 && mx>ex-8 && mx<ex+8){
				$(this).css('cursor','ne-resize');
				direction = 'ne';
				if(!isDragging){
					isResizing = true;
				}
			}else if(my>ny-8 && my<ny+8 && mx>wx-8 && mx<wx+8){
				$(this).css('cursor','nw-resize');
				direction = 'nw';
				if(!isDragging){
					isResizing = true;
				}
			}else if(my>sy-8 && my<sy+8){
				$(this).css('cursor','s-resize');
				direction = 's';
				if(!isDragging){
					isResizing = true;
				}
			}else if(mx>ex-8 && mx<ex+8){
				$(this).css('cursor','e-resize');
				direction = 'e';
				if(!isDragging){
					isResizing = true;
				}
			}else if(mx>wx-8 && mx<wx+8){
				$(this).css('cursor','w-resize');
				direction = 'w';
				if(!isDragging){
					isResizing = true;
				}
			}else if(my>ny-8 && my<ny+8){
				$(this).css('cursor','n-resize');
				direction = 'n';
				if(!isDragging){
					isResizing = true;
				}
			}
		});
		$(document).mousemove(function(e){
			if(isResizing){
//			e = e || window.event;
				var x = e.clientX;	//当前鼠标x坐标
				var y = e.clientY;	//当前鼠标y坐标
				var ex =mW+x-mx;	//东方向移动的距离
				var sy =mH+y-my;	//南方向移动的距离
				var wx =mW-x+mx;	//西方向移动的距离
				var ny =mH-y+my;	//北方向移动的距离
				/*当移动有关西。北方向时，对话框需要改变的偏移*/
				var t =dy+y-my;	
				var l =dx+x-mx;
				
				switch(direction){
				case 'se':
					eResize($dialog,ex);
					sResize($dialog,sy);
					break;
				case 'e':
					eResize($dialog,ex);
					break;
				case 's':
					sResize($dialog,sy);
					break;
				case 'w':
					wResize($dialog,wx,l);
					break;
				case 'n':
					nResize($dialog,ny,t);
					break;
				case 'sw':
					wResize($dialog,wx,l);
					sResize($dialog,sy);
					break;
				case 'nw':
					wResize($dialog,wx,l);
					nResize($dialog,ny,t);
					break;
				case 'ne':
					eResize($dialog,ex);
					nResize($dialog,ny,t);
					break;
				}
				//显示遮罩层，防止拖拽过程中选中主体内容
				$('.dialog-mask',$dialog).show();
				$('.dialog-mask',$dialog).css('zIndex','1');
				//拖动时禁止选中对话框内容
				document.documentElement.onselectstart = function(){
					return false;
				}
				document.documentElement.ondragstart = function(){
					return false;
				}
			}
		});
		$(document).mouseup(function(){
			isResizing = false;
			$dialog.css('cursor',"");
			direction = "";
			$('.dialog-mask',$dialog).hide();
			$('.dialog-mask',$dialog).css('zIndex','-1');
			document.documentElement.onselectstart = function(){
				return true;
			}
			document.documentElement.ondragstart = function(){
				return true;
			}
		});
		
	}
	
	//nH,nW,nT,nL为全局变量，保存当前对话框的height,width,top,left
	function sResize($dialog,y){
		$dialog.find('#dialog-body').css({
			height:y-33
		});
		$dialog.find('#dialog-msg').css({
			height:($('.dialog-btn').length!=0)?y-73:y-45
		});
	
		nH = y;
	}
	
	function eResize($dialog,x){
		$dialog.css({
			width:x
		});
		$dialog.find('#dialog-body').css({
			width:x-12,
		});
		$dialog.find('#dialog-msg').css({
			width:x-24,
		});
		
		nW = x;
	}
	function nResize($dialog,y,t){
		$dialog.css({
			top:Math.min(t,nH+nT-33),
		});
		$dialog.find('#dialog-body').css({
			height:y-33
		});
		$dialog.find('#dialog-msg').css({
			height:($('.dialog-btn').length!=0)?y-73:y-45
		});
		
		nH = y;
		nT = t;
	}
	function wResize($dialog,x,l){
		$dialog.css({
			left:Math.min(l,nW+nL),
			width:x
		});
		$dialog.find('#dialog-body').css({
			width:x-12,
		});
		$dialog.find('#dialog-msg').css({
			width:x-24,
		});
		nW = x;
		nL = l
		
	}
	function closeDialog(){
		$('.c-dialog-win').hide();
		DialogOninit = false;
		if($('.c-dialog-win').hasClass('c-dialog-modal')){
			$('.dialog-modal').remove();			
		}
	}
})(jQuery);