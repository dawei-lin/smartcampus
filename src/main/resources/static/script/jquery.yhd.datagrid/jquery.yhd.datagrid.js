/*saveEdit方法中的异步保存到数据库尚未完成*/
(function($) {
	var defaults = {
		url : "",
		data:"",
		isTrim:false,
		pageSize : 10,
		currentPage : 1,
		totalPage : null,
		checkbox : true,
		rownumber : true,
		pagination : true,
		checkOnSelect : false,
		scrollbar : false,
		borderStyle : {},
		tdtext : {},
		
		columns : [
		/*
		 * {title:'',field:'<input datavalue="user.username" id="ss" name="ss" />'}
		 * 
		 * 
		 * { field:'id',title:'id',hidden:true,type:'static' }, {
		 * field:'uid',title:'uid',hidden:true,type:'button' }, {
		 * field:'roomname',title:'课室名称',width:100,align:'center' }, {
		 * field:'roomplace',title:'课室地点',width:100,align:'center' }, {
		 * field:'roomfun',title:'课室功能',width:100,align:'center' }, {
		 * field:'contents',title:'容纳人数',width:100,align:'center' },
		 * {field:'',title:'容纳人数',width:100,align:'center',type:'mul',formatHandle=''}
		 */
		],

		/** *****************事件********************* */
		/* 在数据加载成功的时候触发 */
		onLoadSuccess : function(data) {
			$('table select').combobox({multiple:false});
			$('table checkbox').checkboxOrRadio();
		},
		/* 在载入远程数据产生错误的时候触发 */
		onLoadError : function() {},
	}

	$.fn.datagrid = function() {
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
				var settings = $this.data('yhd.datagrid');
				// 如果获取settings失败，则根据options和defaults创建它
				if (typeof (settings) == 'undefined') {
					settings = $.extend({}, defaults, options);
					// 保存我们所创建的settings
					$this.data('yhd.datagrid', settings);
				} else {
					// 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
					settings = $.extend({}, settings, options);
					// 如果你想每次都保存options，可以添加下面代码：
					$this.data('yhd.datagrid', settings);
				}
				initFun($this, settings);
			});
		},

		reload : function(options) {
			var $this = $(this);
			var settings = $this.data('yhd.datagrid');
			settings = $.extend({}, settings, options);
			initFun($this, settings);
		},
		
		//复选，返回数组
		getChecked : function(options) {	
			var $this = $(this);
			var settings = $this.data('yhd.datagrid');
			settings = $.extend({}, settings, options);
			var $tr = $('tr.BODY input:checked', $this).parent().parent();
			var result = new Array();
			if (settings.checkbox) {
				if ($tr.length) {		
					$tr.each(function(i) {
						var $datavalue = $tr.find('td [datavalue]');
						var r = {};
						$datavalue.each(function(){
							var tagName=$(this).prop('tagName');
							if(tagName == "INPUT" || tagName == "TEXTAREA" || tagName == "SELECT"){
								r[$(this).attr("datavalue")] = $(this).val();
							}else{
								r[$(this).attr("datavalue")] = $(this).html();
							}
						});			
						//如果携带了clazz，就给每一个json带一个clazz	
						if(settings.clazz != undefined ){
							if(settings.clazz != null || settings.clazz != ''){
								r['clazz']=settings.clazz;
							}
						}
						//将JSON对象push到数组
						result.push(r);
					});
				}
			}
			if (result.length) {
				return result;
			} else {
				return null;
			}
		},

		//单选，返回JSON对象
		getSelected : function(options) {
			var $this = $(this);
			var settings = $this.data('yhd.datagrid');
			settings = $.extend({}, settings, options);
			var result = {};
			var $tr = $('tr.row-selected', $this).slice(0, 1);
			
			if ($tr.length != 0) {
				var $datavalue = $tr.find('td [datavalue]');
				var tagName;
				$datavalue.each(function(){
					tagName=$(this).prop('tagName');
					if(tagName == "INPUT" || tagName == "TEXTAREA" || tagName == "SELECT"){
						result[$(this).attr("datavalue")] = $(this).val();
					}else{
						result[$(this).attr("datavalue")] = $(this).html();
					}
					
				});
				//如何有clazz就添加
				if(settings.clazz != undefined ){
					if(settings.clazz != null || settings.clazz != ''){
						result['clazz']=settings.clazz;
					}
				}
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
		//复选，返回数组
		getSelections : function(options) {
			var $this = $(this);
			var settings = $this.data('yhd.datagrid');
			settings = $.extend({}, settings, options);
			var $tr = $('tr.row-selected', $this);
			var result = new Array();
			if ($tr.length) {
				$tr.each(function(i) {
					var $datavalue = $tr.find('td [datavalue]');
					var r = {};
					$datavalue.each(function(){
						if(tagName == "INPUT" || tagName == "TEXTAREA" || tagName == "SELECT"){
							result[$(this).attr("datavalue")] = $(this).val();
						}else{
							result[$(this).attr("datavalue")] = $(this).html();
						}
					});
					result.push(r);
					
					//如何有clazz就添加
					if(settings.clazz != undefined ){
						if(settings.clazz != null || settings.clazz != ''){
							result['clazz']=settings.clazz;
						}
					}
					
				});
			}
			if (result.length) {
				return result;
			} else {
				return null;
			}
		},
		
		clear : function() {
			clearAll();
		},
		
		

		beginEdit : function(options) {
			var $this = $(this);
			var settings = $this.data('yhd.datagrid');
			settings = $.extend({}, settings, options);
			var $tr = $this.find('tr.row-selected');
			var $td = $tr.find('td.ANYCOL_1');
			var $span = $tr.find('span');
			if ($span.length) {
				$td.each(function(index) {
					var inputObj = $('<input class="edited" type="text">');
					var tdObj = $(this);
					settings.tdtext[index] = tdObj.text();
					/* 设置文本框的样式 */
					inputObj.css("border-width", "1").css("padding", "0").css(
							"margin", "0");
					inputObj.css("background-color", "white");
					inputObj.css("font-size", tdObj.css("font-size"));
					inputObj.width(tdObj.width() - 3);
					inputObj.height(tdObj.height() - 4);
					inputObj.val(tdObj.text().replace(/[(^\s*)|(\s*$)]/g, ""));
					/* 插入文本框 */
					tdObj.text("");
					inputObj.appendTo(tdObj);
				});
			} else {
				return;
			}
		},

		saveEdit : function(options) {
			var $this = $(this);
			var settings = $this.data('yhd.datagrid');
			settings = $.extend({}, settings, options);
			var $input = $this.find('input.edited');
			if ($input.length) {
				$input.each(function(index) {
					var inputObj = $(this);
					var tdObj = inputObj.parent();
					var tdSpan = '<span>' + inputObj.val() + '</span>'
							+ '<div class="ClearAll"></div>';
					$(tdSpan).appendTo(tdObj);
					$(inputObj).remove();
				});
				$.ajax({
					url : options.url,
					type : "POST",
					dataType : "json",
					xhrFields: {withCredentials: true},
					crossDomain: true,
					success : function(result) {
						console.log(result);
					},
					error : function() {
						alert('更新数据失败！');
					}
				});
			} else {
				return;
			}
		},

		test : function(options) {
			var $this = $(this);
			var settings = $this.data('yhd.datagrid');
			settings = $.extend({}, settings, options);
			var col = settings.columns;
			console.log(col[0].field);
		}

	}
	
	
	/*function formatHandle(str){
		
		return str;
		
	}*/
	
	function initFun($target, options) {
		
		$target.find('table').parent('div').addClass("TABLECARD");
		/* 重新加载时清空所有动态添加的内容或选中的行 */
		$('.newTool').remove();
		$('.PAGER').children().remove();
		if (options.url != "") {
			
			ajaxHtml($target, options);
		} else {
			doEvent($target, options);
		}
		
		
	}

	function ajaxHtml($target, options) {
		$target.find('table').children().remove();
		//var jsonData={string:options.data};
		//如果是字符串就转JSON
		if(typeof options.data == "string" && options.data != ""){
			var dataa=options.data;
			options.data=eval('('+options.data+')');
		}
		
		//判断isTrim是否为true,是就执行删空KEY操作
		if(options.isTrim == true){
			//判断data是否不为空
			if(options.data!= null || options.data!=''){
				var optionsData=options.data;
				for(var key in optionsData){
					//判断data中的数据是否有空值，有就删除KEY
					if(optionsData[key]==null || optionsData[key]==''){
						delete optionsData[key];
					}
				}
				//替换修改过的data
				options.data=optionsData;
			}
		}
		$.ajax({
			url : options.url,
			type : "GET",
			//data:jsonData,
			data:options.data,
			dataType : "json",
			xhrFields: {withCredentials: true},
			crossDomain: true,
			success : function(result) {
				$target.find('table').children().remove();
				//$target.find('table').children().off();
				var settings = $target.data('yhd.datagrid');
				settings = $.extend({}, settings, options);
				var $table = $target.find('table');
				var col = settings.columns;
				var colnum = col.length;
				var titleHtml = '<thead><tr class="ClearAll TITLE ANYROW_1 ABSROW-1_1">';
				var bodyHtml = '<tbody>';
				/* 插入title html */
				var Num0 = 1;
				for (var i = 0; i < colnum; i++) {
					if (col[i].hidden == true) {
						titleHtml += '<td style="display:none;">'+col[i].title+'<div class="ClearAll"></div></td>';
						//continue;
					}
					else{
						titleHtml += '<td class="ANYCOL_1 ABSCOL-1-'+Num0+'_1" style="width:'+col[i].width+'px;">'+col[i].title+'<div class="ClearAll"></div></td>';
					}					
					Num0++;
				}
				titleHtml += '</tr></thead>';
				$(titleHtml).appendTo($table);
				/* 插入body html */
				var Num1 = 1;
				for (var j = 0; j < result.length; j++) {
					//如果是双数，就添加样式有颜色的TR样式，隔行效果
					if(Num1%2!=0){
						bodyHtml += '<tr class="ClearAll BODY WHITETR ANYROW_1 ABSROW-2_'+ Num1 + '">';;
					}else{
						bodyHtml += '<tr class="ClearAll BODY COLORTR ANYROW_1 ABSROW-2_'+ Num1 + '">';
					}
					
					Num1++;
					var Num2 = 1;
					
					for (var i = 0; i < colnum; i++) {

						//取出field
						var field=$(col[i].field);
						var fieldlist=$(field);
						if (col[i].hidden == true) {
							bodyHtml += '<td style="display:none;">';
						}
						else{
							bodyHtml += '<td class="ANYCOL_1 LINETD ABSCOL-2-'+Num2+'_1">';
						}

						for(z=0;z<fieldlist.length;z++){
									var str1;
								//如果datavalue的值不为undefined
								if($(fieldlist[z]).attr('datavalue') != undefined){
										
										//找到field中的datavalue
										var datavalue=$(fieldlist[z]).attr('datavalue');
										var tagName=$(fieldlist[z]).prop('tagName');
										
										if(tagName == "INPUT"){
											//作为变量进行操作
											var o=$(fieldlist[z]);
											o.attr('value',result[j][datavalue]);
											
											//取HTML字符串
											str1=o.prop("outerHTML");
										}else if(tagName == "TEXTAREA"){
											//作为变量进行操作
											var o=$(fieldlist[z]);
											o.attr('value',result[j][datavalue]);
											str1=o.prop("outerHTML");
										}else if(tagName == "SELECT"){
											//作为变量进行操作
											var o=$(fieldlist[z]);
											o.attr('value',result[j][datavalue]);
											o.html(result[j][datavalue]);
											str1=o.prop("outerHTML");
										}else{
											//作为变量进行操作
											var o=$(fieldlist[z]);
											o.html(result[j][datavalue]);
											str1=o.prop("outerHTML");
										}
									
									bodyHtml += str1;
									//bodyHtml += '<div class="ClearAll1"></div>'
								}else{
									var o =$(fieldlist[z]);
									str1=o.prop("outerHTML");
									bodyHtml += str1;
									//bodyHtml += '<div class="ClearAll2"></div>';
								}
							}
						bodyHtml += '<div class="ClearAll"></div>';
						bodyHtml += '</td>'
						Num2++;
					}
					bodyHtml += '</tr>';
				}
				bodyHtml += '</tbody>';
				$(bodyHtml).appendTo($table);

				/* 设置样式 */
				for (var i = 0; i < colnum; i++) {
					
					if (col[i].hidden == true) {
						continue;
					}
					
					//----------------------
					
					//取出field
					var field=$(col[i].field);
					var fieldlist=$(field);
					for(var j=0;j<fieldlist.length;j++){
						var datavalue=$(fieldlist[j]).attr('datavalue');
						var width=$(fieldlist[j]).attr('width');
						var height=$(fieldlist[j]).attr('height');
						var align=$(fieldlist[j]).attr('align');
						
						if (col[i].width != undefined) {
							$table.find('[datavalue=' + datavalue + ']').css('width', width);
						}
						if (col[i].height != undefined) {
							$table.find('[datavalue=' + datavalue + ']').css('height', height);
						}
						if (col[i].align != undefined) {
							$table.find('[datavalue=' + datavalue + ']').css('text-align', align);
						}
					}
					
					//------------------------
					
					
					
//					if (col[i].width != undefined) {
//						$table.find('[datavalue=' + col[i].field + ']').css('width', col[i].width);
//					}
//					if (col[i].height != undefined) {
//						$table.find('[datavalue=' + col[i].field + ']').css('height', col[i].height);
//					}
//					if (col[i].align != undefined) {
//						$table.find('[datavalue=' + col[i].field + ']').css('text-align', col[i].align);
//					}
					
					
				}
				
				doEvent($target, options);
				if (options.onLoadSuccess != undefined) {
					options.onLoadSuccess(result);
				}

			},
			error : function() {
				alert('加载数据失败！');
				if (options.onLoadError != undefined) {
					options.onLoadError();
				}
			}
		});
	}
	

	function doEvent($target, options) {
		/* 刷新页面时，去除动态添加的内容 */
		$('td.rownum', $target).remove();
		$('td.CHECKBOX_1', $target).remove();

		$target.find('tr.BODY').each(function(index) {
			$(this).attr('rowindex', index + 1);
		});

		$('tbody', $target).addClass('ALLBODY');

		// /*动态增加工具栏*/
		// var toolHtml = '<div class="newTool">';
		//		
		// var COSHtml ='<span >CheckOnSelect:</span>'+
		// '<input class="COS" type="checkbox" checked>';
		// var selectHtml = '<span class="mode">SelectMode:</span>' +
		// '<select class="selectMode" style="width:60px;"><option
		// value="0">单选</option><option value="1">多选</option></select></div>';
		//		
		// toolHtml += COSHtml + selectHtml;
		// $target.find('div.TOOLBAR',$target).append(toolHtml);

		/* 加入序号列和复选框列 */
		var titleHtml;
		if (options.rownumber == true) {
			titleHtml += '<td class="rownum"></td><div class="ClearAll"></div>';
		}
		if (options.checkbox == true) {
			titleHtml += '<td class="CHECKBOX_1"><input type="checkbox">'
					+ '<div class="ClearAll"></div></td>';
		}
		$('tr.TITLE', $target).prepend(titleHtml);

		$('tr.BODY', $target).each(function(i) {
			var bodyHtml = "";
			if (options.rownumber == true) {
				bodyHtml += '<td class="rownum">' + (i + 1)+ '</td><div class="ClearAll"></div>';
			}
			if (options.checkbox == true) {
				bodyHtml += '<td class="CHECKBOX_1"><input type="checkbox"><div class="ClearAll"></div></td>';
			}
			$(this).prepend(bodyHtml);
		});

		/* 是否设置分页 */
		if (options.pagination) {
			var start = (options.currentPage - 1) * parseInt(options.pageSize);
			var end = start + parseInt(options.pageSize);
			$('tr.BODY').hide();
			$('tr.BODY').slice(start, end).show();
			paginations($target, options);
		}
		/* 设置table样式 */
		// var tH = $target.outerHeight() - $('.TOOLBAR',$target).outerHeight()
		// - $('.PAGER',$target).outerHeight();
		// var dW = $target.outerWidth();
		// $('table:eq(0)',$target).parent().css('height',tH);

		var keyArr = [];
		var valueArr = [];

		// 可控制table和td的样式
		// for(var key in options.borderStyle){
		// if(key == 'table'){
		// keyArr.push(key+':eq(0)');
		// }else{
		// keyArr.push(key);
		// }
		// valueArr.push(options.borderStyle[key]);
		// }
		// for(var i=0;i<keyArr.length;i++){
		// var $t = $(keyArr[i],$target);
		// for(var key in valueArr[i]){
		// $t.css(key,valueArr[i][key]);
		// }
		// }

		/* 只控制td的样式 */
		var $td = $('table:eq(0) td', $target);

		if (typeof (options.borderStyle) == 'object') {
			for ( var key in options.borderStyle) {
				keyArr.push(key);
				valueArr.push(options.borderStyle[key]);
			}
			for (var i = 0; i < keyArr.length; i++) {
				$td.css(keyArr[i], valueArr[i]);
			}
		} else {
			$.error('The borderStyle that you entered is not correct!');
		}

		/* 可否使用滚动条 */
		if (options.scrollbar) {
			$('table:eq(0)', $target).parent().css('overflow-y', 'auto');
		}
		/* 选择事件 */
		$target.each(function(index) {
			var $BODY = $(this).find('tr.BODY');
			$BODY.each(function() {
				$(this).mouseover(function() {
					$(this).addClass('row-over');
				});

				$(this).mouseout(function() {
					$(this).removeClass('row-over');
				});

			});

			$('input.COS').on('change', function() {
				options.checkOnSelect = $(this).prop('checked');
				clearAll();
			});

			/* 选择行或取消选择行 */
			$BODY.click(function() {
				var selectMode;
				if (typeof ($target.find('.selectMode')[0]) != 'undefined') {
					selectMode = $target.find('.selectMode')[0].value;
				} else {
					selectMode = '0';
				}
				var $ck = $(this).find('.CHECKBOX_1 input[type=checkbox]');
				var $thisrow = $(this);
				if (selectMode == '0') {
					if (options.checkOnSelect) {
						clearSelections($thisrow);
						clearChecked($thisrow);
					} else {
						clearSelections($thisrow);
					}
					if (options.checkOnSelect) {
							selectRow($thisrow);
							checkRow($thisrow);
					} else {
							selectRow($thisrow);
					}
				} else if (selectMode == '1') {
					if (!$thisrow.hasClass('row-selected')) {
						if (options.checkOnSelect) {
							selectRow($thisrow);
							checkRow($thisrow);
						} else {
							selectRow($thisrow);
						}
					}
				}
			});
			/* 判断全选框自动选中或取消选中 */
			$BODY.click(function() {
				var $BODYvisible = $('tr.BODY:visible');
				var bodyLength = $BODYvisible.length;
				var checkedLength = $BODYvisible.find('input:checked').length;
				if (checkedLength == bodyLength) {
					$('tr.TITLE').find('[type=checkbox]').prop('checked', true);
				} else {
					$('tr.TITLE').find('[type=checkbox]').prop('checked', false);
				}
			});

		});

		/* 全选 */
		$target.on('click','tr.TITLE',function(event) {
			var selectMode = typeof ($target.find('.selectMode')[0]) != 'undefined' ? $target.find('.selectMode')[0].value: '0';
			var $BODYvisible = $target.find('tr.BODY:visible');
			if (selectMode == '0') {
				if ($(this).find('[type=checkbox]').prop('checked') == true) {
					checkRow($BODYvisible);
				} else {
					unselectRow($BODYvisible);
					uncheckRow($BODYvisible);
				}
			} else if (selectMode == '1') {
				if ($(this).find('[type=checkbox]').prop('checked') == true) {
					selectRow($BODYvisible);
					checkRow($BODYvisible);
				} else {
					unselectRow($BODYvisible);
					uncheckRow($BODYvisible);
				}
			}
		});
		/* 当选择模式改变时清空所有选择 */
		$target.on('change', '.selectMode', function() {
			clearAll();
		});

		/* 点击按钮跳页 */
		$target.on('click', 'a.pn', function() {
			var $btn = $(this);
			var $tr = $('tr');
			var $BODY = $('tr.BODY');
			var total = $target.find('tr.BODY').length;
			var pageSize = parseInt(options.pageSize);
			var totalPage = Math.ceil(total / pageSize);
			if ($btn.hasClass('pn-prev')) {
				if (options.currentPage > 1) {
					options.currentPage--;
					showPage($BODY, options);
				}
			} else if ($btn.hasClass('pn-next')) {
				if (options.currentPage < totalPage) {
					options.currentPage++;
					showPage($BODY, options);
				}
			} else if ($btn.hasClass('pn-first')) {
				if (options.currentPage > 1) {
					options.currentPage = 1;
					showPage($BODY, options);
				}
			} else if ($btn.hasClass('pn-last')) {
				if (options.currentPage < totalPage) {
					options.currentPage = totalPage;
					showPage($BODY, options);
				}
			}
			$target.data('yhd.datagrid', options);
			paginations($target, options);
		});

		/* 通过输入页码跳页 */
		$(document).keydown(function(e) {
			if (e.keyCode == '13') {
				var $BODY = $('tr.BODY');
				var $input = $('input#cPage');
				var inputval = $input.val();
				var total = $target.find('tr.BODY').length;
				var pageSize = parseInt(options.pageSize);
				var totalPage = Math.ceil(total / pageSize);
				if (totalPage > 0) {
					if (inputval > 0 && inputval <= totalPage) {
						options.currentPage = inputval;
						showPage($BODY, options);
					} else if (inputval <= 0) {
						options.currentPage = 1;
						showPage($BODY, options);
					} else if (inputval > totalPage) {
						options.currentPage = totalPage;
						showPage($BODY, options);
					}
					$target.data('yhd.datagrid', options);
					paginations($target, options);

				} else {
					return;
				}
			} else {
				return;
			}
		});

		/* 选择每页显示数据个数 */
		$target.on('change', '.selectSize', function() {
			options.pageSize = this.value;
			var $BODY = $target.find('tr.BODY');
			var total = $BODY.length;
			var pageSize = parseInt(options.pageSize);
			var totalPage = Math.ceil(total / pageSize);
			if (options.currentPage <= totalPage) {
				showPage($BODY, options);
			} else if (options.currentPage > totalPage) {
				options.currentPage = totalPage;
				showPage($BODY, options);
			}
			$target.data('yhd.datagrid', options);
			paginations($target, options);
		});
	}
	/* 选中行 */
	function selectRow($target) {
		$target.addClass('row-selected');
	}
	/* 取消选中行 */
	function unselectRow($target) {
		$target.removeClass('row-selected');
	}
	/* 清空所有选中 */
	function clearSelections($target) {
		$target.siblings().removeClass('row-selected');
	}
	/* 勾选行 */
	function checkRow($target) {
		$target.find('.CHECKBOX_1 input[type=checkbox]').prop('checked', true);
	}
	/* 取消勾选行 */
	function uncheckRow($target) {
		$target.find('.CHECKBOX_1 input[type=checkbox]').prop('checked', false);
	}
	/* 清空所有勾选 */
	function clearChecked($target) {
		$target.siblings().find('input:checked').prop('checked', false);
	}
	/* 清空选中和勾选 */
	function clearAll() {
		var $table = $('table');
		$table.find('.row-selected').removeClass('row-selected');
		$table.find('input:checked').prop('checked', false);
	}

	/* 分页显示 */
	function showPage($target, options) {
		var settings = $target.data('yhd.datagrid');
		settings = $.extend({}, settings, options);
		if (settings.pagination) {
			var start = (settings.currentPage - 1)* parseInt(settings.pageSize);
			var end = start + parseInt(settings.pageSize);
			$target.hide();
			$target.slice(start, end).show();
			clearAll();
			$target.closest('div').scrollTop(0);
		}
	}

	/* 固定标题，未完成 */
	function fixedTitle($target) {
		$('table:eq(0) .blank').remove();
		$('tr.TITLE', $target).css({
			position : 'fixed',
			top : $('table:eq(0)').position().top - 1,
			left : $('table:eq(0)').position().left + 1
		});
		var th = $('table:eq(0) tr.BODY td.ANYCOL_1:visible', $target).height();

		$('table:eq(0) thead', $target).append('<tr class="ClearAll blank"></tr>');
		// $('table:eq(0) thead',$target).css({'height':$('tr.TITLE
		// td',$target).height()});
		$('.blank', $target).css({
			'height' : $('tr.TITLE td', $target).height()
		});
		var bodytd = $('tr.BODY:eq(0) td.ANYCOL_1', $target);
		$('tr.TITLE td.ANYCOL_1', $target).each(function(index) {
			$(this).css('width', $(bodytd[index]).width() - 2);
		});
	}

	/* 分页 */
	function paginations($target, options) {
		$('.PAGER').children().remove();

		var settings = $target.data('yhd.datagrid');
		settings = $.extend({}, settings, options);
		var total = $target.find('tr.BODY').length;
		var pageSize = parseInt(options.pageSize);
		var totalPage = Math.ceil(total / pageSize);
		options.totalPage = totalPage;

		var html = '<table cellspacing="0" cellpadding="0" border="0" style="height:25px;">';
		var turnPageHtml = '';
		var pnumHtml = '<tr class="p-num">';
		pnumHtml += '<td ><select style="width:45px;" class="selectSize" name="xx">';
		switch (pageSize) {
		case 10:
			pnumHtml += '<option value="10" selected="selected">10</option><option value="20">20</option><option value="30">30</option><option value="50">50</option></select></td>';
			break;
		case 20:
			pnumHtml += '<option value="10">10</option><option value="20" selected="selected">20</option><option value="30">30</option><option value="50">50</option></select></td>';
			break;
		case 30:
			pnumHtml += '<option value="10">10</option><option value="20">20</option><option value="30" selected="selected">30</option><option value="50">50</option></select></td>';
			break;
		case 50:
			pnumHtml += '<option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="50" selected="selected">50</option></select></td>';
			break;
		default:
			pnumHtml += '<option value="10" selected="selected">10</option><option value="20">20</option><option value="30">30</option><option value="50">50</option></select></td>';
		}

		if (options.currentPage == 1 || options.currentPage == 0) {
			pnumHtml += '<td><a class="pn-first pn" style="disabled:true;"><span class="pn-icon icon-first" style=""></span></a></td>';
			pnumHtml += '<td><a class="pn-prev pn" style="disabled:true;"><span class="pn-icon icon-prev" style=""></span></a></td>';
		} else {
			pnumHtml += '<td><a class="pn-first pn"><span class="pn-icon icon-first" style=""></span></a></td>';
			pnumHtml += '<td><a class="pn-prev pn"><span class="pn-icon icon-prev" style=""></span></a></td>';
		}
		if (totalPage == 0) {
			pnumHtml += '<td><strong>0/0</strong></td>';
		} else {
			pnumHtml += '<td><strong style="vertical-align:middle;"><input id="cPage" value="'
					+ options.currentPage
					+ '"> of   '
					+ totalPage
					+ ' </strong></td>';
		}

		if (options.currentPage == totalPage) {
			pnumHtml += '<td><a class="pn-next pn" style="disabled:true;"><span class="pn-icon icon-next" style=""></span></a></td>';
			pnumHtml += '<td><a class="pn-last pn" style="disabled:true;"><span class="pn-icon icon-last" style=""></span></a></td>';
		} else {
			pnumHtml += '<td><a class="pn-next pn"><span class="pn-icon icon-next" style=""></span></a></td>';
			pnumHtml += '<td><a class="pn-last pn"><span class="pn-icon icon-last" style=""></span></a></td>';
		}

		var firstRowNum = (settings.currentPage - 1)
				* parseInt(settings.pageSize) + 1;
		var lastRowNum = (firstRowNum - 1) + parseInt(settings.pageSize);
		if (typeof (firstRowNum) == 'undefined'
				&& typeof (lastRowNum) == 'undefined') {
			firstRowNum = 0;
			lastRowNum = 0;
		}
		if (lastRowNum > total) {
			lastRowNum = total;
		}
		if (total == 0) {
			firstRowNum = lastRowNum = 0;
		}
		var pcountHtml = '<td style="width:auto;">' + '<strong>当前显示第</strong>'
				+ firstRowNum + '<strong>条至第</strong>' + lastRowNum
				+ '<strong>条,总共</strong>' + total
				+ '<strong>条</strong></td></tr>' + '</table>';

		turnPageHtml += pnumHtml + pcountHtml;
		html += turnPageHtml;
		$('.PAGER', $target).append(html);
	}
	
	
})(jQuery);