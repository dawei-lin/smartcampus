//checkbox和radio
(function($){   
	//缺省配置
   var defaults = {
		type:"html",
		url:"",
		textField:'text',//要查询的字段名
		valueField:'value',//通过url返回的字段值
	};  
	
	$.fn.checkboxOrRadio = function(method){
		 if ( methods[method] ) {
		     //如果已经选用方法就直接返回方法集中的指定方法
		     return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		   } else if ( typeof method === 'object' || ! method ) {
		   		//未填写方法则启用初始化方法
		        return methods.init.apply( this, arguments );
		      } else {
		           $.error( 'Method ' + method + ' does not exist on jQuery.radio' );
		        }  
	};
	
		//方法集
	var methods={
			   init:function(options){
				   
				   var settings= $.extend({},defaults, options);
				   this.each(function(){
					   initFun($(this),settings);
				   
					});
				   
			   },
			   
	          
	   };
	
	

	function initFun($this,options){
		
//	  if(options.type=="html"||"")	{
//		var textt=$this.attr("text");
//		var styyle=$this.attr("style");
//		var cclass=$this.attr("class");
//		var value=$this.val();
//		var parent=$this.parent();
//		var tyype=$this.attr("type");
//		parent.addClass("myMcDiv");
//		var ddiv=$("<div class='mChooseDiv "+cclass+" "+tyype+"' style=''></div>");
//		parent.append(ddiv);	
//	  }

	  if(options.type=="json"||""){
		  //调用添加样式SPAN方法
		  addSpan($this);
		  //调用转换方法
		 transformation($this,options);
	  }else if(options.type=="ajax"){
		 $.ajax({
			  type: "GET",
			  url: options.url,
			  dataType: "json",
			  success:function(msg){
				  //将结果替换成url方便转换方法读取
				  options.url=msg;
				  //调用添加样式SPAN方法
				  addSpan($this);
				  //调用转换方法
				  transformation($this,options);
			  } 
		  });
/*		 var ccontent=$.ajax({url:options.url,async:false}).responseText;
		  var ccontent1=ccontent.substring(3,ccontent.length-2).split("},{");
		  var ccontent2=[];
		  var ttext=[];
		  var vvalue=[];
		  for(var i=0;i<ccontent1.length;i++){
			  ccontent2.push(ccontent1[i].split(","));
			  for(var j=0;j<ccontent2[0].length;j++){
				  if(ccontent2[0][j].split(":")[0].indexOf(options.textField)!=-1) ttext.push(ccontent2[i][j].split(":")[1].replace(/\"/g, ""));
				  if(ccontent2[0][j].split(":")[0].indexOf(options.valueField)!=-1) vvalue.push(ccontent2[i][j].split(":")[1].replace(/\"/g, ""));
			  }
			  $this.append($("<div class='chooseDiv' value='"+vvalue[i]+"'>"+ttext[i]+"</div>"));
			  $this.append("<div class='chooseGap'></div>");
	     }*/
}else if(options.type=="html"){
	addSpan($this);
	menuEvent($this);
}
	  
	/*  $(document).on("mouseenter",".chooseDiv",function(){
  	 $(this).addClass("beChosen");
		   }).on("mouseleave",".chooseDiv",function(){
			   if($(this).hasClass("cchose")==false) $(this).removeClass("beChosen");
		   });
	  
	  
	  //选框点击时间
   $(document).on("click",".chooseDiv",function(){
	   //如果有radio类，或者未开启多选
 	  if($(this).hasClass("radio")==true||options.multiSelect==false){
   		$(this).siblings().removeClass("beChosen cchose");
				$(this).addClass("beChosen cchose");
   	} //如果有checkbox或者开启了多选
       else if($(this).hasClass("checkbox")==true||options.multiSelect==true){
          if($(this).hasClass("cchose")==false) $(this).addClass("beChosen cchose");
			  else $(this).removeClass("beChosen cchose");
        }
          });*/
	  }
	function transformation($this,options){
		  var uurl=options.url;  //传过来的json格式  [{xxx:"xxx",xxx:xxx},{xxx:"xxx",xxx:xxx},{xxx:"xxx",xxx:xxx}];    注意：json对象最外面是不带引号的   key可带可不带"",value在字符串时必须带""
		  var iid=$this.attr("id");
		  var nname=$this.attr("name");
		  var ttype=$this.attr("type");
		  var sstyle=$this.attr("style");
		  var lstyle=$this.next("label").eq(0).attr("style");//next获取价额下来的数组，然后用eq获得第一个标签;
		  //var ooo=$this.next().eq(0).attr("style")//next获取价额下来的数组，然后用eq获得第一个标签;
		  //var lstyle=$("label[for="+$this.attr('id')+"]").attr("style");//label与input为合作关系，无法用eq查到
		  $this.next("label").eq(0).remove();
		  $this.wrap('<div></div>');
		  var ttext=[];
		  var vvalue=[];
		  let text=``;
		  
		  //拿出span
		  var span=``;
		  span+=$this.next('span').prop('outerHTML');
		  for(var i=0;i<uurl.length;i++){
			  //获取每一个字段的值，并拼接到网页中
			  ttext.push(uurl[i][options.textField]);
			  vvalue.push(uurl[i][options.valueField]);
			  text+=`<span class="my-${ttype}" style="${sstyle}"><input  type="${ttype}" id="${iid}" name="${nname}" value=${vvalue[i]}>${span} <label for="${iid}" style="${lstyle}"> ${ttext[i]} </label></span>`;
		  }
		  var inputs=$(text).find('input');
		  $(inputs).each(function(){
			  menuEvent($(this));
		  })
		  $this.after(text);//在原始数据之后接text
		  $this.remove();//删除原始数据
		  
	}
	
	//添加span用于更改样式
	function addSpan($this){
		  $this.after('<span></span>');
		  var styles = {};
		  styles.height=$this.css('font-size');
		  styles.width=$this.css('font-size');
		  styles.float ='left';
		  styles.margin = $this.css('margin');
		  styles['font-size']=$this.css('font-size');
		  
		  var type=$this.attr('type');
		  $this.next('span').css(styles);
		  $this.nextAll('label').css({
			  "font-family":$this.css("font-family"),
			  "font-size":$this.css("font-size"),
			  "line-height":$this.css("font-size"),
		  }  
		  )
		  $this.addClass('my-'+type);
	}
	
	//鼠标点击事件 
	function menuEvent($this){
		
		var $span=$this.next('span');
		var $spanHTML=$span.prop('outerHTML');
		
		var $label=$this.nextAll('label').eq(0);
		var $labelHTML=$label.prop('outerHTML');
		
		
		$this.wrap('<div></div>');
		$this.after($spanHTML+$labelHTML);
		$span.remove();
		$label.remove();
		if($this.css("float")=="none"){
			$this.parent('div').css({
				"display":"block",
				"float":"left"
			});
		}else{
			$this.parent('div').css({
				"display":"block",
				"float":$this.css("float")
			});
		}
		
		
		$this.next('span').on({
			"click":function(){
				var $input = $(this).prev('input');
				if($input.prop("checked")==false){
					$input.prop("checked",true);
				}else{
					$input.prop("checked",false);
				}
			}
		});
		$this.nextAll('label').eq(0).on({
			"click":function(){
				var $input = $(this).prevAll('input').eq(0);
				if($input.prop("checked")==false){
					$input.prop("checked",true);
				}else{
					$input.prop("checked",false);
				}
			}
		});
	}
	
})(jQuery);