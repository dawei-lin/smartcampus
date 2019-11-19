(function($){
	var defaults={
			type:'oneSide',
			min:-Infinity,
			max:Infinity,
			pace:1
	};
	$.fn.spinner=function( method) {				
	   if ( methods[method] ) {
	     return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	   } else if ( typeof method === 'object' || ! method ) {
	        return methods.init.apply( this, arguments );
	      } else {
	           $.error( 'Method ' + method + ' does not exist on jQuery.spinner' );
	        }  
	};
	var methods={
	   init:function(options){
		   this.each(function() {
				var settings= $.extend(true,{},defaults, options);
				if(settings.type=='oneSide') $(this).addClass("spinnertext spinnertext0");
				if(settings.type=='bothSide') $(this).addClass("spinnertext spinnertext1");
		 
				$(this).keyup(function () {
					$(this).val($(this).val().replace(/[^0-9.]/g, ''));
				})
		 
				setButton($(this),settings);
			});
		}  
   };
	function setButton(target,options){
	   var $this = target;
	   //获取input高宽
 	   var height = parseInt($this.outerHeight());
 	   var width = parseInt($this.outerWidth());
 	   //border
 	   var border=parseInt($this.css('border-left-width'));
 	   
 	   //高度中的padding和border
 	   var paddingAndBorder1=parseInt($this.css('padding-top'))+parseInt($this.css('padding-bottom'))+parseInt($this.css('border-left-width'))*2;
 	  //宽度中的padding和border
 	   var paddingAndBorder2=parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'))+parseInt($this.css('border-left-width'))*2;
 	   
 	   
 	  
	   var float=$this.css("float");
	   
	   //oneside--加减按钮在同一侧，bothside--加减按钮在输入框两侧
       if(options.type=='oneSide'){
    	   
    	   var spanRange=2;
    	   //中间缝隙
    	   if(height%2!=0){
    		   spanRange=3;
    	   }
    	   
    	  //span高宽(宽度向下取整floor)
    	  
    	  var spanWidthInt=Math.floor(width/4);
    	  var spanHeightInt=(height-spanRange)/2
    	  var span1Height=spanHeightInt+'px';
 		  var span2Height=span1Height;
 		  //如果宽高比例大于1.5
    	  if(spanWidthInt/spanHeightInt>2.7){
    		  spanWidthInt=spanHeightInt;
    	  }
    	  var spanWidth=spanWidthInt+'px';
    	  
 		  var lineHeight=span1Height;
 		  
 		  
 		  //span父div高宽
 		  var box1Height=height+'px';
   	      var box1Width=spanWidth;
   	      //总div高宽
 		  var parentBoxHeight=height+'px';
 		  var parentBoxWith=width+'px';
   	      
 		  //字体大小
 		  var fontSize;
 		  //字体大小科学计算(解决长宽不合理的解决办法)
 		  if(Math.floor(width/3)/((height-spanRange)/2)>=1 ){
 			 fontSize =(height-spanRange)/2 + 'px';
 		  }else{
 			  fontSize=Math.floor(width/3 ) + 'px';
 		  }
		  //判断input是否为绝对定位
		  if($this.css('position') != 'absolute'){
			//总div直接放入td行
			var parentBox=$('<div name="oneSideParent" style="height:'+parentBoxHeight+';width:'+parentBoxWith+';float:'+float+'"></div>');
		  }else{
			//取出input定位信息给总div
			var topOffset = $this.css('top');
			var leftOffset = $this.css('left');
			var margin = $this.css('margin');
			$this.css('top','');
			$this.css('left','');
			$this.css('position','');
			$this.css('margin','');
			var parentBox=$('<div name="oneSideParent" style="height:'+parentBoxHeight+';width:'+parentBoxWith+';margin:'+margin+';float:'+float+';position:absolute;top:'+topOffset+';left:'+leftOffset+'"></div>');
		  }
 		  //input添加父元素
 		  $this.wrap(parentBox);
 		  
 		  var inputHeight=height-paddingAndBorder2;
 		  //input向上取整长度
 		  var inputWidth=width-spanWidthInt-2;
 		  //去掉padding和border
 		  inputWidth=inputWidth-paddingAndBorder2;
// 		  //字体大小
// 		  var fontSize2;
// 		  //字体大小科学计算(解决长宽不合理的解决办法)
// 		  if(inputWidth/(height-paddingAndBorder1)>=1 ){
// 			 fontSize2 =(height-paddingAndBorder1)/2+ 'px';
// 		  }else{
// 			  fontSize2=inputWidth/2 + 'px';
// 		  }
// 		  $this.css('font-size',fontSize2);
 		 $this.css('height',inputHeight);
 		  $this.css('width',inputWidth);
 		  

    	  var box1=$('<div class="spinnerbox0 FloatLeft" style="height:'+box1Height+';width:'+box1Width+';float:right;margin-left:2px"></div>');
    	  
		  var span1=$('<span class="ClearAll spinnerspan0 ANYSPINNERSPAN" style="height:'+span1Height+'; width:'+spanWidth+';text-align:center;" id="'+$this.prop("id")+'" onselectstart="return false" >+</span>');
		  var span2=$('<span class="ClearAll spinnerspan0 ANYSPINNERSPAN" style="height:'+span2Height+'; width:'+spanWidth+';margin-top:'+spanRange+'px;text-align:center;" id="'+$this.prop("id")+'" onselectstart="return false" >-</span>');
		  
		  box1.append(span1);
		  span1.after(span2);
		  
		  $this.after(box1);
		  
		  $this.next().find('span').css('font-size',fontSize);
		  $this.next().find('span').css('line-height',lineHeight);
       }
       
       
       if(options.type=='bothSide'){
    	  //span父div高宽
    	  var boxHeight=height +'px';
    	  var boxWidth=width/4+'px';
  		  
    	  //总div高宽
  		  var parentBoxHeight=height+'px';
  		  var parentBoxWith=width+(width/5)+'px';
    	   
     	  var spanWidth=(width/4)+'px';
     	  
  		  var span1Height=(height-4)+'px';
  		  var span2Height=span1Height;
  		  var lineHeight=span1Height;
  		  

  		  //字体大小
  		  var fontSize;
  		 
  		  //字体大小科学计算(解决长宽不合理的解决办法)
  		  if(width/height>=1 || height/width<1){
  			 fontSize =(height/2) + 'px';
  		  }
  		  if(width/height<1 || height/width>=1){
  			  fontSize=(width/2) + 'px';
  		  }
    	  
  		  //总div放入td行
 		  var parentBox=$('<div  name="bothSideParent" style="height:'+parentBoxHeight+';width:'+parentBoxWith+';float:'+float+'"></div>');
 		  //添加父元素div
 		  $this.wrap(parentBox);
  		  $this.css("float","none");
  		  //span外面包一层div
 		  var span1=$('<div class="spinnerbox1 FloatRight ANYSPINNERSPAN" style="height:'+boxHeight+';width:'+boxWidth+'"><span class="spinnerspan1" style="height:'+span1Height+'; width:'+spanWidth+';text-align:center;" id="'+$this.prop("id")+'" onselectstart="return false">+</span></div>');
 		  
    	  
 		  var span2=$('<div class="spinnerbox2 FloatLeft ANYSPINNERSPAN" style="height:'+boxHeight+';width:'+boxWidth+'"><span class="spinnerspan1" style="height:'+span1Height+'; width:'+spanWidth+';text-align:center;" id="'+$this.prop("id")+'" onselectstart="return false">-</span></div>'); 
 		 
 		  
 		  $this.before(span2);
 		  $this.after(span1)
// 		  parentBox.append(span2);
// 		  parentBox.append($this);
// 		  parentBox.append(span1);
 		  
 		  //改变字体
 		  $this.prev('div').find('span').css('font-size',fontSize);
 		  $this.prev('div').find('span').css('line-height',lineHeight);
 		  
 		  $this.next().find('span').css('font-size',fontSize);
		  $this.next().find('span').css('line-height',lineHeight);
       }
       span1.on('click',function(){
          var value=Number($this.val());
    	  if(value<options.max) $this.val(value+=options.pace);
    	  if(value>=options.max) span1.addClass("spinnerspandisabled");
    	  if(value>options.min) span2.removeClass("spinnerspandisabled");
	   });
	   span2.on('click',function(){
		  var value=Number($this.val());
		  if(value>options.min) $this.val(value-=options.pace);
		  if(value<=options.min) span2.addClass("spinnerspandisabled");
		  if(value<options.max) span1.removeClass("spinnerspandisabled")
	   });
	}

})(jQuery);