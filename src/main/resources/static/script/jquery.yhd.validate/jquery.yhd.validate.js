(function($) {
	var defaults = {
		// 必填项
		// true false
		require : 'true',
		// 必填项提示
		requireTips : '这是必填字段',
		// 类型 邮箱 手机号码 电话号码 数值 字母 身份证号 等等常用的正则
		// email phone idNumber number letter
		type : '',
		// 类型提示
		typeTips : '字段类型错误',
		// 最大长度
		maxLen : '',
		// 最大长度提示
		maxLenTips : '最多输入{#maxLen}个字符',
		// 最小长度
		minLen : '',
		// 最小长度提示
		minLenTips : '最少输入{#minLen}个字符',
		// 最大值
		maxVal : '',
		// 最大值提示
		maxValTips : '最大值为{#maxVal}',
		// 最小值
		minVal : '',
		// 最小值提示
		minValTips : '最小值为{#minVal}',
		// 输入值必须和 控件id 相同
		equalTo : '',
		// 相等提示
		equalToTips : '字段输入不匹配',
		// 使用 ajax 方法调用 check.php 验证输入值。
		remoteTo : '',
		// AJAX验证提示
		remoteToTips : '字段输入错误',
		// 正则表达式验证
		regex : '',
		// 正则表达式验证提示
		regexTips : '字段格式错误',
		// 错误信息提示 显示控件id或alert(弹出框)或summary(汇总)
		tipsPos : ''
	}

	$.fn.validate = function() {
		var method = arguments[0];
		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if (typeof (method) == 'object' || !method) {
			method = methods.init;
		} else {
			$.error('Method ' + method
					+ ' does not exist on jquery.yhd.validate');
			return this;
		}
		return method.apply(this, arguments);
	};

	var methods = {
		//初始化校验信息
		init : function(options) {
			// 在每个元素上执行方法
			return this.each(function() {
				var $this = $(this);
				// 给初始化校验的元素加上标识
				$this.attr('valid', true);
				// 尝试去获取settings，如果不存在，则返回“undefined”
				var settings = $this.data('yhd.validate');
				// 如果获取settings失败，则根据options和default创建它
				if (typeof (settings) == 'undefined') {
					settings = $.extend({}, defaults, options);
					// 保存我们新创建的settings
					$this.data('yhd.validate', settings);
				} else {
					// 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
					settings = $.extend({}, settings, options);
					// 如果你想每次都保存options，可以添加下面代码：
					$this.data('yhd.validate', settings);
				}
			});
		},
		//调用单个校验信息
		valid : function(options) {
			var $this = $(this);
			var settings = $this.data('yhd.validate');
			// 检查输入内容是否符合要求
			var msg = null;
			// 判断必填项
			if (settings.require == 'true') {
				if (!$this.val()) {
					errorStyle(settings.requireTips);
					msg = settings.requireTips;
				}
			}
			// 判断类型
			if (settings.type) {
				var regex;
				switch (settings.type.toLowerCase()) {
				case 'email':
					regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					break;
				case 'phone':
					regex = /^1[35678]\d{9}$/;
					break;
				case 'idNumber':
					regex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
					break;
				case 'number':
					regex = /^\d+$/;
					break;
				case 'letter':
					regex = /^a-zA-Z$/;
					break;
				default:
					return;
				}
				if (!regex.test($this.val())) {
					errorStyle(settings.typeTips);
					msg = settings.typeTips;
				}
			}
			// 判断最大长度
			if (settings.maxLen) {
				if ($this.val().length > settings.maxLen) {
					errorStyle(settings.maxLenTips.replace('{#maxLen}',settings.maxLen));
					msg = settings.maxLenTips.replace('{#maxLen}',settings.maxLen);
				}
			}
			// 判断最小长度
			if (settings.minLen) {
				if ($this.val().length < settings.minLen) {
					errorStyle(settings.minLenTips.replace('{#minLen}',settings.minLen));
					msg = settings.minLenTips.replace('{#minLen}',settings.minLen);
				}
			}
			// 判断最大值
			if (settings.maxVal) {
				if ($this.val() > settings.maxVal) {
					errorStyle(settings.maxValTips.replace('{#maxVal}',settings.maxVal));
					msg = settings.maxValTips.replace('{#maxVal}',settings.maxVal);
				}
			}
			// 判断最小值
			if (settings.minVal) {
				if ($this.val() < settings.minVal) {
					errorStyle(settings.minValTips.replace('{#minVal}',settings.minVal));
					msg = settings.minValTips.replace('{#minVal}',settings.minVal);
				}
			}
			// 判断相等
			if (settings.equalTo) {
				if ($this.val() != $(settings.equalTo).val()) {
					errorStyle(settings.equalToTips);
					msg = settings.equalToTips;
				}
			}
			// ajax请求后端判断
			if (settings.remoteTo) {
				$.get(settings.remoteTo + '?' + $this.attr('id') + '=' + $this.val(), function(data) {
					if (!data) {
						errorStyle(settings.remoteToTips);
						msg = settings.remoteToTips;
					}
				})
			}
			// 判断正则表达式
			if (settings.regex) {
				var regex = new RegExp(settings.regex);
				if (!regex.test($this.val())) {
					errorStyle(settings.regexTips);
					msg = settings.regexTips;
				}
			}
			// msg为空的话移除错误信息
			if (!msg) {
				normalStyle();
			}
			return msg;
			// 校验失败的处理函数
			function errorStyle(msg) {
				// 给元素添加红框
				$this.addClass('validate_failed');
				// 展示错误信息
				if (settings.tipsPos.toLowerCase() == 'alert') {
					alert(msg);
					return;
				}
				$(settings.tipsPos).text(msg);
			}

			// 校验成功的处理函数
			function normalStyle() {
				// 移除元素红框样式
				$this.removeClass('validate_failed');
				// 移除错误信息
				$(settings.tipsPos).text('');
			}
		},
		//调用所有校验信息
		all : function(options){
			var msgs = [];
			//调用各个校验项的校验方法得到信息
			$("[valid=true]").each(function(){
				var msg = $(this).validate('valid');
				if(msg){
					msgs.push(msg);
				}
			})
			//展示错误信息
			if(msgs.length != 0 && options){
				if(options.toLowerCase() == 'alert'){
					alert(msgs.join('\n'));
				}else{
					$(options).html(msgs.join('<br/>'));
				}
			}
			return msgs.length == 0;
		} 
	}
})(jQuery);