(function($) {
	var defaults = {
			url: "",
			textField:"",  //显示的值（例：姓名--李白）
			valueField:"",	//标签实际值（例:id--430212）
			jsonData:"",//json类型传过来的值  格式：[{textField:xxxx,valueField:xxxx},{},{}]
			type: "html",
			mulsel : false,
			
			/** *****************事件********************* */
			/* 在数据加载成功的时候触发 */
			onLoadSuccess : function(data) {},
			/* 在载入远程数据产生错误的时候触发 */
			onLoadError : function() {},
	}
	
	$.fn.listview = function() {
		var method = arguments[0];
		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if (typeof (method) == 'object' || !method) {
			method = methods.init;
		} else {
			$.error('Method ' + method + ' does not exist on jquery.yhd.datagrid');
			return this;
		}
		return method.apply(this, arguments);
	};
	
	var methods = {
			init : function(options) {
				// 在每个元素上执行方法
				this.each(function() {
					var $this = $(this);
					// 尝试去获取settings， 如果不存在，则返回“undefined"
					var settings = $this.data('yhd.listview');
					// 如果获取settings失败，则根据options和defaults创建它
					if (typeof (settings) == 'undefined') {
						settings = $.extend({}, defaults, options);
						// 保存我们所创建的settings
						$this.data('yhd.listview', settings);
					} else {
						// 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
						settings = $.extend({}, settings, options);
						// 如果你想每次都保存options，可以添加下面代码：
						$this.data('yhd.listview', settings);
					}
					initFun($this, settings);
					
				});
			},
			
			
			//重新加载
			reload : function(options) {
				var $this = $(this);
				var settings = $this.data('yhd.listview');
				settings = $.extend({}, settings, options);
				initFun($this, settings);
			},
			
			
			//获得单选值，返回json
			getSelected : function(options) {
				var $this = $(this);
				var settings = $this.data('yhd.listview');
				settings = $.extend({}, settings, options);

				var result = {};
				var $listChildren = $('div.listrow-selected',$this).slice(0,1);
				if($listChildren.length!=0){
					var $span = $listChildren.find('span');
					result[settings.valueField] = $span.attr("value");
				}

				var boo = false;
				for ( var key in result) {

					boo = true;
				}
				
				if (boo) {
					return result;
				} else {
					return null;
				}
			},
			
			//获得多选值，返回json数组
			getSelections: function(options){
				var $this = $(this);
				var settings = $this.data('yhd.listview');
				settings = $.extend({}, settings, options);
				var result = new Array();
				var $listChildren = $('div.listrow-selected',$this);
				if($listChildren.length){
					var r={};
					$listChildren.each(function(i){
						var $span=$listChildren.find('span');
						r[settings.valueField] = $span.attr("value");
						result.push(r);
					});
					
				}
				console.log(result);
				if (result.length) {
					return result;
				} else {
					return null;
				}
			},
			//清除所有
			clear: function(){
				clearAll();
			}
	}
	
	
	function initFun($target, options) {
		
		//判断方法类型
		if(options.type == "html"){
			htmlHtml($target,options);	
		}else if(options.type == "json"){
			/* 重新加载时清空所有动态添加的内容或选中的行 */
			$target.children().remove();
			jsonHtml($target,options);
		}else if(options.type == "ajax"){
			/* 重新加载时清空所有动态添加的内容或选中的行 */
			$target.children().remove();
			ajaxHtml($target,options);
		}
		
	}
	
	//html数据的处理方法
	function htmlHtml($target, options){
		var settings = $target.data('yhd.listview');
		settings = $.extend({}, settings, options);
		//传过来的HTML
		var html=$target.children('.ANYROW_1');
		//需要添加的样式
		//var style=settings.style;
		
		var $html=$(html);
		$html.each(function(i){
		var $this=$(this);
		$this.addClass("listChildren");
		})
		$target.append($html);
		doEvent($target, options);
	}
	
	//json数据的处理方法
	function jsonHtml($target,options){
		var settings = $target.data('yhd.listview');
		settings = $.extend({}, settings, options);
		var html="";
		var jsonData=settings.jsonData;
		
		var fatherName=$target.attr("id");

		var Num0=1;
		for(var i=0;i<jsonData.length;i++){
			
			html+="<div class=\"ClearAll listChildren ANYROW_1 ABSROW-"+Num0+"_1\" style=\"\"><span id=\""+fatherName;
				
				if(Num0>10){
					var str=String(Num0-1);
					var arr=str.split("");
					for(var j=0;j<arr.length;j++){
						html+="_"+arr[j]+"\" name=\""+fatherName+"_"+arr[j];
					}
					
				}else{
					var str=String(Num0-1);
					html+="_0_"+str+"\" name=\""+fatherName+"_0_"+str;
				}
				html+="\" value=\""+jsonData[i].valueField+"\" >"+jsonData[i].textField+"</span><div class=\"ClearAll\"></div></div>";
				Num0++;
				
		}
		$target.append(html);
		doEvent($target, options);
		
	}
	
	//ajax数据的处理方法
	function ajaxHtml($target, options){
		//如果是字符串就转JSON
		if(typeof options.data == "string" && options.data != ""){
			alert(options.data);
			options.data=eval('('+options.data+')');
			alert(options.data);
		}
		
		$.ajax({
			url:options.url,
			type:"GET",
			dataType : "json",
			success : function(result) {
				var settings = $target.data('yhd.listview');
				settings = $.extend({}, settings, options);
				var html="";
				var valueField=settings.valueField;
				var textField=settings.textField;
				var fatherName=$target.attr("id");
				if(result.length>0){
					var Num0=1;
					for(var i=0;i<result.length;i++){
						html+="<div class=\"ClearAll listChildren ANYROW_1 ABSROW-"+Num0+"_1\" style=\"\"><span id=\""+fatherName;
							
							if(Num0>10){
								var str=String(Num0-1);
								var arr=str.split("");
								for(var j=0;j<arr.length;j++){
									html+="_"+arr[j]+"\" name=\""+fatherName+"_"+arr[j];
								}
								
							}else{
								var str=String(Num0-1);
								html+="_0_"+str+"\" name=\""+fatherName+"_0_"+str;
							}
							
							html+="\" value=\""+result[i][valueField]+"\" >"+result[i][textField]+"</span><div class=\"ClearAll\"></div></div>";
							Num0++;
					}
					
					$target.append(html);
					doEvent($target, options);
				}else{
					//没有数据
				}
				
			}
			
		})
	}
	
	//勾选之类的事件
	function doEvent($target,options){
		var $listChildren = $target.find('.listChildren');
		/* 选择事件 */
		$($listChildren).each(function(index) {
				//鼠标悬停
				$(this).mouseover(function() {
					$(this).addClass('listrow-over');
				});
				//鼠标移除
				$(this).mouseout(function() {
					$(this).removeClass('listrow-over');
				});
				//点击行，选择与取消选择
				$(this).click(function(){
					var selected=false;
					selected=$(this).hasClass('listrow-selected');
					if(selected){
						$(this).removeClass('listrow-selected');
					}else{
						$(this).addClass('listrow-selected');
					}
					
				});
				



			

		});
	}
	
	/* 清空选中和勾选 */
	function clearAll() {
		var $list = $('.listChildren').parent();
		$list.find('.listrow-selected').removeClass('listrow-selected');
	}
	

	
})(jQuery)