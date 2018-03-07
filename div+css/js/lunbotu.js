(function(){
	//定义一个数组 用于装载碎片
	var arr = [];
	//获取canrosoul元素
	var $canrosoul = $("#canrosoul");

	//获得猫腻元素
	var $maoni = $("<li class='maoni'></li>").appendTo("#canrosoul .right")
	//循环创建碎片并且加入到猫腻元素中作为子元素 并且把它们保存到arr中
	for(var i =0;i<10;i++){
		for(var j=0;j<10;j++){
			arr.push($("<div></div>").css({width:0,height:0,"background":"url(images/slider-img1.jpg) no-repeat "+ j*-83+"px "+ i* -43+"px","position":"absolute","top":i*43,"left":j*83}).appendTo($maoni))
		}
	}
	//让第一个淡入
	var $readmores = $("#canrosoul .right .readmore");
	//第1个淡入 然后加类
	$readmores.eq(0).fadeOut(0).stop(true).fadeIn(1000,function(){
		 $(this).addClass("show")
	})
	//定义信号量
	var index = 0;
 
	// console.log(arr)
	// $.each(arr,function(i,j){
 //     //进行判断 
 //     j.css({"background-image":"url(images/slider-img2.jpg)"}).animate({"width":83,"height":43},300+Math.random()*3000);

 //  })
 //  setTimeout(function(){
 //  	    $("#canrosoul .right li").eq(1).addClass("active").siblings().removeClass("active")
 //  	   	$.each(arr,function(i,j){
 //  	   		j.css({"width":0,"height":0})
 //  	   	})
 //  },3300)
  var lock = true;
	//IIFE 解决变量会自动注册到window上
	var $clicked_lis = $("#canrosoul .left li");
	var $chas = $("#canrosoul .right .readmore .closed")
	var timer =  setInterval(function(){ 
		   $index++;
		   if($index>=4){
		   	$index=0;
		   }
		   fun1.call($clicked_lis.eq($index))
	},5400)
	$canrosoul.mouseover(function(){
		 clearInterval(timer);
	})
	$canrosoul.mouseout(function(){
		timer =  setInterval(function(){ 
		   $index++;
		   if($index>=4){
		   	$index=0;
		   }
		   fun1.call($clicked_lis.eq($index))
	},5400)
	})
  $chas.click(function(){
  	 //点击的时候发生了什么事 
  	 $(this).parent().removeClass("show").stop(true).fadeOut(1000)
  })
  var $index = 0;
	//给按钮们添加事件
	$clicked_lis.click(fun1) 
	//
		function fun1(){
	  if(!lock) return ;
	  lock = false;
		$(this).addClass("active").siblings().removeClass("active")
		//保存点击的那个元素的序号
		$index = $(this).index();
		if(index == $index) return;
			//首先判断 对应的那个readmore是否是显示 当有show类的时候说明显示
			if($readmores.eq(index).hasClass("show")){
				//先让readmore fadeOut 
				$readmores.eq(index).stop(true).fadeOut(1000,fun)
			}else{
				fun()
			}
	}
   
			  function fun(){
			  	console.log(this)
					//移除show类
 					$(this).removeClass("show");
 					$maoni.addClass("active")
 					//循环让猫腻里的碎片更换图片
 					$.each(arr,function(i,j){
					   //进行判断  
					   j.css({"background-image":"url(images/slider-img"+($index+1)+".jpg)"}).stop(true).animate({"width":83,"height":43},300+Math.random()*3000);
					})
					//改变信号量
					index = $index 
					$readmores.eq(index).addClass("show")
					//在setTimeout中 切换active类
					setTimeout(function(){
				    $("#canrosoul .right li").eq($index).addClass("active").siblings().removeClass("active");
				    $readmores.eq(index).fadeOut(0).stop(true).fadeIn(1000)
					   	$.each(arr,function(i,j){
					   		j.css({"width":0,"height":0})
					   	})  
					   	lock=true;
					},3300)
				}
	
})()