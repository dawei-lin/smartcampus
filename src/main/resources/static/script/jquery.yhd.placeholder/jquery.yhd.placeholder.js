(function($){
	var defaults = {
			placeholder:""
	};
	
	$.fn.placeholder=function( method) {				
		   if ( methods[method] ) {
		     return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		   } else if ( typeof method === 'object' || ! method ) {
		        return methods.init.apply( this, arguments );
		      } else {
		           $.error( 'Method ' + method + ' does not exist on jQuery.chosen' );
		        }  
		};
		
		var methods={
				init:function(options){
					var settings= $.extend({},defaults, options);
					var input=document.createElement('input');
					var word=$(this).attr("placeholder");
					if(("placeholder" in input)==false){
						if(settings.placeholder!="") word=settings.placeholder;
					    $(this).addClass("ttext gground");
						var ddiv=$("<div class='bback'>"+word+"</div>");
						$(document.body).append(ddiv);
						$(this).on("keyup",function(){
							$(this).removeClass("gground");
							var len=$(this).val();
							if($(this).val()=="") $(this).addClass("gground");
						});				
					}
					else{
						if(settings.placeholder!="") $(this).attr("placeholder",settings.placeholder);	
					}
				}
		}
		
		
			
})(jQuery);