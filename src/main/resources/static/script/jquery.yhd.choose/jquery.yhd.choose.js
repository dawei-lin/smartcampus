(function($){
	var defaults = {
	   type:"html",
	   url:"",
	  textField:'text',
	  valueField:'value',
	   multiSelect: true
	};
	$.fn.chosen=function( method) {				
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
					   this.each(function(){
					   initFun($(this),settings);
					   if(settings.type=="html"||"") {
						   $(this).remove();
					   }
						});
				   },
				   
		           getSelectedValue:function(){
		        	   if($(this).hasClass("chooseDiv")==true) var $this=$(this);
		        	   else var $this=$(".chooseDiv");
		        	   var len=$this.length;
		        	   var arr=[];
		        	   for(var i=0;i<len;i++){
		        		   var value=$this.eq(i).attr("value");
		        		   if($this.eq(i).hasClass("cchose")==true) arr.push(value);
		        	   }
		        	   return arr;
		           },
		           
		           getSelectedText:function(){
		        	   if($(this).hasClass("chooseDiv")==true) var $this=$(this);
		        	   else var $this=$(".chooseDiv");
		        	   var len=$this.length;
		        	   var arr=[];
		        	   for(var i=0;i<len;i++){
		        		   var ttxt=$this.eq(i).text();
		        		   if($this.eq(i).hasClass("cchose")==true) arr.push(ttxt);
		        	   }
		        	   return arr;
		           },
		           
		           setSelectedValue:function(options){
		        	   if($(this).hasClass("chooseDiv")==true) var $this=$(this);
		        	   else var $this=$(".chooseDiv");
		        	   var valuee=options.split(",");
		        	   for(var i=0;i<valuee.length;i++){
		        		   for(var j=0;j<$this.length;j++){
		        			   if(valuee[i]==$this.eq(j).attr("value")){
		        				   $this.eq(j).addClass("beChosen cchose");
		        				   if($this.hasClass("radio")==true) $this.eq(j).siblings().removeClass("beChosen cchose");
		        			   }
		        		   }
		        	   }
		           },
		           
		           setSelectedText:function(options){
		        	   if($(this).hasClass("chooseDiv")==true) var $this=$(this);
		        	   else var $this=$(".chooseDiv");
		        	   var valuee=options.split(",");
		        	   var a=$this.length;
		        	   for(var i=0;i<valuee.length;i++){
		        		   for(var j=0;j<$this.length;j++){
		        			   if(valuee[i]==$this.eq(j).text()){
		        				   $this.eq(j).addClass("beChosen cchose");
		        				   if($this.hasClass("radio")==true) $this.eq(j).siblings().removeClass("beChosen cchose"); 
		        			   }
		        		   }
		        	   }
		           }
		   };
		
		function initFun($this,options){
		  if(options.type=="html"||"")	{
			var textt=$this.attr("text");
			var styyle=$this.attr("style");
			var cclass=$this.attr("class");
			var value=$this.val();
			var parent=$this.parent();
			var tyype=$this.attr("type");
			parent.addClass("myDiv");
			var ddiv=$("<div class='chooseDiv "+cclass+" "+tyype+"' style='"+styyle+"' value='"+value+"'>"+textt+"</div>");
			parent.append(ddiv);
			parent.append("<div class='chooseGap'></div>");
		  }
		  
		  if(options.type=="json"){
			  var uurl=options.url.substring(2,options.url.length-2).split("},{");
			  var a=[];
			  var ttext=[];
			  var vvalue=[];
			  for(var i=0;i<uurl.length;i++){
				  a.push(uurl[i].split(","));
				  for(var j=0;j<a[0].length;j++){
				    if(a[0][j].split(":")[0]==options.textField) ttext.push(a[i][j].split(":")[1]);
				    if(a[0][j].split(":")[0]==options.valueField) vvalue.push(a[i][j].split(":")[1]);
				  }
				  var ddiv=$("<div class='chooseDiv' value='"+vvalue[i]+"'>"+ttext[i]+"</div>");
				  $this.append(ddiv);
				  $this.append("<div class='chooseGap'></div>");
			  }
		  }
		  
		  if(options.type=="ajax"){
			 $.ajax({
				  type: "GET",
				  url: options.url,
				  dataType: "json",
				  success:function(msg){
					  var ttext=[];
					  var vvalue=[];
					  for(var i=0;i<msg.length;i++){
						  ttext.push(msg[i][options.textField]);
						  vvalue.push(msg[i][options.valueField]);
						  $this.append($("<div class='chooseDiv' value='"+vvalue[i]+"'>"+ttext[i]+"</div>"));
						  $this.append("<div class='chooseGap'></div>");
					  }
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
       }
		  $(document).on("mouseenter",".chooseDiv",function(){
         	 $(this).addClass("beChosen");
			   }).on("mouseleave",".chooseDiv",function(){
				   if($(this).hasClass("cchose")==false) $(this).removeClass("beChosen");
			   });

	      $(document).on("click",".chooseDiv",function(){
	    	  if($(this).hasClass("radio")==true||options.multiSelect==false){
          		$(this).siblings().removeClass("beChosen cchose");
					$(this).addClass("beChosen cchose");
          	}
	          else if($(this).hasClass("checkbox")==true||options.multiSelect==true){
	             if($(this).hasClass("cchose")==false) $(this).addClass("beChosen cchose");
				  else $(this).removeClass("beChosen cchose");
	           }
	             });
		  }
		
})(jQuery);