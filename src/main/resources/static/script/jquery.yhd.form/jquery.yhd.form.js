(function ($) {
    var defaults = {
        url: '',
        isTrim: false,
        type: 'form',// json
        data: '',
        subRepeat:'',
        children:'children',
        success: function (msg) {
            console.log(msg)
        },
    }

    $.fn.form = function () {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jquery.yhd.form');
            return this;
        }
        return method.apply(this, arguments);
    };

    var methods = {
        init: function (options) {
            // 在每个元素上执行方法
            return this.each(function () {
                var $this = $(this);
                // 尝试去获取settings，如果不存在，则返回“undefined”
                var settings = $this.data('yhd.form');
                // 如果获取settings失败，则根据options和default创建它
                if (typeof (settings) == 'undefined') {
                    settings = $.extend({}, defaults, options);
                    // 保存我们新创建的settings
                    $this.data('yhd.form', settings);
                } else {
                    // 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
                    settings = $.extend({}, settings, options);
                    // 如果你想每次都保存options，可以添加下面代码：
                    // $this.data('pluginName', settings);
                }
            });
        },
        submit: function (options) {

            var $this = $(this);
            options = $this.data('yhd.form') ? $.extend({}, $this.data('yhd.form'), options) : $.extend({}, defaults, options);
            //将this放入临时生成表单中
            //var $thisForm = $('<form></form>').append($this.clone());
            //var $thisForm = $('<form></form>').append($this.not( $("img")).clone());
            var $thisForm = $('<form></form>');
            var inputCtrl=$("input,select，textarea",$this).clone();
            $.each(inputCtrl,function(i,e){
                $thisForm.append(e);
            });
            console.log($thisForm.html());
            $thisForm.appendTo('body');
            $thisForm.css({
                position: 'absolute',
                top: -1000,
                left: -1000
            })
            //生成临时框架接收返回数据
            var ifmname = 'ifm_' + (new Date().getTime());
            var $iframe = $('<iframe id="' + ifmname + '" name="' + ifmname + '"></iframe>').appendTo('body');
            $iframe.css({
                position: 'absolute',
                top: -1000,
                left: -1000
            });
            var files = $thisForm.find(":file");
            var bfile = false;
            files.each(function () {
                bfile = true;
                $(this).attr("name", "upfile_" + $(this).attr("name"));
            });
            if (bfile) {
                $thisForm.attr('enctype', 'multipart/form-data');
            } else {
                $thisForm.attr('enctype', 'application/x-www-form-urlencoded');
            }
            $thisForm.attr('target', ifmname);
            $thisForm.attr('method', 'post')
            $thisForm.attr('action', options.url);
            $thisForm.submit();
            
            var f = $('#' + ifmname);            
            f.on('load', function () {
                //获取iframe,即服务器返回的数据
                var resMsg = this.contentDocument.body.textContent;
            	if (resMsg.length > 0) {
                    try {
                        options.success(JSON.parse(resMsg));
                    } catch (e) {
                        options.success(resMsg);
                    }
                } else {
                    console.log("通讯异常");
                }
                //移除iframe,form
                $iframe.remove();
                $thisForm.remove();
            });
        },
        load: function (options) {
            var $this = $(this);
            options = $this.data('yhd.form') ? $.extend({}, $this.data('yhd.form'), options) : $.extend({}, defaults, options);
            if (options.url) {
                //判断isTrim是否为true,是就执行删空KEY操作
                if (options.isTrim) {
                    //判断data是否不为空
                    if (options.data) {
                        var optionsData = options.data;
                        for (var key in optionsData) {
                            //判断data中的数据是否有空值，有就删除KEY
                            if (!optionsData[key]) {
                                delete optionsData[key];
                            }
                        }
                        //替换修改过的data
                        options.data = optionsData;
                    }
                }
                //发送请求拿回数据
                $.ajax({
                    url: options.url,
                    type: 'GET',
                    dataType: 'json',
                    data: options.data,
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
                    success: function (result) {
                    	//var treeData=listToTree(value,",settings.parentField);
                        //判断是否为数组
                        if (result instanceof Array){
                            //遍历设置数据
                        	/*
	                            var temp = $this.clone();
	                            result.forEach(function (value, index) {
	                                var tempPart = temp.clone();
	                                tempPart.form('setCtrlData',value);
	                                $this.before(tempPart);
	                            });
                            $this.remove();*/
                        	
                        	var temp = $this.clone();
                        	var subtemp="";
                        	if(options.subRepeat.length>0){
                        		subtemp=$("#"+options.subRepeat).clone();
                        	}
                            result.forEach(function (value, index) {
                            	var tempPart = temp.clone(); 
                            	if(options.subRepeat.length>0){
                            		var subIdx=$("#"+options.subRepeat,tempPart);
                            		if(value[options.children]!=undefined){
	                            		value[options.children].forEach(function (val, idx) {
	                            			var subPart=subtemp.clone();
	                            			subPart.form('setCtrlData',val);
	                            			subIdx.before(subPart);
	                            		});
	                            		subIdx.remove();
                            		}
                            	}
                                tempPart.form('setCtrlData',value);
                                $this.before(tempPart);
                            });	
                            $this.remove();
                        	
                        
                        /*以下代码保留*/
                        	
                        }else {
                            //直接设置数据
                            $this.form('setCtrlData', result);
                        }
                        $.resizeWrapper();
                        options.success();
                    },
                    error: function () {
                        alert('请求 数据失败！');
                    }
                });
            }
        },

        clear: function () {
            var $this = $(this);
            $('input,select,textarea', $this).each(function () {
                if ($(this).hasClass('textbox-value')) {
                    return;
                }
                var t = this.type, tag = this.tagName.toLowerCase();
                if (t == 'text' || t == 'hidden' || t == 'password' || t == 'textarea') {
                    this.value = '';
                } else {
                    if (t == 'checkbox' || t == 'radio') {
                        this.checked = false;
                    } else {
                        if (t == 'file') {
                            var file = $(':file');
                            file.after(file.clone().val(''));
                            file.remove();
                        } else {
                            if (tag == 'select') {
                                this.selectedIndex = -1;
                                if ($(this).attr("combobox") != undefined) {
                                    $(this).combobox("clear");
                                }
                            }
                        }
                    }
                }
            })
        },
        reset: function () {
            var $this = $(this);
            $('input,select,textarea', $this).each(
                function () {
                    if ($(this).hasClass('textbox-value')) {
                        return;
                    }
                    var t = this.type, tag = this.tagName.toLowerCase();
                    if (t == 'text' || t == 'hidden' || t == 'password' || t == 'textarea') {
                        this.value = '';
                    } else {
                        if (t == 'checkbox' || t == 'radio') {
                            this.checked = false;
                        } else {
                            if (t == 'file') {
                                var file = $(':file');
                                file.after(file.clone().val(''));
                                file.remove();
                            } else {
                                if (tag == 'select') {
                                    if ($(this).attr("combobox") != undefined) {
                                        $(this).combobox("clear");
                                    }
                                    this.selectedIndex = -1;
                                }
                            }
                        }
                    }
                })
        },
        //获取元素中的所有表单数据（不包括文件）
        getCtrlData: function () {
            var $thisForm = $(this);
            //找到元素中的表单元素
            var $formInputData = $thisForm.find('input');
            var $formSpanData = $thisForm.find('span');
            var $formTextareaData = $thisForm.find('textarea');
            var $formSelectData = $thisForm.find('select');
            var json = {};
            if ($formInputData.length) {
                //遍历input数组
                $formInputData.each(function (i, item) {
                    var $item = $(item);
                    var key = $item.prop('name');
                    var type = $item.prop('type');
                    //没有name属性或类型为file则返回
                    if (!key || !type || type == 'file') return
                    //获取复选框数据到数组
                    if ($item.attr('type') == 'checkbox') {
                        if (!json[key]) {
                            json[key] = [];
                        }
                        if ($item.prop('checked')) {
                            json[key].push($item.val());
                        }
                        return;
                    }
                    //获取单选框数据
                    if ($item.attr('type') == 'radio') {
                        if ($item.prop('checked')) {
                            json[key] = $item.val();
                        }
                        return;
                    }
                    //获取其他类型数据
                    json[key] = $item.val();
                });
            }
            if ($formSpanData.length) {
                //遍历span数组
                $formSpanData.each(function (i, item) {
                    var $item = $(item);
                    var key = $item.attr('name');
                    //如果span有datavalue属性，表明是关联了数据库字段，就进行遍历
                    if (key && $item.attr('datavalue')) {
                        json[key] = $item.attr('datavalue');
                    }
                });
            }
            if ($formTextareaData.length) {
                //遍历textarea数组
                $formTextareaData.each(function (i, item) {
                    var $item = $(item);
                    var key = $item.prop('name');
                    if (key) {
                        json[key] = $item.val();
                    }
                });
            }
            if ($formSelectData.length) {
                //遍历select数组
                $formSelectData.each(function (i, item) {
                    var $item = $(item);
                    var key = $item.prop('name');
                    if (key) {
                        json[key] = $item.val();
                    }
                });
            }
            //转字符串返值
            return json;
        },
        //将json数据加载到指定元素中
        setCtrlData: function (json) {
            var $thisDom = $(this);
            //遍历json数据
            for (var key in json) {
                var value = json[key];
                //刷新下拉框数据
                var $combo = $thisDom.find('select[combobox="combo-' + key + '"]');
                if ($combo.attr("id")) {//下拉框数据绑定，需引入combobox的js
                    $combo.combobox("clear");
                    $combo.combobox("selectValue", value);
                } else {
                    var $target = $thisDom.find('[name="' + key + '"]');
                    if (!$target.length) continue;
                    $target.each(function (i, item) {
                        var $item = $(item);
                        if ($item.attr('type') == 'file'){
                            return;
                        }
                        //刷新单选框数据
                        if ($item.attr('type') == 'radio') {
                            $item.prop('checked', $item.val() == value);
                            return;
                        }
                        //刷新复选框数据
                        if ($item.attr('type') == 'checkbox') {
                            if (typeof value == 'string') {
                                $item.prop('checked', $item.val() == value);
                            } else {
                                $item.prop('checked', value.includes($item.val()));
                            }
                            return;
                        }
                        //刷新图像路径
                        if('img'.toUpperCase() == $item.prop('tagName').toUpperCase()){
                            $item.attr('src',value);
                        }
                        //刷新其他数据
                        $item.val(value);
                        $item.text(value);
                    })
                }
            }
        },
    };
})(jQuery);

//JSON提交数据的处理方法
jQuery.jsonform = function (options) {
    var defaults = {
        url: '',
        type: 'POST',// 默认post
        jsonTag: 'jsonData',
        getfields: true,//是否取字段
        fieldTag: 'field',
        success: function (msg) {
        }
    }
    var settings = $.extend({}, defaults, options);
    //将字符串转换为json
    if (typeof settings.data == 'string') {
        //将字符串数组转换成JSON数组
        var jsonData = eval(settings.data);

    } else {
        var jsonData = settings.data;
    }
    var data = settings.jsonTag + "=" + JSON.stringify(jsonData);
    if (settings.fieldTag.length > 0 && settings.getfields) {
        //字段集合
        var field = "";
        //如果是数组就遍历第一组的数据
        if (jsonData instanceof Array) {
            //遍历JSON数组的第一个对象得到所有字段
            for (var key in jsonData[0]) {
                field += key + ',';

            }
            //如果是对象就直接遍历jsonData
        } else {
            //遍历JSON得到所有字段
            for (var key in jsonData) {
                field += key + ',';
            }
        }

        //去掉最后一个,号
        field = field.substring(0, field.lastIndexOf(','));
        data += "&" + settings.fieldTag + "=" + field;
    }
    $.ajax({
        url: settings.url,//controller服务
        type: settings.type,
        dataType: 'json',
        data: data,
        success: settings.success
    });//ajax.end
};