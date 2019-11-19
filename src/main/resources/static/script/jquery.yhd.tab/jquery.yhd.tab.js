(function($){
	var defaults = {
			width:500,
			height:200,
			tabClose:true
	};
	$.fn.tab = function() {
		var method = arguments[0];
		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if (typeof (method) == 'object' || !method) {
			method = methods.init;
		} else {
			$.error('Method ' + method+ ' does not exist on jQuery.yhd.tab');
			return this;
		}
		return method.apply(this, arguments);
	}
	var methods = {
			init : function(options) {
				// 在每个元素上执行方法
				return this.each(function() {				
					var $this = $(this);
					// 尝试去获取settings，如果不存在，则返回“undefined”
					var settings = $this.data('yhd.tab');
					// 如果获取settings失败，则根据options和default创建它
					if (typeof (settings) == 'undefined') {
						settings = $.extend({}, defaults, options);
						// 保存我们新创建的settings
						$this.data('yhd.tab', settings);
					} else {
						// 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
						settings = $.extend({}, settings, options);
						// 如果你想每次都保存options，可以添加下面代码：
						// $this.data('pluginName', settings);
					}
					initFun($this,settings);
					// 执行代码
				});
			}
		};
	
	function initFun($target,options){
		var ALLITEM = $('.CTRLITEM',$target);	
		var ALLTABPAGE = $('.TABPAGE',$target);
		ALLITEM.addClass('ITEMSTYLE',$target);
		ALLTABPAGE.addClass('PAGESTYLE');
		ALLITEM.children('span').addClass('SPANSTYLE');
		var ALLSPAN = $('.SPANSTYLE',$target);
		var hasPage = ALLSPAN.siblings('.TABPAGE').siblings('span');//拥有page的选项卡
		hasPage.addClass('SPANOVER');

		
		/*设置窗口样式*/
		//$target.css('border','1px #95b8e7 solid').css('width',options.width).css('height',options.height);
		$target.css('position','relative').css('overflow','hidden');
		ALLITEM.parent().css('height',ALLSPAN.outerHeight(true)+parseInt(ALLITEM.css("border-top")));
		
		/*设置tabpage的样式*/
		ALLTABPAGE.css('width',$target.innerWidth()).css('height',$target.height()-ALLITEM.parent().height()-parseInt(ALLITEM.parent().css('padding-top')));
		var width=$(ALLITEM).width();
		//得到左边的margin和
		var MLeft=parseInt($(ALLITEM).css("margin-left"));
		//border、padding的总值
		var BPLeft=($(ALLITEM).outerWidth()-$(ALLITEM).width())/2;
		for(var i=0;i<ALLITEM.length;i++){
			left=-(width*i+MLeft*(i+1)+BPLeft*(i*2+1));
				$('.TABPAGE',$(ALLITEM[i])).css({
					'position':'relative',
					'left':left+'px',
					'top':ALLSPAN.outerHeight(true)+'px',
					'padding-top':-(ALLSPAN.outerHeight(true))+'px'
				});
		}
		
		ALLTABPAGE.hide();
		ALLITEM.eq(0).addClass('tab-selected').children('.TABPAGE').show();
		/*添加序号*/
		ALLSPAN.each(function(i){	
			$(this).attr('tabnum',i+1);
			$(this).width(ALLITEM.width());
			//设置无page的选项卡的样式
			if(!$(this).siblings('.TABPAGE').length){
				$(this).css('border','none');
				$(this).css('background','none');
				$(this).css('cursor','default');
			}
		});
		
		
		/*是否添加关闭按钮*/
		if(options.tabClose){
			hasPage.each(function(){
				$(this).append('<a id="tab-btn-close" class="tab-btn-close-icon" href="javascript:void(0)"></a>');
			});
			hasPage.find('a#tab-btn-close').each(function(i){
				$(this).css({
					left:$(this).parent().width()*(0.8+i)+5*(i+1),
					top:($(this).parent().height()/2)-2
				});
			});
		}
		
		var maxL = ALLITEM.parent().width();
		var allItemL=0;
		var itemLeft={};		//tab当前的偏移
		var itemWidth={};		//当前tab的宽

		//获得tab的偏移和宽
		ALLSPAN.each(function(i){
			allItemL += $(this).outerWidth(true);
		});

		//是否添加按钮并设置相关样式
		if(allItemL > maxL){
			ALLITEM.parent().prepend('<a id="tab-btn-prev" class="tab-btn-icon tab-btn-prev-icon" href="javascript:void(0)"></a>');
			ALLITEM.parent().append('<a id="tab-btn-next" class="tab-btn-icon tab-btn-next-icon" href="javascript:void(0)"></a>');
			ALLSPAN.each(function(i){
				if((i+1) == 1){
					itemLeft[i] = $target.offset().left + $('#tab-btn-prev').outerWidth(true)-1;
					itemWidth[i] = $(this).outerWidth(true);
					$(this).css({
						'left':itemLeft[i]
					});
				}else{
					itemLeft[i] = itemLeft[i-1]+itemWidth[i-1];
					itemWidth[i] = $(this).outerWidth(true);
					$(this).css({
						'left':itemLeft[i]
					});
				}
			});

			$('#tab-btn-prev').css({
				left:$target.offset().left
			});
			$('#tab-btn-next').css({
				left:$target.offset().left + $target.width() - $('#tab-btn-next').outerWidth(true) +2
			});
			$('.tab-btn-icon').css({
				'height':ALLITEM.parent().height()-1,
				'background-color':'#d0e2ff'
			});
		}else{
			ALLSPAN.each(function(i){
				if((i+1) == 1){
					itemLeft[i] = $target.offset().left+1;
					itemWidth[i] = $(this).outerWidth(true);
					$(this).css({
						left:itemLeft[i]
					});
				}else{
					itemLeft[i] = itemLeft[i-1]+itemWidth[i-1];
					itemWidth[i] = $(this).outerWidth(true);
					$(this).css({
						left:itemLeft[i]
					});
				}
			});
		}
		var moveL=60;		//每次移动的距离
		var moveSpeed=200;	//移动的速度
		var maxLeft = ALLITEM.parent().width()-$('#tab-btn-next').outerWidth(true) ;	//可见选项卡的最大偏移
		var miniLeft = $target.offset().left + $('#tab-btn-prev').outerWidth(true) + 3;	//可见选项卡的最小偏移
		
		/*单击tab事件*/
		hasPage.parent('.CTRLITEM').click(function(){
			$this=$(this);
			var $TAB=$this
			$('.TABPAGE:visible',$target).hide();
			$this.addClass('tab-selected').siblings().removeClass('tab-selected');
			$this.children('span').siblings('.TABPAGE').show();
			
			
			if($('#tab-btn-prev').length != 0){
				if(this.offsetLeft < miniLeft){
					var diff = $target.offset().left - this.offsetLeft + $('#tab-btn-prev').outerWidth()+1;		//点击未完全显示的tab，移动相应距离将其完全显示
					ALLSPAN.each(function(i){
						itemLeft[i] = itemLeft[i] + diff;
						$(this).animate({left:itemLeft[i]},moveSpeed,function(){});
					});
				}else if((this.offsetLeft+$(this).outerWidth(true)) > maxLeft){
					var diff = this.offsetLeft + $(this).outerWidth(true) - maxLeft -3;
					ALLSPAN.each(function(i){
						itemLeft[i] = itemLeft[i] - diff;
						$(this).animate({left:itemLeft[i]},moveSpeed,function(){});
					});
				}
			}
		});
		
		/*关闭tab事件*/
		$target.on('click','#tab-btn-close',function(){
			allItemL = 0;
			var CTRLITEM = $(this).closest('.CTRLITEM');
			if(CTRLITEM.hasClass('tab-selected')){
				CTRLITEM.siblings('.CTRLITEM').eq(0).addClass('tab-selected').children('.TABPAGE').show();		//如果关闭选中项，则自动选中第一项
			}
			$(this).closest('.CTRLITEM').remove();
			ALLTABPAGE = $('.TABPAGE',$target);	
			ALLSPAN = $('.SPANSTYLE',$target);
			/*重新排列*/
			ALLSPAN.each(function(i){
				$(this).attr('tabnum',i+1);
				allItemL += $(this).outerWidth(true);
			});
			
			if(allItemL < maxL){
				if($('#tab-btn-prev').length != 0){
					$('#tab-btn-prev').remove();
					$('#tab-btn-next').remove();
				}
			}
			/*重新设置tab的位置*/
			ALLSPAN.each(function(i){
				if((i+1) == 1){
					itemLeft[i] = $target.offset().left + ($('#tab-btn-prev').length==0)?-1:$('#tab-btn-prev').outerWidth(true)-1;
					itemWidth[i] = $(this).outerWidth(true);
					$(this).animate({left:itemLeft[i]},moveSpeed,function(){});
				}else{
					itemLeft[i] = itemLeft[i-1]+itemWidth[i-1];
					itemWidth[i] = $(this).outerWidth(true);
					$(this).animate({left:itemLeft[i]},moveSpeed,function(){});
				}
			});
		});
		
		/*按钮事件*/
		$target.on('click','#tab-btn-next',function(){
			if(itemLeft[ALLSPAN.length-1] - moveL < maxLeft){
				var diff = itemLeft[ALLSPAN.length-1] + itemWidth[ALLSPAN.length-1]-maxLeft-1;
				ALLSPAN.each(function(i){
					itemLeft[i] = itemLeft[i]- diff;
					$(this).animate({left:itemLeft[i]},moveSpeed,function(){});
				});
			}else{
				ALLSPAN.each(function(i){
					itemLeft[i] = this.offsetLeft-moveL;					
					$(this).animate({left:itemLeft[i]},moveSpeed,function(){});
				});			
			}
		});
		$target.on('click','#tab-btn-prev',function(){
			if(itemLeft[0]+itemWidth[0] + moveL > $target.offset().left){
				var diff = $target.offset().left - itemLeft[0] + $('#tab-btn-next').outerWidth(true)-1;
				ALLSPAN.each(function(i){
					itemLeft[i] = itemLeft[i] + diff;
					$(this).animate({left:itemLeft[i]},moveSpeed,function(){});
				});
			}else{
				if(ALLSPAN.eq(0).offset().left == miniLeft){
					return;
				}else{
					ALLSPAN.each(function(i){
						itemLeft[i] = this.offsetLeft+moveL;					
						$(this).animate({left:itemLeft[i]},moveSpeed,function(){
						});
					});											
				}
			}
		});
	}

})(jQuery);