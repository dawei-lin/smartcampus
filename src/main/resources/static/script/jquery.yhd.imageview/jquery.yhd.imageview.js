(function($){
	var defaults = {
		scrollNum:4,
		slideNum:2,
		type:"html",
		value:"url",
		isDot:true,
		isScroll:true,
		url:"",
		animate:"",
		dsptype:"LPRC"//"LPRC LCRP UPDC UCDP LPRP"
	};
	
	$.fn.imageview=function(/* method*/) {				
		var method = arguments[0];
		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		}else if(typeof(method) == 'object' || !method){
			method =methods.init;
		}else{
			$.error('Method ' + method + ' does not exist on jquery.yhd.imageview');
			return this;
		}
		return method.apply(this, arguments);
	};
	var fPic=15;
	var scPos=0;
	var methods={
		init:function(options){
			this.each(function() {
				var $this = $(this);
				//尝试去获取settings， 如果不存在，则返回“undefined"
				var settings = $this.data('yhd.imageview');
				//如果获取settings失败，则根据options和defaults创建它
				if(typeof(settings) == 'undefined'){
					settings = $.extend({},defaults, options);
					//保存我们所创建的settings
					$this.data('yhd.imageview',settings);
				}else{
					//如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
					settings = $.extend({},settings,options);
					//如果你想每次都保存options，可以添加下面代码：
					$this.data('yhd.imageview', settings);
				}
				initHtml($this,settings);
				initFun($this,settings);
			});
		}
	}
	
	function initHtml($target,options){
		if(options.type=="json"||options.type=="ajax") {
			if(options.url!=""&& options.url!=null) 
				AjaxOrjsonBuild($this,options);
			else
				return;
		}
		var $vimgBlk=$("._VIEWIMG",$target);
		var $cimgBlk=$("._CTRLIMG",$target);
		var $cdiv=$(".ctrlImgDiv",$cimgBlk);
		var $dotDiv=$(".dotDiv",$vimgBlk);
		var $vimg=$vimgBlk.children("img");
		var $cimg=$cdiv.children("img");
		$cdiv.children("img").addClass("thumbnail");
		$(".dotCtrl",$dotDiv).eq(0).addClass("chosen");//显示第一个图片的圆点
		$vimg.hide();//隐藏所有图片
		$vimg.eq(0).show();//显示第一个图片
		
		//就设置图片为绝对定位，让按钮都在图片上重叠
		$vimgBlk.children('.lCtrl').css("position","absolute").css("z-index","70");
		$vimg.css("top",$vimgBlk.offset().top);
		$vimgBlk.children('.rCtrl').css("position","absolute").css("z-index","70");
		$dotDiv.css("position","absolute").css("z-index","70");
		
		if(options.isDot==true){
			var dotDivLeft=$vimgBlk.offset().left+$vimgBlk.outerWidth()*0.5-48;
			//设置dotdiv的top和left
			$dotDiv.css({
				"left":dotDivLeft,
				"top":$vimgBlk.offset().top+$vimgBlk.outerHeight()*0.86
			});
		}else{

			$dotDiv.hide();
		}
			
		$(".lCtrl",$vimgBlk).css({
			"left":$vimgBlk.offset().left+10,
			"top":$vimgBlk.offset().top-parseInt($vimgBlk.css("padding-top"))+$vimgBlk.outerHeight()*0.5-20
		}).addClass("vctrl");
		$(".rCtrl",$vimgBlk).css({
			"left":$vimgBlk.offset().left+$vimgBlk.width()-10,
			"top":$vimgBlk.offset().top-parseInt($vimgBlk.css("padding-top"))+$vimgBlk.outerHeight()*0.5-20
		}).addClass("vctrl");
		
		if(options.isScroll==false){
			$(".upCtrl",$cimgBlk).hide();
			$(".downCtrl",$cimgBlk).hide();
		}
		
		$cimg.hide();
		$cimg.slice(0,options.scrollNum).show();
		if(options.dsptype!="LPRP"){//如果不是全图模式
			
			if(options.dsptype=="UPDC"||options.dsptype=="UCDP"){//上下结构
				$(".upCtrl",$cimgBlk).html("<");
				$(".upCtrl",$cimgBlk).addClass("UDC_cctrl").css("float","left");
				$cdiv.addClass("FloatLeft");
				$(".downCtrl",$cimgBlk).html(">");
				$(".downCtrl",$cimgBlk).css({
					
				});
				$(".downCtrl",$cimgBlk).addClass("UDC_cctrl").css("float","right");
				
				var lrCtrlTop=$cimgBlk.height()/2-$(".upCtrl").height()/2;
				$(".upCtrl",$cimgBlk).css("margin-top",udCtrlLeft);
				$(".downCtrl",$cimgBlk).css("margin-top",udCtrlLeft);
				
				$cimgBlk.css("text-align","center");
				$cimgBlk.css("line-height",$cimgBlk.height()+"px");
				$cdiv.css("width",$cimgBlk.width()-24);//除去左右箭头的下控图片宽度
			}else{//左右结构
				
				
				$(".upCtrl",$cimgBlk).addClass("LRC_cctrl");
				$(".downCtrl",$cimgBlk).addClass("LRC_cctrl");
				var udCtrlLeft=$cimgBlk.width()/2-$(".upCtrl").width()/2;
				$(".upCtrl",$cimgBlk).css("margin-left",udCtrlLeft);
				$(".downCtrl",$cimgBlk).css("margin-left",udCtrlLeft);
				$cimgBlk.css("text-align","center");
				
				$cdiv.height($cimgBlk.innerHeight()-24);
				$cdiv.width($cimg.width());
				$cdiv.css("margin","0 auto");
				
			}
		}else{//如果是全图模式
		}
	}
	function initFun($target,options){
		var $vimgBlk=$("._VIEWIMG",$target);//
		var $cimgBlk=$("._CTRLIMG",$target);//
		var $cdiv=$(".ctrlImgDiv",$cimgBlk);//
		var $dotDiv=$(".dotDiv",$vimgBlk);//
		var $vimg=$vimgBlk.children("img");//
		var $cimg=$cdiv.children("img");//
		
		var imgNum=$vimg.size();
		var order=0;
		$(".dotCtrl",$dotDiv).on("mouseenter",function(){	
			order=parseInt($(this).attr("order"));
			$vimg.hide();
			$vimg.filter("[order="+order+"]").show();
			$dotDiv.children(".chosen").removeClass("chosen");
			$dotDiv.children("label[order="+order+"]").addClass("chosen");
		});
		$cimg.on("click",function(){//点击滚动栏中的图片所触发的事件
			if(!$vimg.is(":animated")){
				order=parseInt($(this).attr("order"));
				$vimg.hide();
				animation($vimg.filter("[order="+order+"]"),options);
				$dotDiv.children(".chosen").removeClass("chosen");
				$dotDiv.children("label[order="+order+"]").addClass("chosen");
			}
		});
		
		$(".upCtrl",$cimgBlk).on("click",function(){		//点击向上滚动按键所触发的事件
			if(!$cimg.is(":animated")){
			    if(scPos>0){
			    	$cimg.hide();
			    	scPos=scPos-options.slideNum;
			    	if(scPos<=0)
			    		scPos=0;
			    	$cimg.slice(scPos,scPos+options.scrollNum).show();
			    }
			}
		});
				
		$(".downCtrl",$cimgBlk).on("click",function(){			
			if(!$cimg.is(":animated")){
				if(scPos+options.scrollNum<imgNum){
			    	scPos=scPos+options.slideNum;
			    	if(scPos+options.scrollNum>=imgNum){
			    		scPos=imgNum-options.scrollNum;
			    	}
			    	$cimg.hide();
			    	$cimg.slice(scPos,scPos+options.scrollNum).show();
			    }
			}
		});
		
		$(".lCtrl",$vimgBlk).on("click",function(){		//点击大图切换滚动按键所触发的事件
			var o=$vimg.filter(":visible");
			order=parseInt(o.attr("order"));
			order--;
			if(order<0)
				return;
			o.hide();
			$dotDiv.children(".chosen").removeClass("chosen");
			$dotDiv.children("label[order="+order+"]").addClass("chosen");
			$vimg.filter("[order="+order+"]").show();
		});
		$(".rCtrl",$vimgBlk).on("click",function(){		//点击大图切换滚动按键所触发的事件
			var o=$vimg.filter(":visible");
			order=parseInt(o.attr("order"));
			order++;
			if(order>=imgNum)
				return;
			o.hide();
			
			$dotDiv.children(".chosen").removeClass("chosen");
			$dotDiv.children("label[order="+order+"]").addClass("chosen");
			$vimg.filter("[order="+order+"]").show();
		});
	}
	
	
	function AjaxOrjsonBuild($this,settings){
		if(settings.type=="json") 
			var value=settings.url;
		else{
			var ccontent=$.ajax({url:settings.url,async:false}).responseText;
			var value=JSON.parse(ccontent);
		}
			
		$this.addClass("ClearAll  ANYROW ABSROW-1");
		var divv=$("<div class='ANYIMAGEVIEW ANYIMAGEVIEW_1 IMAGEVIEW-1_1'></div>");
		$this.append(divv);
			
		if(settings.dsptype!="LPRP"){	
			if(settings.dsptype=="LPRC"||settings.dsptype=="LCRP"){
				var up="∧";
				var down="∨";
				var ddiv=$("<div class='FloatLeft ABSCOL-1_1 _VIEWIMG'></div>");
				var diiv=$("<div class='FloatLeft ABSCOL-2_1 _CTRLIMG'></div");
			}
			else if(settings.dsptype=="UPDC"||settings.dsptype=="UCDP"){
				var up="<";
				var down=">";
				var ddiv=$("<div class='FloatLeft ABSROW-1_1 _VIEWIMG'></div>");
				var diiv=$("<div class='FloatLeft ABSROW-2_1 _CTRLIMG'></div");
			}
			divv.append(ddiv);
            ddiv.append("<div class='dotDiv'></div>");       
            
			if(settings.dsptype=="LPRC"||settings.dsptype=="UPDC") ddiv.after(diiv);
			else if(settings.dsptype=="LCRP"||settings.dsptype=="UCDP") ddiv.before(diiv);	
			
			var wrapp=$("<div class='wrap'></div>");
			diiv.append(wrapp);
			wrapp.append("<label class='upCtrl'>"+up+"</label>");
			wrapp.append("<div class='ctrlImgDiv'></div>");
			wrapp.append("<label class='downCtrl'>"+down+"</label>");
		}else{
			var ddiv=$("<div class='FloatLeft ABSROW-3_1 _VIEWIMG'></div>")
			divv.append(ddiv);
            ddiv.append("<div class='dotDiv'></div>");
		}
		for(var i=0;i<value.length;i++){
			var uurl=settings.value;
			$(".dotDiv").before("<img src='"+value[i][settings.value]+"' order='"+i+"'/>");
		    $(".dotDiv").append("<label class='dotCtrl' order='"+i+"'></label>");
		    if(settings.dsptype!="LPRP") $(".ctrlImgDiv").append("<img class='thumbnail' src='"+value[i][settings.value]+"' order='"+i+"'/>");
		}	
	}
	function animation($this,settings){//图片显示时的动画效果
		if(settings.animate=="") $this.show();
		else if(settings.animate=="show") $this.show("slow");
		else if(settings.animate=="slideDown") $this.slideDown();
		else if(settings.animate=="fadeIn") $this.fadeIn();	
	}
})(jQuery);