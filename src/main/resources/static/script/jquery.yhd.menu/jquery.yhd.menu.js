(function($) {
	function initFun($this,options){//初始化事件
		var u = options.url==null ? "script/data.json" : options.url;
		if($this.find('.CTRLITEM').length==0){
			$.ajax({
				url: u,
				type:"GET",
				dataType:"JSON",
				error:function(){
				},
				success:function(result){
					var rlength = result.length;
					var html='<div class="ClearAll" style="">';
					/*创建一级菜单*/
					for(var i=0;i<rlength;i++){
						html+= '<div class="FloatLeft CTRLITEM level="'+result[i]["level"]+'" style="">' +
						'<div style="margin: 0px auto; width: 100px">'+
						'<span onclick=javascript:self.location="'+result[i]['link']+'" class="">'+result[i]["label"]+'</span>';
						html+= createItem(result[i]);
						html+= '<div class="ClearAll"></div></div></div>';
					}
					html+='</div>';
					$(html).appendTo($this);
					
					/*添加事件*/
					eventListener($this);
				}
			});	
		}else{

			eventListener($this);
		}
	}
	
	/*递归创建子级菜单*/
	function createItem(result){
		var hh="";
		var rChild = result['children'];
		var cLevel = result['level']+1;
		if(rChild.length != 0){
			hh+='<div class="SUBMENU LEVEL_'+cLevel+'">';
			for(var i=0;i<rChild.length;i++){
				hh+= '<div class="ClearAll CTRLITEM RCTRL" level="'+cLevel+'" style="">'+
				'<div style="margin: 0px auto; width: 120px">' +
				'<span onclick=javascript:self.location="'+rChild[i]['link']+'" class="">' +rChild[i]["label"]+'</span>';
				hh+=createItem(rChild[i]);
				hh+= '<div class="ClearAll"></div></div></div>';
				
			}
			hh+='</div>';
		}
		return hh;
	}
	/*自动判断几级菜单*/
	function eventListener($this){
		var $ALLSUBITEM = $this.find(".SUBMENU");
		
		if($ALLSUBITEM.length!=0){
			$ALLSUBITEM.hide();	
			
		}
		var menus = $this.find("[level]");
		var num = {};
		var levelNum = 1;
		
		for(var i=0;i<menus.length;i++){
			num[i] = $(menus[i]).attr("level");
			levelNum = Math.max(levelNum,num[i]);   //获取菜单级数
		}
		for(var i=0;i<=levelNum;i++){
			menuEvent($this,i);
		}
		addSpan($this);
	}
	/*鼠标事件*/
	function menuEvent($this,level){
		var $LEVEL = $('[level='+level+']',$this);
		var $SUBLEVEL = $LEVEL.find('.SUBMENU');
		
		
		$SUBLEVEL.css("position","absolute");
		$SUBLEVEL.addClass('ALLSUBITEM');
		
		
		
		
		if(level>0){
			//标记子菜单
			$LEVEL.addClass('SUBITEM');
		}else if(level==0){
			//标记主菜单
			$LEVEL.addClass('MAINITEM');
		}
		
		
		$LEVEL.on({
			"mouseenter":function(){
				var $item = $(this);
				var $SUBLEVEL = $('.SUBMENU',$item).slice(0,1);
				var position = $item.position();
				var itemWidth = $item.outerWidth();
				var itemHeight = $item.outerHeight();
				
				if(level==0){
					if($SUBLEVEL.length){
						$SUBLEVEL.css({
							"top":position.top+itemHeight
						});
					}
					$item.addClass("MOUSEOVER_1");
				}else{
					if($SUBLEVEL.length){
						
						$SUBLEVEL.css({
							"left":itemWidth,
						});
					}
					$item.addClass("MOUSEOVER_2");
				
					$SUBLEVEL.css("display","inline");
				}
				if($SUBLEVEL.length){
					$SUBLEVEL.show();
					
				}
			},
			"mouseleave":function(){
				var $item = $(this);
				var $SUBLEVEL = $('.SUBMENU',$item).slice(0,1);
				if(level==0){
					$item.removeClass("MOUSEOVER_1");						
				}else{
					$item.removeClass("MOUSEOVER_2");
				}
				if($SUBLEVEL.length!=0){
					$SUBLEVEL.hide();
				}
			}
		});
	}
	
	//为菜单添加图标
	function addSpan($this){
		//找到所有主菜单
		$MAINITEM=$this.find(".MAINITEM");
		//遍历寻找子菜单，有子菜单就添加图标
		$MAINITEM.each(function(){
			var $this=$(this);
			var $SUBITEM=$this.children('div').children('.ALLSUBITEM').children('.SUBITEM');
			if($SUBITEM.length!=0){
				$this.children('div').children('span').after("<div class=\"MENUSPANDIV\"><span></span><span></span><span></span></div>");
				$SUBITEM.each(function(){
					digui($(this));
				})
				
			}
		});
		
		//递归加图标
		function digui($this){
			var $SUBITEM=$this.children('div').children('.ALLSUBITEM').children('.SUBITEM');
			if($SUBITEM.length!=0){
				$this.children('div').children('span').after("<div class=\"MENUSPANDIV\"><span></span><span></span><span></span></div>");
				$SUBITEM.each(function(){
					digui($(this));
				});
				
			}else{
			}
		}
	}
	
	var defaults = {
		url:null
	};
	var methods = {
		init : function(options) {
			// 在每个元素上执行方法
			return this.each(function() {				
				var $this = $(this);
				// 尝试去获取settings，如果不存在，则返回“undefined”
				var settings = $this.data('yhd.menu');
				// 如果获取settings失败，则根据options和default创建它
				if (typeof (settings) == 'undefined') {
					settings = $.extend({}, defaults, options);
					// 保存我们新创建的settings
					$this.data('yhd.menu', settings);
				} else {
					// 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
					settings = $.extend({}, settings, options);
					// 如果你想每次都保存options，可以添加下面代码：
					// $this.data('pluginName', settings);
				}
				initFun($this,settings);
				// 执行代码
			});
		},
		hide : function(){},

	};
	$.fn.menu = function(){
		var method = arguments[0];
		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		}else if(typeof(method) == 'object' || !method){
			method =methods.init;
		}else{
			$.error('Method ' + method + ' does not exist on jquery.yhd.menu');
			return this;
		}
		return method.apply(this, arguments);
	};
})(jQuery);