define(['lib/MVC','css!./section_1.css'],function(MVC){
		MVC.addView("home.section_1",function(M,F){
		var dom = document.createElement("div");
		dom.id = "section_1";
		var data = M.get("home.section_1");
		var tpl = [
			'<div class="bg"><img src="<%bg%>"></div>',
			'<div class="inner">',
				'<div class="logo"><ul><%pic_list%></ul></div>',
			'</div>',
				'<div class="content">',
					'<div class="inner">',
						'<div class="top"><img src="<%top%>"></div>',
						'<div class="video_l"></div>',
						'<div class="list"><ul><%list%></ul></div>',
						'<div class="video_r"></div>',
						'<div class="btm"><img src="<%btm%>"></div>',
					'</div>',
				'</div>'
		].join("");
		var pic_tpl = '<li><img src="<%name%>"></li>';
		var li_tpl = '<li><a href="<%href%>"><img src="<%img%>"></a></li>';
		var html ="";
		var li_html ="";
		var pic_html = "";
		for(var i = 0 ; i <data.logo.length;i++){
			pic_html += F(pic_tpl,data.logo[i]);
		}
		for(var i = 0 ; i <data.content.list.length;i++){
			li_html += F(li_tpl,data.content.list[i]);
		}
		var obj = {
			bg:data.bg.bg,
			top:data.content.top,
			btm:data.content.btm,
			list:li_html,
			pic_list:pic_html
		}
		html = F(tpl,obj);
		dom.innerHTML = html;
		return dom;
	})
	.addController("home.section_1",function(M,V,$,A,O){
		O.on("dataReady",function(){
			var dom = V.create("home.section_1");
			document.querySelector("#home").appendChild(dom);
		})
	})
})