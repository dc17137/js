define(['lib/MVC','../section_1/section_1','css!./section_2.css'],function(MVC){
		MVC.addView("home.section_2",function(M,F){
		var dom =document.createElement("div");
		dom.id = "section_2";
		var data = M.get("home.section_2");
		var tpl =[
			'<div class="inner"><div class="news">',
				'<div class="carousel"><ul><%carousel%></ul></div>',
				'<div class="tab">',
					'<ul id="th"><%th%></ul>',
					'<ul id="tb"><%tb%></ul>',
				'</div>',
			'</div>',
			'<div class="our"><ul><%our%></ul></div></div>'
		].join("");
		var car_tpl = '<li id="<%id%>"><img src="<%img%>"></li>';
		var car_html = "";
		for(var i = 0 ; i <data.news.carousel.length; i ++){
			car_html += F(car_tpl,data.news.carousel[i]);
		}
		var th_tpl = '<li id="<%id%>"><a href="javascript:void(0)"><%txt%></a></li>';
		var th_html = "";
		for(var i = 0 ; i <data.news.tab.th.length; i ++){
			th_html += F(th_tpl,data.news.tab.th[i]);
		}
		var tb_tpl = '<li id="<%id%>"><ul><%li%></ul></li>';
		var tb_html = "";
		var li_tpl = '<li><a href="<%href%>"><%title%><span><%date%></span></a></li>';
		var li_html = "" ;
		for(var i = 0 ; i <data.news.tab.tb.length; i ++){
			li_html = "";
			for(var j = 0 ; j < data.news.tab.tb[i].list.length; j ++){
				li_html += F(li_tpl,data.news.tab.tb[i].list[j]);
			}
			data.news.tab.tb[i].li = li_html;
			tb_html += F(tb_tpl,data.news.tab.tb[i]);
		}
		var our_tpl = '<li><a href="#"><img src="<%pic%>"></a></li>';
		var our_html = "";
		for(var i = 0 ; i<data.our.length ; i ++){
			our_html += F(our_tpl,data.our[i]);
		}
		var obj = {};
		obj.carousel = car_html ;
		obj.th = th_html ;
		obj.tb = tb_html ;
		obj.our = our_html;
		var html ="";
		html = F(tpl,obj);
		dom.innerHTML = html;
		return dom;
	})
	.addController("home.section_2",function(M,V,$,A,O){
		O.on("dataReady",function(){
			var dom = V.create("home.section_2");
			document.querySelector("#home").appendChild(dom);
		})
	})
})