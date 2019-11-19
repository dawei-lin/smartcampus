(function($){
	var defaults = {
			type:'ajax',
			url:'',
			checkbox:true,
			lines:false,
			icons:false,
			value:"",
			expand:true,
			loadparentselect:false,
			textField:'text',
			valueField:'id',
			parentField:"pid",
			selectField:"",
			children:"children",
			selected:"",
			onClick:function(){},
			onDbClick:function(){},
			onBeforeLoad:function(){return true;},
            onLoadSuccess:function(){},
            onLoadError:function(){},
            onBeforeExpand:function(){return true;},
			onExpand:function(){},
			onBeforeCollapse:function(){return true;},
			onCollapse:function(){},
			onBeforeCheck:function(){return true;},
			onCheck:function(){},
			onBeforeSelect:function(){return true;},
			onSelect:function(){}
				
	};
	$.fn.tree=function( method) {	
		if (methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.tree' );
		}  
	};

	var methods={
		init:function(options){
			var settings= $.extend({},defaults, options); 
			var $this=$(this);
			if(settings.onBeforeLoad()&& settings.type=="json"){
				var value=settings.value;
				var treeData=listToTree(value,settings.valueField,settings.parentField);
				createHtml(settings,$this,treeData);
				//JasonOrAjax($this,settings,value);
			}
			if(settings.onBeforeLoad()&& settings.type=="ajax"){
				$.ajax({
					async : false,
					url: settings.url,
					dataType : "json",
					xhrFields: {withCredentials: true},
					crossDomain: true,
					success:function(msg){
						settings.onLoadSuccess();
						var treeData=listToTree(msg,settings.valueField,settings.parentField);
						createHtml(settings,$this,treeData);
						//JasonOrAjax($this,settings,msg);
						//var value=JSON.parse(msg);
						//JasonOrAjax($this,settings,value);
					},
					error:function(msg){
						settings.onLoadError();
					}
				});
			}
			if(settings.checkbox==false)  $(".tree-checkbox").removeClass("tree-uncheck");
			if(settings.lines==false)  $(".line").removeClass("line");
			var arr=settings.selected.split(",");
			var current;
			var len=arr.length;
			for(var i=0;i<arr.length;i++){
				if(arr[i].length==0)
					continue;
				var checkboxobj=$(".tree-checkbox",$this);
				var spanobj=$("span",$this);
				for(var j=0;j<checkboxobj.length;j++){
					//alert(arr[i]);
					//alert(spanobj.eq(j).attr("id"));
					if(arr[i]==spanobj.eq(j).attr("id")) {
						checkboxobj.eq(j).addClass("tree-checked");
					    current=spanobj.eq(j).prev();
						break;
					}
				}
				if(settings.loadparentselect==true) {
                    if (current != null && current.parent().hasClass("tree") && current.parent().next().hasClass("subtree")) {
                        var len = current.parent().next().children().length;
                        var nodes = current.parent().next().children();
                        for (var m = 0; m < len; m++) {
                            var node = nodes.eq(m);
                            for (var n = 0; n < node.children().length; n++) {
                                if (node.children().eq(n).hasClass("tree-checkbox"))
                                    node.children().eq(n).addClass("tree-checked");
                            }
                        }
                    }
                }
				if(current!=null) checkcheck(current);
			}				
				 
				 
			$(document).on("click",".tree-node .tree-checkbox",function(){
				 if(settings.onBeforeCheck()){
					$(this).toggleClass("tree-checked");
					allSelect($(this));	 
					checkcheck($(this));
					settings.onClick();
					settings.onCheck();
				}
			});
					 
			 $(document).on("click",".tree-node span",function(){
				 if(settings.onBeforeSelect()){
					$(this).prev().toggleClass("tree-checked");
					allSelect($(this).prev());	 
					checkcheck($(this).prev());
					settings.onClick();
					settings.onSelect();
				 }
			 });
						
			$(document).on("click",".tree-node .tree-hit",function(){
				var aa=settings.onBeforeExpand();
	            //当前状态为关闭时
				if(settings.onBeforeExpand()&& $(this).parent().next().hasClass("subtree")&& $(this).hasClass("tree-collapsed")){
					$(this).parent().next().show();
					settings.onExpand();	
					$(this).addClass("tree-expanded");
					$(this).removeClass("tree-collapsed");
					$(this).next().removeClass("tree-folder");
					$(this).next().addClass("tree-folder-open");
				}		
				else if(settings.onBeforeCollapse()&& $(this).parent().next().hasClass("subtree")&& $(this).hasClass("tree-expanded")){
					$(this).parent().next().hide();
					settings.onCollapse();
					$(this).addClass("tree-collapsed");
					$(this).removeClass("tree-expanded");
					$(this).next().removeClass("tree-folder-open");
					$(this).next().addClass("tree-folder");
				}			
				settings.onClick();				
			});
			$(document).on("mouseenter",".tree-node",function(){	
				$(this).addClass("tree-node-hover ");
			});
			$(document).on("mouseleave",".tree-node",function(){					
				$(this).removeClass("tree-node-hover ");		
			});
			$(document).on("click",".tree-node",function(){
				var $this=$(this);
				var $oldSelected=$this.parents('.ANYTREEVIEW').find(".tree-node");
				$oldSelected.removeClass("tree-node-selected");
				$this.addClass("tree-node-selected");	
			});							 
		},
				
		getChecked:function(options){
		   var arr=[]; 
		   for(var i=0;i<$(".tree-checkbox").length;i++){
		      var current=$(".tree-checkbox").eq(i);
		      if(!current.parent().hasClass("tree")|| (current.parent().hasClass("tree")&& !current.parent().next().hasClass("subtree"))){
		         if((options==undefined||options.type=="checked" ) && current.hasClass("tree-checked")) 
			        arr.push($("span").eq(i).text());
		         if(options.type=="unchecked" && !current.hasClass("tree-checked")) 
			        arr.push($("span").eq(i).text());
		      }
		   }
		},
		
		getSelected:function(options){
			var arr=[]; 
			for(var i=0;i<$(".tree-checkbox").length;i++){
				var current=$(".tree-checkbox").eq(i);
				if( options==undefined||options.type=="checked"||options.type=="unchecked"){
					if(!current.parent().hasClass("tree")|| (current.parent().hasClass("tree")&& !current.parent().next().hasClass("subtree"))){
						if((options.type=="checked"|| options.type==undefined) && current.hasClass("tree-checked")) {
							arr.push($("span",current.parent()).attr("id"));
						}
						if(options.type=="unchecked" && !current.hasClass("tree-checked")){
							arr.push($("span",current.parent()).attr("id"));
						}
					}
				}
				else{
					if((options.type=="checkedall") && (current.hasClass("tree-checked")||current.hasClass("tree-notallcheck"))) {
						arr.push($("span",current.parent()).attr("id"));
					}
				}
			}
			return arr;
		},				
		select:function(target){
			var $this=$(target);
			$this.prev().addClass("tree-checked");
			if($this.parent().hasClass("tree") && $this.parent().next().hasClass("subtree")){
				var len=$this.parent().next().children().length;
				var nodes=$this.parent().next().children();
				for(var i=0;i<len;i++){
					var node=nodes.eq(i);
					for(var j=0;j<node.children().length;j++){
						if(node.children().eq(j).hasClass("tree-checkbox")) 
							node.children().eq(j).addClass("tree-checked");		
					}
				}					
			}
		},
				
		check:function(target){
			var arr=target.split(",");
			var current;
			var len=arr.length;
			for(var i=0;i<arr.length;i++){
				for(var j=0;j<$(".tree-checkbox").length;j++){
					if(arr[i]==$("span").eq(j).text()) {
						$(".tree-checkbox").eq(j).addClass("tree-checked");
					    current=$("span").eq(j);
						break;
					}
				}
				if(current.parent().hasClass("tree") && current.parent().next().hasClass("subtree")){
					var len=current.parent().next().children().length;
					var nodes=current.parent().next().children();
					for(var m=0;m<len;m++){
						var node=nodes.eq(m);
						for(var n=0;n<node.children().length;n++){
							if(node.children().eq(n).hasClass("tree-checkbox")) 
								node.children().eq(n).addClass("tree-checked");	
						}
					}					
				}
				checkcheck(current);
			}				
		},
				
		uncheck:function(target){
			var arr=target.split(",");
			for(var i=0;i<arr.length;i++){
				for(var j=0;j<$(".tree-checkbox").length;j++){
					if(arr[i]==$("span").eq(j).text()) {
						$(".tree-checkbox").eq(j).removeClass("tree-checked").removeClass("tree-notallcheck");
						var current=$("span").eq(j).prev();
						var currentt=$("span").eq(j);
						break;
					}
				}
						
				if(current.parent().hasClass("tree") && current.parent().next().hasClass("subtree")){
					var len=current.parent().next().children().length;
					var nodes=current.parent().next().children();
					for(var m=0;m<len;m++){
						var node=nodes.eq(m);
						for(var n=0;n<node.children().length;n++){
							if(node.children().eq(n).hasClass("tree-checkbox")) 
								node.children().eq(n).removeClass("tree-checked");	
						}
					}					
				}
						
				checkcheck(currentt);
			}
		},
				
		collapse:function(target){
			$this=$(target);
			if($this.parent().hasClass("tree") && $this.parent().next().hasClass("subtree")){
				$this.parent().next().hide();
				var node=$this.parent().children();
				for(var j=0;j<node.length;j++){
					if(node.eq(j).hasClass("tree-open")) node.eq(j).addClass("tree-collapsed");
					if(node.eq(j).hasClass("tree-folder-open")) node.eq(j).addClass("tree-folder");
				}
					
			}
		},
				
		expand:function(target){
			$this=$(target);
			if($this.parent().hasClass("tree") && $this.parent().next().hasClass("subtree")){
				$this.parent().next().show();
				var node=$this.parent().children();
				for(var j=0;j<node.length;j++){
					if(node.eq(j).hasClass("tree-collapsed")) node.eq(j).removeClass("tree-collapsed");
					if(node.eq(j).hasClass("tree-folder")) node.eq(j).removeClass("tree-folder");
				}
			}
			 
		},
				
		collapseAll:function(){
			$(".subtree").hide();
			for(var i=0;i<$(".tree").length;i++){
				if($(".tree").eq(i).next().hasClass("subtree")){
					var node=$(".tree").eq(i).children();
					for(var j=0;j<node.length;j++){
						if(node.eq(j).hasClass("tree-open")) node.eq(j).addClass("tree-collapsed");
						if(node.eq(j).hasClass("tree-folder-open")) node.eq(j).addClass("tree-folder");
					}
				}
			}
		},
				
		expandAll:function(){	
			$(".subtree").show();
			for(var i=0;i<$(".tree").length;i++){
				if($(".tree").eq(i).next().hasClass("subtree")){
					var node=$(".tree").eq(i).children();
					for(var j=0;j<node.length;j++){
						if(node.eq(j).hasClass("tree-collapsed")) node.eq(j).removeClass("tree-collapsed");
						if(node.eq(j).hasClass("tree-folder")) node.eq(j).removeClass("tree-folder");					
					}
				}		
			}
		},
				
		isLeaf:function(target){
			var $this=$(target);
			if($this.parent().hasClass("tree")) alert("False");
			else alert("True");
		},
				
		refresh:function(newOptions){
			var newSettings=$.extend({},defaults, newOptions); 
			if(newOptions==null) location.reload();
			else{
				var aa=$("<div></div>");
				$(this).before(aa);
				$(this).remove();
				if(newSettings.type=="json") var value=newSettings.value;
				else if(newSettings.type=="ajax")	var value=JSON.parse($.ajax({url:newSettings.url,async:false}).responseText);
				var treeData=listToTree(value,settings.valueField,settings.parentField);
				createHtml(settings,aa,treeData);
				//JasonOrAjax(aa,newSettings,value);
			}
		}
	};
		
	function createHtml(settings,$this,treeData,lev){
		if(lev==undefined||lev<1)
			lev=1;
		$.each(treeData, function(i, n){
			if(n[settings.children]!=undefined){
				var ddivv=$("<div class='tree-node tree'></div>") ;
				$this.append(ddivv);
				for(var i=1;i<lev;i++){
					ddivv.append("<label class='tree-indent'></label>");
				}
				//if(settings.expand==true)
				if(settings.icons==true){
					ddivv.append("<label class='tree-open'></label>");
					ddivv.append("<label class='tree-folder-open'></label> ");
				}
				if(settings.checkbox==true)
					ddivv.append("<label class='tree-checkbox tree-uncheck'></label>");
				ddivv.append("<span id='"+n[settings.valueField]+"'>"+n[settings.textField]+"</span>");
				var ddiv=$("<div class='subtree'></div>");
				$this.append(ddiv);	
				
				createHtml(settings,ddiv,n[settings.children],lev+1);
				if(n[settings.selectField]==true||n[settings.selectField]==1){
					settings.selected+=","+n[settings.valueField];
				}
			}
			else{
				var ddiv=$("<div class='tree-node'></div>") ;
				$this.append(ddiv);
				for(var i=1;i<lev;i++){
					ddiv.append("<label class='tree-indent'></label>");
				}
				if(settings.icons==true)
					ddiv.append("<label class='tree-file'></label>");
				if(settings.checkbox==true)
					ddiv.append("<label class='tree-checkbox tree-uncheck'></label>");
				ddiv.append("<span id='"+n[settings.valueField]+"'>"+n[settings.textField]+"</span>");
				if(n[settings.selectField]==true||n[settings.selectField]==1){
					settings.selected+=","+n[settings.valueField];
				}
			}
		});
	}		
		/*function jsonBuild(settings,$this,node,len,num,arr,value,indentNum){	
					
			if( arr.length!=0){
				if(node[settings.pid]==null){
					var ddivv=$("<div class='tree-node tree'></div>") ;
					 $this.append(ddivv);
				} 
				else{
					var ddivv=$("<div class='tree-node tree'></div>") ;
					$this.append(ddivv);
					 for(var n=0;n<indentNum;n++){
						 ddivv.append("<label class='tree-indent'></label>");
						 if(len==num) ddivv.append("<label class='line tree-linebottom'></label> ");
						else {
							ddivv.append("<label class='line tree-line'></label>");
						}
					 }					
					}
				 indentNum=indentNum+1;
				 ddivv.append("<label class='tree-open'></label>");
				 ddivv.append("<label class='tree-folder-open'></label> ");
				 ddivv.append("<label class='tree-checkbox tree-uncheck'></label>");
				 ddivv.append("<span id='a"+node[settings.id]+"'>"+node[settings.text]+"</span>");
					 var ddiv=$("<div class='subtree'></div>");
					 $this.append(ddiv);	
			 }
			if(arr.length==0){
				 var ddiv=$("<div class='tree-node'></div>") ;
				 $this.append(ddiv);
				 for(var n=0;n<indentNum;n++){
					 ddiv.append("<label class='tree-indent'></label>");
					 if(len==num&& n==indentNum-1) ddiv.append("<label class='line tree-linebottom'></label>");
					 else if(n<indentNum-1) ddiv.append("<label class='line tree-straightline'></label>");
						else ddiv.append("<label class='line tree-line'></label>");
				 }
				 ddiv.append("<label class='tree-file'></label>");
				 ddiv.append("<label class='tree-checkbox tree-uncheck'></label>");
				 ddiv.append("<span id='a"+num+"'>"+node[settings.text]+"</span>");
			}

			for(var i=0;i<arr.length;i++){
				var arrr=[];
				for(var j=0;j<value.length;j++){
					var aa=arr[i];
					var bb=value[j][settings.pid];
					if(arr[i][settings.id]==value[j][settings.pid]) arrr.push(value[j]);
				}
				jsonBuild(settings,ddiv,arr[i],arr.length,i+1,arrr,value,indentNum);
				
			}
		}*/
		
		function allSelect($this){
			if($this.parent().hasClass("tree") && $this.parent().next().hasClass("subtree")){
				$this.removeClass("tree-notallcheck");
				var len=$this.parent().next().children().length;
				var nodes=$this.parent().next().children();
				for(var i=0;i<len;i++){
					var node=nodes.eq(i);
					for(var j=0;j<node.children().length;j++){
						if(node.children().eq(j).hasClass("tree-checkbox") && $this.hasClass("tree-checked")) {
							node.children().eq(j).addClass("tree-checked");	
							var num=j;
						}
						if(node.children().eq(j).hasClass("tree-checkbox") && !$this.hasClass("tree-checked")) {
							node.children().eq(j).removeClass("tree-checked");	
							var num=j;
						}
							
					}
					allSelect(node.children().eq(num));
				}					
			}
			
		}
		
		function checkcheck($this){
			if($this.parent().parent().hasClass("subtree")){
				 var num=$this.parent().parent().children().length;
				 var nnoode=$this.parent().parent().children();
				 var noode=$this.parent().parent().prev();
				 var count=0;
				 var nn=0;
				 
				 for(var k=0;k<num;k++){
					 if(nnoode.eq(k).hasClass("tree-node")) nn++;
				 }
				 
				 for(var m=0;m<num;m++){
					 for(var n=0;n<nnoode.eq(m).children().length;n++){
						 if(nnoode.eq(m).children().eq(n).hasClass("tree-checked")) count++;
					 }
				 }

					 for(var n=0;n<noode.children().length;n++){
						 if(noode.children().eq(n).hasClass("tree-checkbox")){
							 if(count==nn){
							 noode.children().eq(n).removeClass("tree-notallcheck");					 
							 noode.children().eq(n).addClass("tree-checked");
							 }
							 else if(count<nn&&count>0) noode.children().eq(n).addClass("tree-notallcheck");
							 else 
								 noode.children().eq(n).removeClass("tree-checked").removeClass("tree-notallcheck");
						 }
					 }		
			 }
			
			var tthat=$this.parent().parent().prev().children().eq(0);
			if(tthat.parent().parent().hasClass("subtree")) checkcheck(tthat);
		}
		
		/*function JasonOrAjax($this,settings,value){
			var arr=[];
            var num=0;
            alert("111");
            var indentNum=0;
			    for(var i=0;i<value.length;i++){
			    	
				 for(var j=1;j<value.length;j++){
					 if(value[i][settings.pid]==null&& value[i][settings.id]==value[j][settings.pid]) arr.push(value[j]);
				 }
				if(value[i][settings.pid]==null) jsonBuild(settings,$this,value[i],value.length,num,arr,value,indentNum);
			 }	
		}*/
})(jQuery);