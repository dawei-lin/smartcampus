(function($) {
	var defaults = {
		maxPopNum:5,
		isTrim:false,
		url:"",
		param:"",//相当于ajax的data
		method:"GET",
		data:"",
		textField:"text",
		valueField:"value",
		multiple:false,
	};
	
	$.fn.combobox = function() {
		var method = arguments[0];
		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if (typeof (method) == 'object' || !method) {
			method = methods.init;
		} else {
			$.error('Method ' + method+ ' does not exist on jQuery.yhd.combobox');
			return this;
		}
		return method.apply(this, arguments);
	};
	
	var methods = {
			init : function(options) {
				// 在每个元素上执行方法
				return this.each(function() {	
					var $this = $(this);
					// 尝试去获取settings，如果不存在，则返回“undefined”
					var settings = $this.data('yhd.combobox');
					// 如果获取settings失败，则根据options和default创建它
					if (typeof (settings) == 'undefined') {
						settings = $.extend({}, defaults, options);
						// 保存我们新创建的settings
						$this.data('yhd.combobox', settings);
					} else {
						// 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
						settings = $.extend({}, settings, options);
						// 如果你想每次都保存options，可以添加下面代码：
						$this.data('yhd.combobox', settings);
					}
					/*执行初始化事件，以及添加html代码*/
					initFun($this, settings);
				});
			},
			reload : function(options) {
				var $this = $(this);
				var settings = $this.data('yhd.combobox');
				settings = $.extend({}, settings, options);
				$(".select-"+$this.attr("id")).remove();
				initFun($this, settings);
				
			},
			getText : function(){
				var $this = $(this);
				var $combo = $('.combobox-textbox.select-'+$this.attr("id"));
				var $input = $combo.find('.combobox-text');
				return $input.val();
			},
			getValue : function(){
				var $this = $(this);
				var $panel = $('.combobox-textbox.select-'+$this.attr("id"));
				var $iValue = $('[type=hidden]',$panel);
				return $iValue.val();
			},
			clear: function(){
				var $this = $(this);
				var $combo = $('.combobox-textbox.select-'+$this.attr("id"));
				var $input = $('.combobox-text',$combo);
				var $iValue = $('[type=hidden]',$combo);
				var $panel = $('.combobox-panel.select-'+$this.attr("id"));
				var $selected =$panel.find('.item-selected');
				$input.val("");
				$iValue.val("");
				$selected.removeClass('item-selected');
			},
			
			selectValue: function(str){
				if(str==undefined)
					return;
				
				var $this = $(this);
				var $combo = $('.combobox-textbox.select-'+$this.attr("id"));
				var $input = $('.combobox-text',$combo);
				var $iValue = $('[type=hidden]',$combo);
				var $panel = $('.combobox-panel.select-'+$this.attr("id"));
				var $item = $panel.children();
				
				var strv=$iValue.val();
				var strt=$input.val();
				var arr=str.split(",");
				var iarr=strv.split(",");
				$.each(arr,function(i){
					if($.inArray(arr[i],iarr)==-1){
						//之前未选中
						var sitem=$("[value='"+arr[i]+"']",$panel);
						sitem.addClass('item-selected');
						if(strv.length>0){
							strv+=",";
							strt+=",";
						}
						strv+=arr[i];
						strt+=sitem.html();
					}
				});
				$input.val(strt);
				$iValue.val(strv);
				
			},
			selectText: function(str){
				if(str==undefined)
					return;
				
				var $this = $(this);
				var $combo = $('.combobox-textbox.select-'+$this.attr("id"));
				var $input = $('.combobox-text',$combo);
				var $iValue = $('[type=hidden]',$combo);
				var $panel = $('.combobox-panel.select-'+$this.attr("id"));
				var $item = $panel.children();
				
				var strv=$iValue.val();
				var strt=$input.val();
				var arr=str.split(",");
				var iarr=strt.split(",");
				$.each(arr,function(i){
					if($.inArray(arr[i],iarr)==-1){
						//之前未选中
						var sitem=$("[value='"+arr[i]+"']",$panel);
						sitem.addClass('item-selected');
						if(strv.length>0){
							strv+=",";
							strt+=",";
						}
						strt+=arr[i];
						strv+=sitem.attr("value");
					}
				});
				$input.val(strt);
				$iValue.val(strv);
			},
			unselectValue: function(str){
				if(str==undefined)
					return;
				
				var $this = $(this);
				var $combo = $('.combobox-textbox.select-'+$this.attr("id"));
				var $input = $('.combobox-text',$combo);
				var $iValue = $('[type=hidden]',$combo);
				var $panel = $('.combobox-panel.select-'+$this.attr("id"));
				var $item = $panel.children();
				
				var strv=$iValue.val();
				var strt=$input.val();
				var arr=str.split(",");
				var iarr=strv.split(",");
				strv=","+strv+",";
				strt=","+strt+",";
				$.each(arr,function(i){
					if($.inArray(arr[i],iarr)!=-1){
						//之前已选中
						var sitem=$("[value='"+arr[i]+"']",$panel);
						sitem.removeClass('item-selected');
						strv.replace(","+arr[i]+",",",");
						strt.replace(","+sitem.html()+",",",");
					}
				});				
				$input.val(strt.substring(1,strt.length-1));
				$iValue.val(strv.substring(1,strt.length-1));
			},
			unselectText: function(str){
				if(str==undefined)
					return;
				
				var $this = $(this);
				var $combo = $('.combobox-textbox.select-'+$this.attr("id"));
				var $input = $('.combobox-text',$combo);
				var $iValue = $('[type=hidden]',$combo);
				var $panel = $('.combobox-panel.select-'+$this.attr("id"));
				var $item = $panel.children();
				
				var strv=$iValue.val();
				var strt=$input.val();
				var arr=str.split(",");
				var iarr=strt.split(",");
				strv=","+strv+",";
				strt=","+strt+",";
				$.each(arr,function(i){
					if($.inArray(arr[i],iarr)!=-1){
						//之前已选中
						var sitem=$("[value='"+arr[i]+"']",$panel);
						sitem.removeClass('item-selected');
						strt.replace(","+arr[i]+",",",");
						strv.replace(","+sitem.attr("value")+",",",");
					}
				});				
				$input.val(strt.substring(1,strt.length-1));
				$iValue.val(strv.substring(1,strt.length-1));
			}
	}
	
	function initFun($target,options){
		var $parentDiv=$('<div class="combobox-selectDiv" ></div>');
		
		var innerWidth=$target.width();
		var innerHeight=$target.height();
		
		var outterWidth=$target.outerWidth();
		var outterHeight = $target.outerHeight();
		var pp=$target.css("padding");
		var mm=$target.css("margin");
		var bb=$target.css("border");
		var bg=$target.css("background");
		var ff=$target.css("font");
		var strName=$target.attr("name");
		strName=strName.replace("combo-","");
		//$target.removeAttr("name");
		$target.attr("name","combo-"+strName);
		$target.attr("combobox","combo-"+strName);
		
		var $ctbox=$('<label class="combobox-textbox  select-'+$target.attr("id")+'"></label>');
		var $comIP=$('<input type="text" class="combobox-text"/>');
		var $comIV=$('<input type="hidden" name="'+strName+'">');
		var $comDD=$('<label class="combobox-addon" style=""></label>');
		var $comDA=$('<a class="combobox-icon combobox-arrow" href="javascript:void(0)"></a>');
		$comDD.append($comDA);
		$ctbox.append($comIP).append($comIV).append($comDD);
		
		$parentDiv.css({
				'width':innerWidth,
				'height':innerHeight,
				'float':$target.css('float'),
				'border':$target.css('border'),
				'overflow':'hidden'	
		});
		if($target.css('position')=="absolute"){
			$parentDiv.css({
				'position':$target.css('position'),
				'left':$target.css('left'),
				'top':$target.css('top'),
			});
		}
		$target.wrap($parentDiv);
		
		$ctbox.css({
			'display':'block',
			'height':outterHeight,
			
		});
		$comDD.css({
			'width':innerHeight,
			'height':innerHeight
		});
		$comIP.css({
			'width':innerWidth-innerHeight,
			'height':innerHeight
		});
		$comDA.css({
			'width':innerHeight,
			'height':innerHeight
		});
		
		$target.after($ctbox);
		$target.hide();
		var panelHtml="";
		/*设置下拉框列表样式*/
		var $cpanel=$('<div class="combobox-panel  select-'+$target[0].id+'"></div>');
		$cpanel.css({
			'width':innerWidth,
			
		});
		$ctbox.after($cpanel);
		//var $input = $('input.combobox-text',$ctbox);
		$cpanel.hide();
		$cpanel.scrollTop(0);
		/*判断加载数据的方式*/
		var itemNum=0;
		var hh="";
		if(options.url != ""){
			
			//如果是字符串就转JSON
			if(typeof options.param == "string" && options.param != ""){
				options.param=eval("("+options.param+")");
			}
		
			//判断isTrim是否为true,是就执行删空KEY操作
			if(options.isTrim == true){
				//判断data是否不为空
				if(options.param!= null || options.param!=''){
					var optionsParam=options.param;
					for(var key in optionsParam){
						//判断data中的数据是否有空值，有就删除KEY
						if(optionsParam[key]==null || optionsParam[key]==''){
							delete optionsParam[key];
						}
					}
					//替换修改过的data
					options.param=optionsParam;
				}
			}
			$.ajax({
				url:options.url,
				data:options.param,
				method:options.method,
				type: "GET",
				dataType:"JSON",
				success : function(result){
					var value = options.valueField;
					var text = options.textField;
					itemNum=result.length;
					var selectid=$comIV.val();
					for(var i=0;i<itemNum;i++){
						//if(result[i]["selected"] == true){
						if(selectid==result[i][value]){
							hh+='<div style="height:'+innerHeight+'px" class="ClearAll combobox-item item-selected" value="'+result[i][value]+'">'+result[i][text]+'</div>';								
						}else{
							hh+='<div style="height:'+innerHeight+'px" class="ClearAll combobox-item" value="'+result[i][value]+'">'+result[i][text]+'</div>';						
						}
					}
					$cpanel.append(hh);
					
					addEvent($target);
					$cpanel.css({
						'height':innerHeight*Math.min(itemNum,options.maxPopNum)
					});
				},
				error : function(){
					alert('combobox 加载远程数据失败！');
				}
			});
		}else if(options.data != ""){
			var d = options.data;
			var value = options.valueField;
			var text = options.textField;
			itemNum=d.length;
			for(var i=0;i<d.length;i++){
				if(d[i]["selected"] == true){
					hh+='<div style="height:'+innerHeight+'px" class="ClearAll combobox-item item-selected" value="'+d[i][value]+'">'+d[i][text]+'</div>';
				}else{
					hh+='<div style="height:'+innerHeight+'px" class="ClearAll combobox-item" value="'+d[i][value]+'">'+d[i][text]+'</div>';					
				}
			}
			$cpanel.append(hh);

			addEvent($target);
		}else if($target.find('option').length > 0){
			var $op = $target.find('option');
			itemNum=$op.length;
			for(var i =0;i<$op.length;i++){
				if($op[i].selected == true){
					hh+='<div style="height:'+innerHeight+'px" class="ClearAll combobox-item item-selected" value="'+$op[i].value+'">'+$op[i].text+'</div>';	
				}else{
					hh+='<div style="height:'+innerHeight+'px" class="ClearAll combobox-item" value="'+$op[i].value+'">'+$op[i].text+'</div>';					
				}
			}
			$cpanel.append(hh);
			$cpanel.find(".combobox-item").css("line-height",innerHeight+'px');
			addEvent($target);
		}
		//修正弹出框的高度
		$cpanel.css({
			'height':innerHeight*Math.min(itemNum,options.maxPopNum),
		});		
		/*添加事件*/
		function addEvent($target){
			var $selected = $cpanel.find('.item-selected',$ctbox);
			if($selected.length){
				$comIP.val($selected.html());
				$comIV.val($selected.attr("value"));
			}
			var $item = $cpanel.children('.combobox-item');
			$(".combobox-arrow",$ctbox).on('click',function(){
				if($cpanel.css('display')=='none'){
					$cpanel.show();
					$item.show();
				}else{
					$cpanel.hide();
				}
			});
			//点击combobox以外的地方则隐藏选项
			$(document).click(function(e){
				var $t = $(e.target);
				if(!$t.is('.combobox-arrow') && !$t.is('.combobox-panel') && !$t.is('.combobox-text') && !$t.is('.combobox-item')){
					if($cpanel.is(':visible')){
						$cpanel.hide();
					}
				}
			});
			$item.mouseover(function(){
				$(this).addClass('item-over');
			}).mouseleave(function(){
				$(this).removeClass('item-over');
			});
			$item.click(function(){
				var itemtext = $(this).html();
				var itemval=$(this).attr("value");
				if(!options.multiple){
					$(this).siblings().removeClass('item-selected');
					$(this).addClass('item-selected');
					$cpanel.hide();
					if($(this).hasClass('item-selected')){
						$comIP.val(itemtext);	
						$comIV.val(itemval)
					}else{
						$comIP.val('');
						$comIV.val('');
					}				
				}else{
					$(this).toggleClass('item-selected');
					if($(this).hasClass('item-selected')){
						if($comIV.val() != ''){
							itemtext=","+itemtext;
							itemval=","+itemval;
						}
						$comIP.val($comIP.val()+itemtext);
						$comIV.val($comIV.val()+itemval);
					}else{
						if($comIV.val().match(','+itemval)){
							$comIV.val($comIV.val().replace(','+itemval,''));		
							$comIP.val($comIP.val().replace(','+itemtext,''));						
						}else if($comIV.val().match(itemval+',')){
							$comIV.val($comIV.val().replace(itemval+',',''));
							$comIP.val($comIP.val().replace(itemtext+',',''));
						}else{
							$comIV.val($comIV.val().replace(itemval,''));
							$comIP.val($comIP.val().replace(itemtext,''));
						}
					}
				}
			});
			
			$comIP.keyup(function(){
				var inval = $(this).val().trim();
				var invalLow = inval.toLowerCase();
				$('.item-selected').removeClass('item-selected');
				if(inval != ''){
					$item.hide();
				}else{
					$item.show();
					$('.item-selected').removeClass('item-selected');
					$cpanel.scrollTop(0);
				}
				for(var i=0;i<$item.length;i++){
					var text = $item.eq(i).text();
					var textLow = text.toLowerCase();
					if(textLow.match(invalLow)){
						$cpanel.show();
						$item.eq(i).show();
					}
					if(invalLow === textLow){
						$item.eq(i).addClass('item-selected');
					}
				}
			});
		}
	}
})(jQuery);