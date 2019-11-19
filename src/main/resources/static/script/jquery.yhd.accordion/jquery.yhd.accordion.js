(function($){
	var defaults = {
		type:'ajax',
		url:'',
		value:"",
		valueField:"id",
		textField:"text",
		parentField:"pid",
		urlField:"url",
		urlTaget:"",
		children:"children",
		img:"",
		onClick:function(){},
		onBeforeLoad:function(){return true;},
		onLoadSuccess:function(){},
		onLoadError:function(){},
		onBeforeExpand:function(){return true;},
		onExpand:function(){},
		onBeforeCollapse:function(){return true;},
		onCollapse:function(){}
	};
	$.fn.accordion=function( method) {				
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.accordion' );
		}  
	};
	
	var methods={
		init:function(options){
			var settings= $.extend({},defaults, options); 
			var $this=$(this);
			if(settings.onBeforeLoad()&& settings.type=="json"){
				var value=settings.value;
				var treeData=listToTree(value,settings.valueField,settings.parentField);
				var cont=createHtml(settings,treeData);
				$this.append(cont);
			}
			if(settings.onBeforeLoad()&& settings.type=="ajax"){                        
				$.ajax({
					async:true,
					url:settings.url,
					dataType : "json",
					xhrFields: {withCredentials: true},
					crossDomain: true,
					success:function(msg){
						settings.onLoadSuccess();
						var treeData=listToTree(msg,settings.valueField,settings.parentField);
						var cont=createHtml(settings,treeData);
						$this.append(cont);
						
					},
       				error:function(msg){
						settings.onLoadError();
					}	
				});
			}			
			$(document).on("click",".accordion-title",function(){
				var aa=settings.onBeforeExpand();
				//当前状态为关闭时
				if(settings.onBeforeExpand()&& $(this).next().hasClass("accordion-subcont")&& $(this).hasClass("accrodion-collapsed")){
					$(this).next().show();
					settings.onExpand();
					$(this).addClass("accrodion-expanded");
					$(this).removeClass("accrodion-collapsed");
				}
				else if(settings.onBeforeCollapse()&& $(this).next().hasClass("accordion-subcont")&& $(this).hasClass("accrodion-expanded")){
					$(this).next().hide();
					settings.onCollapse();
					$(this).addClass("accrodion-collapsed");
					$(this).removeClass("accrodion-expanded");
				}
				settings.onClick();			
			});
						
			$(document).on("mouseenter",".accordion-title",function(){
				$(this).addClass("accordion-hover");
			});
			$(document).on("mouseleave",".accordion-title",function(){
				$(this).removeClass("accordion-hover");
			});
		},
		refresh:function(newOptions){
			var newSettings=$.extend({},defaults, newOptions); 
			if(newOptions==null) 
				location.reload();
			else{
				var aa=$("<div></div>");
				$(this).before(aa);
				$(this).remove();
				if(newSettings.type=="json") 
					var value=newSettings.value;
				else if(newSettings.type=="ajax")	
					var value=JSON.parse($.ajax({url:newSettings.url,async:false}).responseText);
				var treeData=listToTree(value,newSettings.valueField,newSettings.parentField);
				var cont=createHtml(newSettings,treeData);
				$(this).append(cont);
			}
		}
	};
	function createHtml(settings,treeData,lev){
		if(lev==undefined||lev<1)
			lev=1;
		var cont="";
		$.each(treeData, function(i, n){
			var bHref=false;
			if(n[settings.urlField]!=undefined){
				var target=settings.target;
				var tarStr="";
				if(target.length>0){
					tarStr=" target='"+target+"'";
				}
				if(n[settings.urlField].length>0){
					cont+="<a style='display: block' href='"+n[settings.urlField]+"'"+tarStr+">";
					bHref=true;
				}
			}
			cont+="<div class='accordion-title accrodion-expanded accordionLev"+lev+"'>";
			if(settings.img!=""&&n[settings.img]!=undefined){
				cont+="<img src='"+n[settings.img]+"'></img>";
			}
			cont+="<span>"+n[settings.textField]+"</span>";
			cont+="</div>";
			if(bHref){
				cont+="</a>";
			}
			if(n[settings.children]!=undefined){
				cont+="<div class='accordion-subcont'>";
				cont+=createHtml(settings,n[settings.children],lev+1);
				cont+="</div>";
			}
		});
		return cont;
	}
	
})(jQuery);